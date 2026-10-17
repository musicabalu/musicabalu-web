import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { createTransport } from "nodemailer";
import { getNewsletterFooterHtml } from "@/lib/emailUnsubscribe";

const prisma = new PrismaClient();

async function buildRecipientLists() {
  // 1. Obtener bajas voluntarias de boletines (AdminNote category="EmailBaja")
  const unsubNotes = await prisma.adminNote.findMany({
    where: { category: "EmailBaja" },
  });
  const unsubSet = new Set(unsubNotes.map((n) => (n.title || "").trim().toLowerCase()));

  // 2. Obtener inscripciones activas en clases presenciales
  const enrollments = await prisma.enrollment.findMany({
    where: {
      status: "active",
      email: { not: "jamusanchez@gmail.com" },
    },
    include: { group: true },
  });

  // 3. Obtener suscriptores activos de la Comunidad (3,90€/mes o 39€/año)
  const subUsers = await prisma.user.findMany({
    where: {
      hasActiveSub: true,
      email: { not: "jamusanchez@gmail.com" },
    },
  });

  // Mapear familias presenciales (para avisos exclusivos de clase: no filtramos por baja de boletín web)
  const presencialMap = new Map();
  for (const e of enrollments) {
    const email = (e.email || "").trim().toLowerCase();
    if (!email) continue;
    if (!presencialMap.has(email)) {
      presencialMap.set(email, {
        email,
        name: e.parentName || "Familia",
        type: "Clase Presencial",
        acceptedComms: e.acceptedComms,
      });
    }
  }

  // Mapear todos los miembros de la Comunidad que reciben el correo de los viernes
  const comunidadMap = new Map();

  for (const e of enrollments) {
    const email = (e.email || "").trim().toLowerCase();
    if (!email) continue;
    if (unsubSet.has(email) || e.acceptedComms === false) {
      unsubSet.add(email);
      continue;
    }
    comunidadMap.set(email, {
      email,
      name: e.parentName || "Familia",
      source: "Clase Presencial",
    });
  }

  for (const u of subUsers) {
    const email = (u.email || "").trim().toLowerCase();
    if (!email) continue;
    if (unsubSet.has(email)) continue;
    if (!comunidadMap.has(email)) {
      comunidadMap.set(email, {
        email,
        name: u.name || "Familia",
        source: "Suscriptor Online",
      });
    }
  }

  return {
    comunidad: Array.from(comunidadMap.values()),
    presencial: Array.from(presencialMap.values()),
    unsubscribed: Array.from(unsubSet),
  };
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const lists = await buildRecipientLists();
    return NextResponse.json(lists);
  } catch (error) {
    console.error("Error obteniendo destinatarios:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { subject, bodyText, audience, testEmail } = await request.json();

    if (!subject || !bodyText) {
      return NextResponse.json(
        { error: "El asunto y el mensaje son obligatorios." },
        { status: 400 }
      );
    }

    const transport = createTransport(process.env.EMAIL_SERVER);

    // Convertir saltos de línea en párrafos HTML limpios si el texto no viene ya con etiquetas <p>
    const formattedHtmlBody = bodyText.includes("<p>")
      ? bodyText
      : bodyText
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

    // Si es envío de prueba
    if (audience === "test") {
      const target = (testEmail || "hola@musicabalu.com").trim();
      const html = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          ${formattedHtmlBody}
          ${getNewsletterFooterHtml(target, true)}
        </div>
      `;
      await transport.sendMail({
        from: process.env.EMAIL_FROM,
        to: target,
        subject: `[PRUEBA] ${subject}`,
        html,
      });
      return NextResponse.json({ success: true, sentCount: 1, mode: "test" });
    }

    const lists = await buildRecipientLists();
    const recipients =
      audience === "presencial" ? lists.presencial : lists.comunidad;

    // Si es un aviso operativo exclusivo de clases presenciales, no lleva enlace de baja de boletines, solo LOPD
    const includeUnsubscribeLink = audience !== "presencial";

    let sentCount = 0;
    const errors = [];

    for (const recipient of recipients) {
      try {
        const personalizedBody = formattedHtmlBody.replace(
          /\[Nombre\]/gi,
          recipient.name || "familia"
        );
        const html = `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            ${personalizedBody}
            ${getNewsletterFooterHtml(recipient.email, includeUnsubscribeLink)}
          </div>
        `;
        await transport.sendMail({
          from: process.env.EMAIL_FROM,
          to: recipient.email,
          subject,
          html,
        });
        sentCount++;
      } catch (err) {
        console.error(`Error enviando a ${recipient.email}:`, err);
        errors.push(recipient.email);
      }
    }

    return NextResponse.json({
      success: true,
      sentCount,
      totalTargets: recipients.length,
      errors,
    });
  } catch (error) {
    console.error("Error enviando boletín:", error);
    return NextResponse.json(
      { error: "Error al enviar los correos" },
      { status: 500 }
    );
  }
}
