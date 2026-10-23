import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { createTransport } from "nodemailer";
import { getNewsletterFooterHtml } from "@/lib/emailUnsubscribe";

const prisma = new PrismaClient();

// Plantilla por defecto de Recordatorio Previo
function getReminderDefault(workshop) {
  const parts = (workshop.dateText || "").split("|").map((s) => s.trim());
  const schedulePart = parts[0] || workshop.dateText;
  const addressPart = parts[1] || "";

  return {
    subject: "🧸 Ya casi estamos: Este sábado nos vemos en el Taller de Música en Familia 🎵",
    body: `¡Hola, [Nombre Madre/Padre]!

Quedan solo un par de días para compartir nuestro ratito de música en familia en ${workshop.title.replace(/^Taller en\s+/i, "")}.

Te escribo este breve mensaje para recordarte los detalles de tu sesión y que podáis venir con toda la tranquilidad del mundo:

🗓️ Cuándo: ${schedulePart}
📍 Dónde: ${addressPart.replace(/^📍\s*/, "")}
👶 Peque: [Nombre del peque]

3 detallitos rápidos para la sesión:
1. Puntualidad: Os recomiendo llegar unos 5-10 minutitos antes para entrar con calma y acomodarnos en el espacio.
2. Ropa cómoda: Venid con ropa con la que os podáis mover a gusto. Entraremos al aula descalzos (en calcetines).
3. Un solo adulto acompañante: Recordad que cada peque viene acompañado de un solo adulto (mamá, papá o alguien con quien tenga ese vínculo especial) para asegurar el aforo y la magia de la sesión.

Venid con muchas ganas de jugar, cantar y dejaros llevar. ¡Estoy deseando conoceros y vivirlo juntos!

Un abrazo grande,
Javi.`
  };
}

