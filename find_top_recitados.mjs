import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();

async function main() {
  const fileContents = fs.readFileSync('public/audios/comunidad_titulos.json', 'utf8');
  const data = JSON.parse(fileContents);
  
  // Find all titles that are recitados
  const recitadoTitles = Object.keys(data)
    .filter(url => url.includes('recitados/'))
    .map(url => data[url]);
  
  const allLogs = await prisma.activityLog.findMany({
    where: { action: 'REPRODUCIR_AUDIO' }
  });

  const countMap = {};
  allLogs.forEach(log => {
    if (recitadoTitles.includes(log.details)) {
      countMap[log.details] = (countMap[log.details] || 0) + 1;
    }
  });

  const sorted = Object.entries(countMap).sort((a,b) => b[1] - a[1]);
  console.log("TOP RECITADOS:");
  console.log(sorted.slice(0, 5));
}

main().catch(console.error).finally(() => prisma.$disconnect());
