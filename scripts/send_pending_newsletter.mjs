import { PrismaClient } from '@prisma/client';
import { createTransport } from 'nodemailer';
import { getNewsletterFooterHtml } from '../src/lib/emailUnsubscribe.js';
import tls from 'node:tls';

const prisma = new PrismaClient();
const emailUser = 'musicabalu@gmail.com';
const pass = 'mwrkcbgkhgdvlfji';

const SUBJECT = "🎵 Nuevas canciones y recitados de este viernes en Musicabalú 💛";

const BODY_RAW = `¡Hola, [Nombre]! 🤗

¡Ya tenemos listas las novedades musicales de esta semana para seguir disfrutando y jugando en casa!

Esta semana sumamos a la biblioteca:

🎶 Nueva Canción:
• Cubana — Una melodía alegre y mucho sabor para bailar y moverse juntos.

🗣️ Dos Nuevos Recitados:
• Mirando el reloj — con letra para jugar con el pulso y diferentes timbres percusivos.
• Chucu va —  sin letra y con dos partes muy diferenciadas para acompañar con movimientos contrastantes.

Podéis escucharlos directamente desde la web en sus secciones:

🎵 Canciones:
https://musicabalu.com/comunidad/canciones

🗣️ Recitados:
https://musicabalu.com/comunidad/recitados

Recordad que en casa no hace falta pedirles que canten o repitan: con que la música suene, os vean disfrutarla y juguéis juntos, su oído y su musicalidad se van reforzando de forma natural.

¡Que paséis un fin de semana lleno de ritmo y juego en familia! 💛

Un abrazo,

Javi`;

async function getRecipients() {
  const unsubNotes = await prisma.adminNote.findMany({
    where: { category: "EmailBaja" },
  });
  const unsubSet = new Set(unsubNotes.map((n) => (n.title || "").trim().toLowerCase()));

  const enrollments = await prisma.enrollment.findMany({
    where: {
      status: "active",
      email: { not: "jamusanchez@gmail.com" },
    },
    include: { group: true },
  });

  const subUsers = await prisma.user.findMany({
    where: {
      hasActiveSub: true,
      email: { not: "jamusanchez@gmail.com" },
    },
  });

  const comunidadMap = new Map();

  for (const e of enrollments) {
    const email = (e.email || "").trim().toLowerCase();
    if (!email || unsubSet.has(email) || e.acceptedComms === false) {
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
    if (!email || unsubSet.has(email) || comunidadMap.has(email)) continue;
    comunidadMap.set(email, {
      email,
      name: u.name || "Familia",
      source: "Suscriptor Online",
    });
  }

  return Array.from(comunidadMap.values());
}

async function getSentFromToday() {
  return new Promise((resolve, reject) => {
    const socket = tls.connect(993, 'imap.gmail.com', { rejectUnauthorized: false }, () => {});

    let step = 0;
    let buffer = '';
    const sentAddresses = new Set();

    socket.on('data', (data) => {
      buffer += data.toString();
      if (step === 0 && buffer.includes('* OK')) {
        buffer = '';
        step = 1;
        socket.write(`A01 LOGIN ${emailUser} ${pass}\r\n`);
      } else if (step === 1 && buffer.includes('A01 OK')) {
        buffer = '';
        step = 2;
        socket.write(`A02 SELECT "[Gmail]/Enviados"\r\n`);
      } else if (step === 2 && buffer.includes('A02 OK')) {
        buffer = '';
        step = 3;
        const today = new Date();
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const dateStr = `${today.getDate()}-${months[today.getMonth()]}-${today.getFullYear()}`;
        socket.write(`A03 SEARCH SINCE ${dateStr}\r\n`);
      } else if (step === 3 && buffer.includes('A03 OK')) {
        const searchLine = buffer.split('\r\n').find(l => l.startsWith('* SEARCH'));
        const ids = searchLine ? searchLine.replace('* SEARCH', '').trim().split(/\s+/).filter(Boolean) : [];
        buffer = '';
        if (ids.length === 0) {
          socket.write(`A04 LOGOUT\r\n`);
          resolve(new Set());
          return;
        }
        const recentIds = ids.slice(-100).join(',');
        step = 4;
        socket.write(`A04 FETCH ${recentIds} (BODY.PEEK[HEADER.FIELDS (TO SUBJECT DATE)])\r\n`);
      } else if (step === 4 && buffer.includes('A04 OK')) {
        const lines = buffer.split('\r\n');
        for (const line of lines) {
          if (/^To:\s*/i.test(line)) {
            const raw = line.replace(/^To:\s*/i, '').trim();
            const emailMatches = raw.match(/<([^>]+)>/) || raw.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
            if (emailMatches) {
              sentAddresses.add(emailMatches[1].trim().toLowerCase());
            }
          }
        }
        step = 5;
        socket.write(`A05 LOGOUT\r\n`);
        resolve(sentAddresses);
      }
    });

    socket.on('error', reject);
    socket.on('end', () => resolve(sentAddresses));
  });
}

export async function runSendPending() {
  const allRecipients = await getRecipients();
  const alreadySent = await getSentFromToday();

  const pending = allRecipients.filter(r => !alreadySent.has(r.email));
  console.log(`Total Comunidad: ${allRecipients.length}`);
  console.log(`Ya enviados: ${alreadySent.size}`);
  console.log(`Pendientes de enviar ahora: ${pending.length}`);

  if (pending.length === 0) {
    console.log("¡No queda ningún correo pendiente!");
    return;
  }

  const transport = createTransport(process.env.EMAIL_SERVER);

  const formattedHtmlBody = BODY_RAW
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

  let sentCount = 0;
  for (let i = 0; i < pending.length; i++) {
    const recipient = pending[i];
    try {
      const personalizedBody = formattedHtmlBody.replace(
        /\[Nombre\]/gi,
        recipient.name || "familia"
      );
      const html = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          ${personalizedBody}
          ${getNewsletterFooterHtml(recipient.email, true)}
        </div>
      `;
      await transport.sendMail({
        from: process.env.EMAIL_FROM,
        to: recipient.email,
        subject: SUBJECT,
        html,
      });
      sentCount++;
      console.log(`[${sentCount}/${pending.length}] Enviado a: ${recipient.name} <${recipient.email}>`);
      // Breve pausa de 200ms para evitar saturación de Gmail SMTP
      await new Promise(r => setTimeout(r, 200));
    } catch (err) {
      console.error(`Error enviando a ${recipient.email}:`, err.message);
    }
  }

  console.log(`\n🎉 Completado: ${sentCount} correos enviados con éxito.`);
}

if (process.argv[2] === '--send') {
  runSendPending()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
} else {
  console.log("Modo seguro: para ejecutar el envío real ejecuta con --send");
  prisma.$disconnect();
}
