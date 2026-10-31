import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getStats() {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const logs = await prisma.activityLog.findMany({
    where: {
      createdAt: { gte: thirtyDaysAgo },
      user: {
        email: { notIn: ['musicabalu@gmail.com', 'hola@musicabalu.com', 'jamusanchez@gmail.com'] }
      }
    }
  });

  const pageViews = {};
  const audioPlays = {};
  const pills = {};

  logs.forEach(l => {
    if (l.action === 'Visita de vista' && l.details) {
      const page = l.details.replace('Accedió a: ', '').trim();
      pageViews[page] = (pageViews[page] || 0) + 1;
    } else if (l.action === 'REPRODUCIR_AUDIO' && l.details) {
      audioPlays[l.details] = (audioPlays[l.details] || 0) + 1;
    } else if (l.action === 'VER_PILDORA' && l.details) {
      pills[l.details] = (pills[l.details] || 0) + 1;
    }
  });

  console.log("--- TOP PÁGINAS (ÚLTIMOS 30 DÍAS) ---");
  const sortedPages = Object.entries(pageViews).sort((a,b) => b[1] - a[1]);
  sortedPages.forEach(([p, c]) => console.log(`${c} visitas -> ${p}`));

  console.log("\n--- TOP AUDIOS REPRODUCIDOS (ÚLTIMOS 30 DÍAS) ---");
  const sortedAudios = Object.entries(audioPlays).sort((a,b) => b[1] - a[1]).slice(0, 15);
  sortedAudios.forEach(([a, c]) => console.log(`${c} plays -> ${a}`));

  console.log("\n--- VISUALIZACIÓN DE PÍLDORAS (ÚLTIMOS 30 DÍAS) ---");
  const sortedPills = Object.entries(pills).sort((a,b) => b[1] - a[1]);
  sortedPills.forEach(([p, c]) => console.log(`${c} vistas -> ${p}`));
}

getStats().catch(console.error).finally(() => prisma.$disconnect());
