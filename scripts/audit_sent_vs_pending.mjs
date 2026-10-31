import { PrismaClient } from '@prisma/client';
import tls from 'node:tls';

const email = 'musicabalu@gmail.com';
const pass = 'mwrkcbgkhgdvlfji';

const prisma = new PrismaClient();

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
        socket.write(`A01 LOGIN ${email} ${pass}\r\n`);
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

async function main() {
  const allRecipients = await getRecipients();
  const sentAddresses = await getSentFromToday();

  const sentList = [];
  const missingList = [];

  for (const r of allRecipients) {
    if (sentAddresses.has(r.email)) {
      sentList.push(r);
    } else {
      missingList.push(r);
    }
  }

  console.log(`TOTAL ESPERADOS: ${allRecipients.length}`);
  console.log(`YA ENVIADOS CON ÉXITO: ${sentList.length}`);
  console.log(`PENDIENTES DE ENVIAR: ${missingList.length}`);

  console.log("\n--- ENVIADOS CON ÉXITO (" + sentList.length + ") ---");
  sentList.forEach((r, idx) => console.log(`${idx + 1}. ${r.name} <${r.email}>`));

  console.log("\n--- PENDIENTES QUE FALTAN POR ENVIAR (" + missingList.length + ") ---");
  missingList.forEach((r, idx) => console.log(`${idx + 1}. ${r.name} <${r.email}>`));
}

main().catch(console.error).finally(() => prisma.$disconnect());
