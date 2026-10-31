import { PrismaClient } from '@prisma/client';
import tls from 'node:tls';

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

async function main() {
  const recipients = await getRecipients();
  console.log(`TOTAL_RECIPIENTS: ${recipients.length}`);
  console.log(JSON.stringify(recipients, null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());
