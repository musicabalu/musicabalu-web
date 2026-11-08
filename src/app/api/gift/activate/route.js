import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { createTransport } from "nodemailer";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const { code, email, name } = await request.json();

    if (!code || !email || !name || !name.trim()) {
      return NextResponse.json(
        { error: "Por favor, introduce tu nombre, correo electrónico y el código de regalo." },
        { status: 400 }
      );
    }

    const cleanCode = code.trim().toUpperCase();
    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name ? name.trim() : "";

    // 1. Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return NextResponse.json(
        { error: "El correo electrónico no parece válido. Por favor, revísalo." },
        { status: 400 }
      );
    }

    // 2. Buscar el código de regalo
    const giftCode = await prisma.giftCode.findUnique({
      where: { code: cleanCode },
    });

    if (!giftCode) {
      return NextResponse.json(
        { error: "No hemos encontrado este código de regalo. Comprueba que esté bien escrito (ej. BALU-XXXX-XXXX)." },
        { status: 404 }
      );
    }

    if (giftCode.status === "redeemed") {
      const redeemedDate = giftCode.redeemedAt
        ? new Date(giftCode.redeemedAt).toLocaleDateString("es-ES")
        : "anteriormente";
      return NextResponse.json(
        { error: `Este vale regalo ya fue activado el ${redeemedDate}. Si crees que se trata de un error, escríbenos a hola@musicabalu.com y te ayudamos.` },
        { status: 400 }
      );
    }

    // 3. Calcular la fecha de expiración (1 año = 365 días desde el canje)
    const now = new Date();
    const durationMonths = giftCode.durationMonths || 12;
    const expiresAt = new Date(now);
    expiresAt.setDate(expiresAt.getDate() + (durationMonths * 30.5));

    // 4. Buscar o crear el usuario en base de datos
    let user = await prisma.user.findUnique({
      where: { email: cleanEmail },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: cleanEmail,
          name: cleanName || "Familia",
          role: "familia",
          hasActiveSub: true,
          subExpiresAt: expiresAt,
        },
      });
      console.log(`✅ Nuevo usuario creado al canjear regalo: ${cleanEmail}`);
    } else {
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          hasActiveSub: true,
          subExpiresAt: expiresAt,
          name: cleanName || user.name || "Familia",
        },
      });
      console.log(`✅ Usuario existente activado con regalo: ${cleanEmail}`);
    }

    // 5. Marcar el código de regalo como canjeado
    await prisma.giftCode.update({
      where: { id: giftCode.id },
      data: {
        status: "redeemed",
        recipientEmail: cleanEmail,
        redeemedAt: now,
        redeemedByUserId: user.id,
      },
    });

    // 6. Registrar en el ActivityLog
    try {
      await prisma.activityLog.create({
        data: {
          userId: user.id,
          action: "Regalo Anual Canjeado",
          details: `Código: ${cleanCode} | Válido hasta: ${expiresAt.toLocaleDateString("es-ES")}`,
        },
      });
    } catch (logErr) {
      console.error("Error al registrar ActivityLog del canje:", logErr);
    }

    // 7. Enviar email de bienvenida a la familia regalada
    try {
      if (process.env.EMAIL_SERVER && process.env.EMAIL_FROM) {
        const transport = createTransport(process.env.EMAIL_SERVER);
        const expiresDateFormatted = expiresAt.toLocaleDateString("es-ES", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });

        await transport.sendMail({
          from: process.env.EMAIL_FROM,
          to: cleanEmail,
          subject: "🎉 ¡Tu suscripción anual a Musicabalú ya está activa!",
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b; line-height: 1.6;">
              <h2 style="color: #db2777; margin-bottom: 8px;">¡Bienvenida a la Comunidad Musicabalú! 🎵</h2>
              <p>Tu código de regalo <strong>${cleanCode}</strong> ha sido activado con éxito.</p>
              
              <div style="background: #fdf2f8; border: 1.5px solid #fbcfe8; border-radius: 14px; padding: 18px; margin: 20px 0;">
                <p style="margin: 0 0 8px; font-weight: bold; color: #9d174d;">✨ Lo que incluye tu suscripción:</p>
                <ul style="margin: 0; padding-left: 20px; font-size: 0.95rem; color: #334155;">
                  <li>Acceso ilimitado a todas nuestras canciones y recitados (Gordon MLT).</li>
                  <li>Píldoras pedagógicas en vídeo para cantar y jugar en casa.</li>
                  <li>Nuevos contenidos añadidos cada semana.</li>
                  <li>Válido hasta el <strong>${expiresDateFormatted}</strong> (1 año completo).</li>
                </ul>
              </div>

              <p>Puedes acceder a la plataforma siempre que quieras con tu correo electrónico. No necesitas contraseña: te enviaremos un enlace seguro a este correo cada vez que inicies sesión.</p>

              <div style="text-align: center; margin: 30px 0;">
                <a href="https://musicabalu.com/login?email=${encodeURIComponent(cleanEmail)}&callbackUrl=/comunidad/canciones" 
                   style="background: #00B2E3; color: white; padding: 14px 28px; text-decoration: none; font-weight: bold; border-radius: 30px; display: inline-block;">
                  Entrar a la Biblioteca de Canciones 🎶
                </a>
              </div>

              <p style="font-size: 0.9rem; color: #64748b; margin-top: 30px; border-top: 1px solid #e2e8f0; padding-top: 15px;">
                Si tienes cualquier duda, responde directamente a este correo o escríbenos a <a href="mailto:hola@musicabalu.com" style="color: #00B2E3;">hola@musicabalu.com</a>.<br>
                ¡A disfrutar de la música en familia!
              </p>
            </div>
          `,
        });

        // Email al administrador informando del canje
        await transport.sendMail({
          from: process.env.EMAIL_FROM,
          to: "hola@musicabalu.com",
          subject: `🎁 Código Regalo Activado: ${cleanCode}`,
          text: `Se ha activado un código de regalo:\n\nCódigo: ${cleanCode}\nEmail que lo activa: ${cleanEmail}\nNombre: ${cleanName || "No indicado"}\nComprador original: ${giftCode.buyerEmail || "Desconocido"}\nFecha expiración: ${expiresDateFormatted}\n`,
        });
      }
    } catch (emailErr) {
      console.error("Error al enviar email de confirmación de canje:", emailErr);
    }

    return NextResponse.json({
      success: true,
      message: "¡Regalo activado con éxito!",
      expiresAt: expiresAt.toISOString(),
      email: cleanEmail,
    });
  } catch (error) {
    console.error("Error en /api/gift/activate:", error);
    return NextResponse.json(
      { error: "Hubo un error al activar tu código. Por favor, inténtalo de nuevo o contáctanos en hola@musicabalu.com." },
      { status: 500 }
    );
  }
}
