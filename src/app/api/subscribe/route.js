import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { createTransport } from "nodemailer";
import { getNewsletterFooterHtml } from "@/lib/emailUnsubscribe";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const { email, name } = await request.json();

    if (!email || !name) {
      return NextResponse.json(
        { error: "Email y nombre son requeridos" },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim();

    // 1. Guardar o actualizar usuario en la base de datos
    let user = await prisma.user.findUnique({
      where: { email: cleanEmail },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: cleanEmail,
          name: cleanName,
          role: "familia",
          hasActiveSub: false,
        },
      });
      console.log(`✅ Nuevo lead creado en DB: ${cleanName} (${cleanEmail})`);
    } else if (!user.name) {
      user = await prisma.user.update({
        where: { id: user.id },
        data: { name: cleanName },
      });
    }

    // 2. Registrar en ActivityLog
    try {
      await prisma.activityLog.create({
        data: {
          userId: user.id,
          action: "Lead Magnet (Regalo Redes)",
          details: `Solicitó 2 canciones y 2 recitados desde /regalo`,
        },
      });
    } catch (logErr) {
      console.error("Error guardando ActivityLog de lead:", logErr);
    }

    // 3. Enviar Email 1: Entrega de las canciones y recitados
    try {
      const transport = createTransport(process.env.EMAIL_SERVER);
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://musicabalu.com";

      const emailHtml = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px 20px; color: #2d3748; line-height: 1.65; font-size: 16px;">
          <p style="font-size: 18px; font-weight: 700; color: #1a202c; margin-bottom: 20px;">
            ¡Hola, ${cleanName}! Soy Javi de Musicabalú 🎵
          </p>

          <p>
            Como te comentaba en el vídeo, aquí tienes tu acceso directo a las <strong>dos canciones</strong>, <strong>dos recitados rítmicos</strong> y píldoras formativas de regalo para que podáis usarlas desde hoy mismo en casa:
          </p>

          <div style="text-align: center; margin: 28px 0;">
            <a href="${siteUrl}/comunidad/canciones" style="background-color: #00B2E3; color: white; padding: 14px 28px; border-radius: 999px; text-decoration: none; font-weight: 800; font-size: 16px; display: inline-block; box-shadow: 0 4px 14px rgba(0, 178, 227, 0.35);">
              🎵 Escuchar mis canciones y recitados ahora →
            </a>
          </div>

          <div style="background-color: #f7fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px 20px; margin: 24px 0; font-size: 15px;">
            <strong>Tus datos para acceder en cualquier momento:</strong><br/>
            • <strong>Enlace web:</strong> <a href="${siteUrl}/login" style="color: #00B2E3; font-weight: bold;">www.musicabalu.com/login</a><br/>
            • <strong>Tu email:</strong> ${cleanEmail}<br/>
            <small style="color: #718096; display: block; margin-top: 6px;">(Al entrar, pon este correo y recibirás un enlace de acceso mágico y seguro en 1 segundo, sin contraseñas difíciles).</small>
          </div>

          <p>
            Te invito a que escuches las dos canciones abiertas. He elegido dos muy distintas a propósito para que notes el contraste: una está pensada específicamente para momentos de calma y relajación, y la otra es más dinámica, con ritmos diferentes para fomentar el movimiento.
          </p>

          <p>
            Quizá notes algo curioso al escucharlas: <strong>no tienen letras que cuenten historias complejas</strong>, ni instrumentaciones digitales sobrecargadas.
          </p>

          <p>
            ¿Por qué? Porque en Musicabalú compongo todas las canciones basándome en la <strong>Teoría del Aprendizaje Musical (MLT) de Edwin Gordon</strong>. Esta pedagogía nos enseña que los bebés aprenden música igual que aprenden a hablar: absorbiendo un vocabulario rico en diferentes modos y métricas a través de la escucha activa.
          </p>

          <p>
            Al eliminar la sobrecarga de la letra y los sonidos sintéticos, el cerebro de tu peque no se distrae intentando procesar el lenguaje verbal, lo que favorece un estado de atención y conexión únicos.
          </p>

          <p>
            Pruébalas hoy en casa y me cuentas qué tal os ha ido respondiendo directamente a este correo.
          </p>

          <p style="margin-top: 28px; margin-bottom: 4px;">
            Un abrazo grande,
          </p>
          <p style="font-weight: 700; color: #1a202c; margin-top: 0;">
            Javi Balú.<br/>
            <span style="font-weight: 400; color: #718096; font-size: 14px;">Educador musical y creador de Musicabalú</span>
          </p>

          ${getNewsletterFooterHtml(cleanEmail, true)}
        </div>
      `;

      await transport.sendMail({
        from: process.env.EMAIL_FROM,
        to: cleanEmail,
        subject: "🎵 Tu acceso a las canciones y recitados de Musicabalú está listo",
        html: emailHtml,
      });

      console.log(`✅ Email 1 de regalo enviado a: ${cleanEmail}`);

      // Notificación al admin
      await transport.sendMail({
        from: process.env.EMAIL_FROM,
        to: "hola@musicabalu.com",
        subject: `🎁 Nuevo contacto del vídeo (Regalo): ${cleanName}`,
        text: `¡Nuevo lead captado desde /regalo!\n\nNombre: ${cleanName}\nEmail: ${cleanEmail}\nFecha: ${new Date().toLocaleString("es-ES")}`,
      });
    } catch (emailErr) {
      console.error("Error enviando email de bienvenida de lead:", emailErr);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error en /api/subscribe:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
