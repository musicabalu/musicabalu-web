import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import Stripe from "stripe";

const prisma = new PrismaClient();
const MAX_WORKSHOP_CAPACITY = 12;

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY || "sk_test_dummy_key_until_configured",
  {
    apiVersion: "2023-10-16",
  }
);

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const workshopId = searchParams.get("workshopId");

    if (!workshopId) {
      return NextResponse.redirect(new URL("/talleres", request.url));
    }

    const workshop = await prisma.workshop.findUnique({
      where: { id: workshopId },
    });

    if (!workshop || !workshop.isActive || workshop.isSoldOut) {
      return NextResponse.redirect(new URL("/talleres", request.url));
    }

    // Verificar aforo máximo de 12 plazas antes de abrir pasarela
    const soldCount = await prisma.order.count({
      where: {
        productType: "workshop",
        productId: workshop.id,
        status: "completed",
      },
    });

    if (soldCount >= MAX_WORKSHOP_CAPACITY) {
      await prisma.workshop.update({
        where: { id: workshop.id },
        data: { isSoldOut: true },
      });
      return NextResponse.redirect(new URL("/talleres", request.url));
    }

    const origin =
      process.env.NEXT_PUBLIC_SITE_URL ||
      request.headers.get("origin") ||
      `https://${request.headers.get("host")}`;

    const locationAndSession = (workshop.title || "").replace(/^Taller en\s+/i, "");
    const cleanDescription = locationAndSession
      ? `${locationAndSession} — ${workshop.dateText}`
      : workshop.dateText;

    // Crear sesión de pago único en Stripe por 20,00 € (Precio del Taller Familiar)
    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      phone_number_collection: {
        enabled: true,
      },
      custom_fields: [
        {
          key: "child_name",
          label: {
            type: "custom",
            custom: "Nombre del peque",
          },
          type: "text",
        },
        {
          key: "child_birth_date",
          label: {
            type: "custom",
            custom: "Fecha de nacimiento del peque (DD/MM/AAAA)",
          },
          type: "text",
        },
      ],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "Taller: Un peque (0-36 meses) + un adulto",
              description: cleanDescription,
            },
            unit_amount: 2000, // 20,00 €
          },
          quantity: 1,
        },
      ],
      metadata: {
        type: "workshop",
        productType: "workshop",
        workshopId: workshop.id,
        productName: `Taller: Un peque + un adulto · ${workshop.title} (${workshop.dateText})`,
      },
      success_url: `${origin}/inscripcion/exito?taller=1`,
      cancel_url: `${origin}/talleres`,
    });

    return NextResponse.redirect(checkoutSession.url, 303);
  } catch (error) {
    console.error("Error creando sesión de Stripe para taller:", error);
    return NextResponse.redirect(new URL("/talleres?error=stripe", request.url));
  }
}
