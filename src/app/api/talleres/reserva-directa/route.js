import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { createTransport } from "nodemailer";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      workshopId,
      adultName,
      email,
      phone,
      childName,
      childBirthDate,
      acceptedTerms,
    } = body;

    if (!workshopId || !adultName || !email || !phone || !childName || !childBirthDate) {
      return NextResponse.json(
        { error: "Todos los campos son obligatorios" },
        { status: 400 }
      );
    }

    if (!acceptedTerms) {
      return NextResponse.json(
        { error: "Debes aceptar las condiciones y política de privacidad" },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanAdultName = adultName.trim();
    const cleanChildName = childName.trim();
    const cleanBirthDate = childBirthDate.trim();
    const cleanPhone = phone.trim();

    // 1. Obtener y verificar el taller
    const workshop = await prisma.workshop.findUnique({
      where: { id: workshopId },
    });

    if (!workshop || !workshop.isActive) {
      return NextResponse.json(
        { error: "El taller seleccionado no está disponible" },
        { status: 404 }
      );
    }

    // Verificar aforo actual
    const currentOrdersCount = await prisma.order.count({
      where: {
        productType: "workshop",
        productId: workshop.id,
        status: "completed",
      },
    });

    if (currentOrdersCount >= 10 || workshop.isSoldOut) {
      return NextResponse.json(
        { error: "Lo sentimos, este taller acaba de completar su aforo (10/10 plazas)." },
        { status: 400 }
      );
    }

    // 2. Crear o actualizar usuario en la base de datos
    let user = await prisma.user.findUnique({
      where: { email: cleanEmail },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: cleanEmail,
          name: cleanAdultName,
          role: "familia",
          hasActiveSub: false,
        },
      });
      console.log(`✅ Usuario creado para taller: ${cleanAdultName} (${cleanEmail})`);
    } else if (!user.name) {
      user = await prisma.user.update({
        where: { id: user.id },
        data: { name: cleanAdultName },
      });
    }

    // 3. Crear el registro de Order para que sume como plaza ocupada
    const directSessionId = `direct_sede_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    const childInfo = `${cleanChildName} (${cleanBirthDate})`;

    const order = await prisma.order.create({
      data: {
        userId: user.id,
        stripeSessionId: directSessionId,
        productId: workshop.id,
        productName: `Taller: Un peque + un adulto · ${workshop.title}`,
        productType: "workshop",
        amountTotal: 2000,
        currency: "eur",
        status: "completed",
        shippingData: JSON.stringify({
          adultName: cleanAdultName,
          email: cleanEmail,
          phone: cleanPhone,
          childName: cleanChildName,
          childBirthDate: cleanBirthDate,
          childInfo: childInfo,
          notes: "Pago directo en centro colaborador (guardería)",
          attended: null,
        }),
      },
    });

    // 4. Actualizar conteo de plazas y marcar sold out si llega a 10
    const newTotalCount = currentOrdersCount + 1;
    if (newTotalCount >= 10) {
      await prisma.workshop.update({
        where: { id: workshop.id },
        data: { isSoldOut: true },
      });
      console.log(`🔒 Taller ${workshop.title} completado (10/10 plazas) tras inscripción directa`);
    }

    // 5. Enviar emails de confirmación
    try {
      const { getNewsletterFooterHtml } = await import("@/lib/emailUnsubscribe");
      const transport = createTransport(process.env.EMAIL_SERVER);
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://musicabalu.com";

      // Email a la familia
      await transport.sendMail({
        from: process.env.EMAIL_FROM || "Musicabalú <hola@musicabalu.com>",
        to: cleanEmail,
        subject: "¡Plaza confirmada para el Taller de Música en Familia! 🎵💛",
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px 20px; color: #2d3748; line-height: 1.65; font-size: 16px;">
            <p style="font-size: 18px; font-weight: 700; color: #1a202c; margin-bottom: 20px;">
              ¡Hola, ${cleanAdultName}! Soy Javi de Musicabalú 🎵
            </p>

            <p>
              ¡Qué alegría! Hemos registrado correctamente tu reserva de plaza para <strong>${cleanChildName}</strong> en el <strong>${workshop.title}</strong> (${workshop.dateText}).
            </p>

            <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 16px 20px; margin: 24px 0;">
              <strong style="color: #166534; font-size: 16px;">🎁 Tu acceso gratuito a la web de Musicabalú:</strong><br/>
              <p style="margin: 8px 0 12px 0; color: #374151;">
                Como estás inscrita al taller, ya tienes tu cuenta habilitada para escuchar una selección de nuestras canciones de estudio, recitados y píldoras formativas desde casa antes del taller:
              </p>
              <ul style="margin: 0; padding-left: 20px; color: #166534;">
                <li><strong>Enlace de acceso:</strong> <a href="${siteUrl}/login" style="color: #00B2E3; font-weight: bold;">www.musicabalu.com/login</a></li>
                <li><strong>Tu email de acceso:</strong> ${cleanEmail}</li>
              </ul>
              <small style="color: #4b5563; display: block; margin-top: 8px;">(Al entrar, pon tu correo y recibirás un enlace de acceso seguro en 1 segundo, sin contraseñas).</small>
            </div>

            <h3 style="color: #1a202c; font-size: 17px; margin-top: 28px; margin-bottom: 12px;">
              📌 Recordatorios importantes para el día del taller:
            </h3>
            <ul style="padding-left: 20px; color: #4a5568; line-height: 1.7;">
              <li><strong>Calzado:</strong> Entraremos descalzos al aula (con calcetines).</li>
              <li><strong>Ropa:</strong> Venid con ropa cómoda para poder moveros y sentaros en el suelo libremente.</li>
              <li><strong>Acompañamiento:</strong> Los peques vienen acompañados de un único adulto para mantener el clima de concentración y espacio íntimo.</li>
              <li><strong>Puntualidad:</strong> Recomendamos llegar 5-10 minutos antes para acomodarnos con calma.</li>
            </ul>

            <p style="margin-top: 24px;">
              ¡Estoy deseando compartir este ratito de música y conexión con vosotros!
            </p>

            <p style="margin-top: 28px; margin-bottom: 4px;">
              Un abrazo grande,
            </p>
            <p style="font-weight: 700; color: #1a202c; margin-top: 0;">
              Javi Muñoz.<br/>
              <span style="font-weight: 400; color: #718096; font-size: 14px;">Musicabalú</span>
            </p>

            ${getNewsletterFooterHtml(cleanEmail, true)}
          </div>
        `,
      });

      // Email al admin
      await transport.sendMail({
        from: process.env.EMAIL_FROM || "Musicabalú <hola@musicabalu.com>",
        to: "hola@musicabalu.com",
        subject: `🧸 Nueva Inscripción Directa a Taller (${newTotalCount}/10): ${cleanAdultName}`,
        text: `¡Nueva plaza reservada directamente (pago en centro colaborador)!\n\nOcupación actual: ${newTotalCount} / 10 plazas${newTotalCount >= 10 ? " (¡TALLER COMPLETO!)" : ""}\nTaller: ${workshop.title}\nAdulto: ${cleanAdultName}\nPeque: ${childInfo}\nTeléfono: ${cleanPhone}\nEmail: ${cleanEmail}\nModalidad: Pago directo en guardería`,
      });

      console.log(`✉️ Emails de confirmación de taller enviados para ${cleanEmail}`);
    } catch (emailErr) {
      console.error("⚠️ Error enviando emails de confirmación:", emailErr);
    }

    return NextResponse.json({
      success: true,
      workshopTitle: workshop.title,
      orderId: order.id,
      email: cleanEmail,
    });
  } catch (error) {
    console.error("Error en /api/talleres/reserva-directa:", error);
    return NextResponse.json(
      { error: "Error interno al procesar la inscripción" },
      { status: 500 }
    );
  }
}
