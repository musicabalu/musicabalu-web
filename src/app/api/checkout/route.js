import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import { PrismaClient } from '@prisma/client';
import Stripe from 'stripe';

const prisma = new PrismaClient();
// Como el usuario aún no nos ha dado la clave, usamos una dummy key para que no falle en compilación.
// En el mundo real esto será process.env.STRIPE_SECRET_KEY
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_dummy_key_until_configured', {
  apiVersion: '2023-10-16',
});

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    const body = await request.json();
    const { productId, customMetadata = {} } = body;

    // 1. Verificar si el usuario está logueado
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Debes iniciar sesión para comprar.' }, { status: 401 });
    }

    // 2. Buscar el producto en la base de datos (seguridad: nunca fiarse del precio que envía el cliente)
    const product = await prisma.product.findUnique({
      where: { id: productId }
    });

    if (!product) {
      return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });
    }

    // 3. Configurar parámetros según el tipo de producto
    const isSubscription = product.type === 'subscription';
    const isPhysical = product.type === 'physical_kit' || product.type === 'printful_merch';

    // Añadir variantes (Talla, Color) al nombre/descripción para que salga en Stripe
    let finalDescription = product.description;
    const variantsText = Object.entries(customMetadata).map(([k,v]) => `${k}: ${v}`).join(' | ');
    if (variantsText) {
      finalDescription = `${finalDescription} - (${variantsText})`;
    }

    const priceData = {
      currency: 'eur',
      product_data: {
        name: product.name,
        description: finalDescription,
      },
      unit_amount: product.price, // Precio en céntimos
    };

    if (isSubscription) {
      priceData.recurring = { interval: 'month' };
    }

    // 4. Crear la sesión de Stripe
    const sessionConfig = {
      payment_method_types: ['card'],
      mode: isSubscription ? 'subscription' : 'payment',
      customer_email: session.user.email,
      line_items: [
        {
          price_data: priceData,
          quantity: 1,
        },
      ],
      // Recoger dirección si es físico
      shipping_address_collection: isPhysical ? { allowed_countries: ['ES'] } : undefined,
      shipping_options: isPhysical ? [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 490, // 4.90€
              currency: 'eur',
            },
            display_name: 'Envío estándar (Península)',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 3 },
              maximum: { unit: 'business_day', value: 7 },
            },
          },
        },
      ] : undefined,
      
      // Pasar datos (metadatos) para el Webhook
      metadata: {
        userId: session.user.id,
        productId: product.id,
        productType: product.type,
        productName: product.name,
        ...customMetadata
      },

      success_url: `${request.headers.get('origin') || `https://${request.headers.get('host')}`}/dashboard?success=true`,
      cancel_url: `${request.headers.get('origin') || `https://${request.headers.get('host')}`}/tienda?canceled=true`,
    };

    // Stripe no permite metadata en la raíz de una suscripción al crear la sesión, 
    // hay que pasarla a subscription_data.metadata
    if (isSubscription) {
      sessionConfig.subscription_data = {
        metadata: {
          userId: session.user.id,
          productId: product.id,
          productType: product.type
        }
      };
    }

    const checkoutSession = await stripe.checkout.sessions.create(sessionConfig);

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error('Error creando sesión de Stripe:', error);
    // Para no bloquear la experiencia de desarrollo sin claves de Stripe reales:
    if (error.message.includes('Invalid API Key')) {
      return NextResponse.json(
        { error: 'Simulación: Has hecho clic en comprar. Cuando configures tu clave de Stripe real, esto te llevará a la pasarela de pago segura.' },
        { status: 200 }
      );
    }
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
