import { NextResponse } from "next/server";
import Stripe from "stripe";
import { PrismaClient } from "@prisma/client";
import { createTransport } from "nodemailer";

// Este código no se usa en pruebas locales por ahora, 
// pero está listo para cuando subamos la web a Vercel.
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

const prisma = new PrismaClient();
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request) {
  const payload = await request.text();
  const sig = request.headers.get("stripe-signature");

  let event;

  try {
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
  } catch (err) {
    console.error(`❌ Error de firma del Webhook: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

    // Manejar el evento (La llamada de teléfono de Stripe)
  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const metadata = session.metadata || {};

        console.log("Stripe Checkout Completado:", metadata);

        if (metadata.type === 'matricula') {
          // 1. Matrícula de clases presenciales
          await prisma.enrollment.update({
            where: { id: metadata.enrollmentId },
            data: { status: 'active' }
          });
          // Asegurarnos de que el usuario tiene el stripeId
          await prisma.user.update({
            where: { id: metadata.userId },
            data: { stripeId: session.customer }
          });
          console.log(`✅ Matrícula activada para enrollment ${metadata.enrollmentId}`);
          
        } else if (metadata.productType === 'subscription') {
          // 2. Suscripción recurrente (Comunidad)
          await prisma.user.update({
            where: { id: metadata.userId },
            data: { hasActiveSub: true, stripeId: session.customer }
          });
          console.log(`✅ Suscripción Comunidad activada para usuario ${metadata.userId}`);

        } else if (metadata.productType === 'gift' || metadata.productType === 'printful_merch') {
          // 3. Producto de pago único (Regalo o Merchandising)
          await prisma.order.create({
            data: {
               userId: metadata.userId,
               stripeSessionId: session.id,
               productId: metadata.productId,
               productName: metadata.productName || "Producto Tienda",
               productType: metadata.productType,
               amountTotal: session.amount_total,
               currency: session.currency,
               status: 'completed'
            }
          });
          console.log(`✅ Orden creada para producto ${metadata.productName}`);

          try {
            const transport = createTransport(process.env.EMAIL_SERVER);
            // Email al cliente
            await transport.sendMail({
              from: process.env.EMAIL_FROM,
              to: session.customer_details?.email,
              subject: "Confirmación de tu compra en Musicabalú",
              html: `<p>¡Hola!</p><p>Hemos recibido correctamente tu pedido de: <strong>${metadata.productName || "nuestra tienda"}</strong>.</p><p>¡Muchas gracias por tu compra! Muy pronto nos pondremos en contacto contigo o te enviaremos más detalles sobre el envío.</p><p>Un abrazo,<br>El equipo de Musicabalú</p>`
            });
            // Email al administrador
            await transport.sendMail({
              from: process.env.EMAIL_FROM,
              to: "musicabalu@gmail.com",
              subject: "💰 Nueva Venta en la Tienda",
              text: `Se ha vendido: ${metadata.productName || "Producto"} por ${(session.amount_total / 100).toFixed(2)}€\n\nComprador: ${session.customer_details?.email}\nStripe ID: ${session.id}`
            });
            console.log("✅ Emails de confirmación enviados");
          } catch (emailError) {
            console.error("❌ Error enviando emails de confirmación:", emailError);
          }

        } else {
          // Fallback legacy por si acaso
          const userEmail = session.customer_details?.email;
          if (userEmail) {
            await prisma.user.update({
              where: { email: userEmail },
              data: { hasActiveSub: true, stripeId: session.customer },
            });
            console.log(`✅ Acceso concedido (fallback) a: ${userEmail}`);
          }
        }
        break;
      }
      
      case "customer.subscription.deleted": {
        const subscription = event.data.object;
        // Si cancela o deja de pagar, le quitamos el acceso
        await prisma.user.updateMany({
          where: { stripeId: subscription.customer },
          data: { hasActiveSub: false },
        });
        console.log(`❌ Acceso revocado al cliente: ${subscription.customer}`);
        break;
      }

      default:
        console.log(`Evento no manejado: ${event.type}`);
    }

    return NextResponse.json({ received: true }, { status: 200 });

  } catch (error) {
    console.error("Error procesando el evento de Stripe:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
