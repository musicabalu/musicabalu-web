import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import { PrismaClient } from '@prisma/client';
import Stripe from 'stripe';

const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Debes iniciar sesión para comprar' }, { status: 401 });
    }

    const { items } = await request.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'El carrito está vacío' }, { status: 400 });
    }

    // Comprobar si hay suscripciones mezcladas
    const hasSubscription = items.some(item => item.type === 'subscription');
    if (hasSubscription && items.length > 1) {
      return NextResponse.json({ error: 'Las suscripciones deben comprarse de forma individual.' }, { status: 400 });
    }

    const isSubscription = hasSubscription;
    const hasPhysical = items.some(item => item.type === 'printful_merch' || item.type === 'physical_kit');

    // Mapear productos del carrito a line_items de Stripe
    const line_items = items.map(item => {
      const metadataStr = Object.entries(item.metadata || {}).map(([k,v]) => `${k}: ${v}`).join(', ');
      const desc = metadataStr ? `${item.name} (${metadataStr})` : item.name;

      // Calcular precio en céntimos (asegurándonos de quitar formato si es necesario, aunque en el contexto pasamos price como number/string de euros?)
      // Wait, let's verify what `item.price` is. In tiend/page.js we pass formattedPrice!
      // We must fetch from DB to be secure.
      return {
        id: item.id,
        desc,
        quantity: item.quantity
      };
    });

    // Fetchear los precios reales de la BD por seguridad
    const dbProducts = await prisma.product.findMany({
      where: { id: { in: items.map(i => i.id) } }
    });

    let cartTotalCents = 0;

    const stripeLineItems = line_items.map(clientItem => {
      const dbProd = dbProducts.find(p => p.id === clientItem.id);
      if (!dbProd) throw new Error("Producto no encontrado");

      cartTotalCents += dbProd.price * clientItem.quantity;

      const priceData = {
        currency: 'eur',
        product_data: {
          name: clientItem.desc,
        },
        unit_amount: dbProd.price, // Precio real en céntimos
      };

      if (isSubscription) {
        priceData.recurring = { interval: 'month' };
      }

      return {
        price_data: priceData,
        quantity: clientItem.quantity,
      };
    });

    const cartSummary = items.map(i => `${i.quantity}x ${i.name}`).join(' + ');
    
    const isFreeShipping = cartTotalCents >= 5500;

    // Crear la sesión de Stripe
    const sessionConfig = {
      payment_method_types: ['card'],
      mode: isSubscription ? 'subscription' : 'payment',
      customer_email: session.user.email,
      line_items: stripeLineItems,
      shipping_address_collection: hasPhysical ? { allowed_countries: ['ES'] } : undefined,
      shipping_options: hasPhysical ? [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: isFreeShipping ? 0 : 490, // 4.90€ or 0€
              currency: 'eur',
            },
            display_name: isFreeShipping ? 'Envío GRATIS' : 'Envío estándar (Península)',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 3 },
              maximum: { unit: 'business_day', value: 7 },
            },
          },
        },
      ] : undefined,
      
      metadata: {
        userId: session.user.id,
        isCart: "true",
        productId: "cart_" + Date.now(),
        productType: isSubscription ? 'subscription' : (hasPhysical ? 'printful_merch' : 'digital'),
        productName: cartSummary.substring(0, 499), // Stripe tiene límite
      },

      success_url: `${request.headers.get('origin') || process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
      cancel_url: `${request.headers.get('origin') || process.env.NEXT_PUBLIC_APP_URL}/tienda?canceled=true`,
    };

    const stripeSession = await stripe.checkout.sessions.create(sessionConfig);

    return NextResponse.json({ url: stripeSession.url });

  } catch (error) {
    console.error('Error creando sesión de carrito:', error);
    return NextResponse.json({ error: 'Error interno procesando el carrito' }, { status: 500 });
  }
}
