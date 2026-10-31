import { PrismaClient } from '@prisma/client';
import { createTransport } from 'nodemailer';
import { getNewsletterFooterHtml } from '../src/lib/emailUnsubscribe.js';

const prisma = new PrismaClient();

async function getUniqueLeads() {
  const leadLogs = await prisma.activityLog.findMany({
    where: { action: { contains: "Lead Magnet" } },
    include: { user: true },
    orderBy: { createdAt: "desc" }
  });

  const seen = new Set();
  const leads = [];
  for (const l of leadLogs) {
    const email = (l.user?.email || "").trim().toLowerCase();
    if (!email || seen.has(email)) continue;
    seen.add(email);
    // Extraer solo el primer nombre para un saludo más cálido si tiene apellidos
    const rawName = (l.user?.name || "").trim();
    const firstName = rawName ? rawName.split(" ")[0] : "familia";
    leads.push({ email, name: firstName, fullName: rawName || "familia" });
  }
  return leads;
}

export async function sendRescue() {
  const leads = await getUniqueLeads();
  console.log(`Leads a reactivar: ${leads.length}`);

  const transport = createTransport(process.env.EMAIL_SERVER);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://musicabalu.com";
  const subject = "🎵 Tus 4 audios de regalo de Musicabalú (acceso en 1 clic)";

  let sent = 0;
  for (const lead of leads) {
    const listenUrl = `${siteUrl}/regalo/escuchar?email=${encodeURIComponent(lead.email)}&name=${encodeURIComponent(lead.name)}`;

    const html = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px 20px; color: #2d3748; line-height: 1.65; font-size: 16px;">
        <p style="font-size: 17px; font-weight: 700; color: #1a202c; margin-bottom: 16px;">
          ¡Hola, ${lead.name}!
        </p>

        <p>
          Te escribo porque vi que te registraste para escuchar las 2 canciones y 2 recitados de regalo para tu peque.
        </p>

        <p>
          He cambiado el acceso para que te sea mucho más sencillo: ahora puedes escucharlas directamente en un solo clic desde tu móvil o tablet, sin contraseñas ni esperas:
        </p>

        <div style="text-align: center; margin: 26px 0;">
          <a href="${listenUrl}" style="background-color: #00B2E3; color: white; padding: 14px 28px; border-radius: 999px; text-decoration: none; font-weight: 800; font-size: 16px; display: inline-block; box-shadow: 0 4px 14px rgba(0, 178, 227, 0.35);">
            👉 Escuchar mis 4 audios de regalo aquí →
          </a>
        </div>

        <p style="font-size: 14px; color: #718096; text-align: center; margin-top: -10px; margin-bottom: 24px;">
          (O copia este enlace directo en tu navegador: <a href="${listenUrl}" style="color: #00B2E3;">${listenUrl}</a>)
        </p>

        <p>
          Pruébalas hoy en casa y me cuentas qué tal le sientan a tu peque.
        </p>

        <p style="margin-top: 24px; margin-bottom: 4px;">
          ¡Un abrazo!
        </p>
        <p style="font-weight: 700; color: #1a202c; margin-top: 0;">
          Javi.<br/>
          <span style="font-weight: 400; color: #718096; font-size: 14px;">Musicabalú</span>
        </p>

        ${getNewsletterFooterHtml(lead.email, true)}
      </div>
    `;

    try {
      await transport.sendMail({
        from: process.env.EMAIL_FROM,
        to: lead.email,
        subject,
        html,
      });
      sent++;
      console.log(`[${sent}/${leads.length}] Enviado a: ${lead.name} <${lead.email}>`);
      await new Promise(r => setTimeout(r, 250));
    } catch (err) {
      console.error(`Error enviando a ${lead.email}:`, err.message);
    }
  }

  console.log(`\n🎉 Completado: ${sent} correos de reactivación enviados con éxito.`);
}

if (process.argv[2] === '--send') {
  sendRescue().catch(console.error).finally(() => prisma.$disconnect());
} else {
  console.log("Modo seguro: ejecuta con --send para enviar los correos.");
  prisma.$disconnect();
}