// Plantilla por defecto de Post-Taller (con la modificación aprobada por Javi)
function getPostWorkshopDefault(workshop) {
  return {
    subject: "💛 ¡Gracias por este sábado! (y un regalito para seguir con la música en casa)",
    body: `¡Hola, [Nombre Madre/Padre]!

Quería darte las gracias de corazón por venir a compartir el taller de música este sábado con [Nombre del peque].

Para mí fue un momento muy especial ver cómo los peques reaccionan al silencio, a los recitados y a las canciones cuando les damos ese espacio libre de pantallas y de ruido verbal. Espero que disfrutarais de ese ratito juntos tanto como yo disfruté compartiéndolo con vosotros.

¿Os habéis quedado con ganas de más música?
Varias familias me preguntabais el sábado cómo seguir haciendo esto en el día a día. Como ya te creamos tu acceso al inscribirte, tienes disponibles algunas de nuestras canciones abiertas en la web:
👉 https://musicabalu.com/login (con tu correo: [Email])

Y si queréis tener toda la biblioteca completa (con todas las canciones y recitados que grabo y las píldoras formativas en vídeo) puedes unirte a nuestra Comunidad Familiar Musicabalú:
* Cuota mensual: 3,90 € / mes (sin permanencia).
* O plan anual: 39 € / año (2 meses de regalo).

👉 https://musicabalu.com/tienda

Sea como sea, fue un auténtico placer compartir música con vosotros este fin de semana. ¡Espero que nos volvamos a encontrar muy pronto!

Un abrazo con mucho ritmo,
Javi.`
  };
}

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const workshopId = searchParams.get("workshopId");

    if (!workshopId) {
      return NextResponse.json({ error: "Falta workshopId" }, { status: 400 });
    }

    const workshop = await prisma.workshop.findUnique({
      where: { id: workshopId },
    });

    if (!workshop) {
      return NextResponse.json({ error: "Taller no encontrado" }, { status: 404 });
    }

    const reminder = getReminderDefault(workshop);
    const postWorkshop = getPostWorkshopDefault(workshop);

    const orders = await prisma.order.findMany({
      where: {
        productType: "workshop",
        productId: workshopId,
        status: "completed",
      },
      include: { user: true },
    });

    const attendees = orders.map((o) => {
      let extra = {};
      try { extra = o.shippingData ? JSON.parse(o.shippingData) : {}; } catch {}
      return {
        orderId: o.id,
        adultName: extra.adultName || o.user?.name || "Familia",
        childName: extra.childName || extra.childInfo || "tu peque",
        email: extra.email || o.user?.email || "",
      };
    }).filter((a) => a.email);

    return NextResponse.json({
      workshop,
      attendees,
      templates: {
        reminder,
        postWorkshop,
      },
    });
  } catch (error) {
    console.error("Error en GET workshop-comms:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const body = await request.json();
    const { workshopId, type, subject, bodyText, isTest, testEmail } = body;

    if (!workshopId || !subject || !bodyText) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios (workshopId, subject, bodyText)" },
        { status: 400 }
      );
    }

    const workshop = await prisma.workshop.findUnique({
      where: { id: workshopId },
    });

    if (!workshop) {
      return NextResponse.json({ error: "Taller no encontrado" }, { status: 404 });
    }

    const transport = createTransport(process.env.EMAIL_SERVER);

    const formatToHtml = (rawText) => {
      return rawText
        .split(/\n\s*\n/)
        .map(
          (para) =>
            `<p style="margin: 0 0 16px 0; line-height: 1.65; color: #2d3748; font-size: 16px;">${para
              .trim()
              .replace(/\n/g, "<br/>")
              .replace(
                /(https?:\/\/[^\s<]+)/g,
                '<a href="$1" style="color: #00B2E3; font-weight: bold; text-decoration: underline;">$1</a>'
              )}</p>`
        )
        .join("");
    };

    // Caso de prueba
    if (isTest) {
      const target = (testEmail || "hola@musicabalu.com").trim();
      const previewText = bodyText
        .replace(/\[Nombre Madre\/Padre\]/gi, "Familia (Prueba)")
        .replace(/\[Nombre del peque\]/gi, "Peque (Prueba)")
        .replace(/\[Email\]/gi, target);

      const html = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          ${formatToHtml(previewText)}
          ${getNewsletterFooterHtml(target, true)}
        </div>
      `;

      await transport.sendMail({
        from: process.env.EMAIL_FROM,
        to: target,
        subject: `[PRUEBA] ${subject}`,
        html,
      });

      return NextResponse.json({ success: true, mode: "test", sentCount: 1 });
    }

    // Envío real a las familias de este taller
    const orders = await prisma.order.findMany({
      where: {
        productType: "workshop",
        productId: workshopId,
        status: "completed",
      },
      include: { user: true },
    });

    let sentCount = 0;
    const errors = [];

    for (const ord of orders) {
      let extra = {};
      try { extra = ord.shippingData ? JSON.parse(ord.shippingData) : {}; } catch {}

      const adultName = extra.adultName || ord.user?.name || "Familia";
      const childName = extra.childName || extra.childInfo || "tu peque";
      const email = (extra.email || ord.user?.email || "").trim().toLowerCase();

      if (!email || email === "jamusanchez@gmail.com") continue;

      try {
        const personalizedText = bodyText
          .replace(/\[Nombre Madre\/Padre\]/gi, adultName)
          .replace(/\[Nombre del peque\]/gi, childName)
          .replace(/\[Email\]/gi, email);

        const html = `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            ${formatToHtml(personalizedText)}
            ${getNewsletterFooterHtml(email, true)}
          </div>
        `;

        await transport.sendMail({
          from: process.env.EMAIL_FROM,
          to: email,
          subject,
          html,
        });

        sentCount++;
      } catch (err) {
        console.error(`Error enviando email a ${email}:`, err);
        errors.push(email);
      }
    }

    // Registrar en ActivityLog
    try {
      if (session.user?.id) {
        await prisma.activityLog.create({
          data: {
            userId: session.user.id,
            action: type === "reminder" ? "Recordatorio Taller Enviado" : "Post-Taller Enviado",
            details: `Enviado a ${sentCount} familias del taller: ${workshop.title} (Asunto: ${subject})`,
          },
        });
      }
    } catch (logErr) {
      console.error("Error guardando ActivityLog de workshop-comms:", logErr);
    }

    return NextResponse.json({
      success: true,
      sentCount,
      totalTargets: orders.length,
      errors,
    });
  } catch (error) {
    console.error("Error en POST workshop-comms:", error);
    return NextResponse.json({ error: "Error interno al enviar" }, { status: 500 });
  }
}
