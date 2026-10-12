import { PrismaClient } from '@prisma/client';
import AudioStatsClient from './AudioStatsClient';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();
export const dynamic = 'force-dynamic';

export default async function AudiosAnaliticasPage() {
  const now = new Date();
  
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(now.getDate() - 7);

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(now.getDate() - 30);

  const thirtySevenDaysAgo = new Date();
  thirtySevenDaysAgo.setDate(now.getDate() - 37);

  // 1. Obtener logs actuales (últimos 30 días)
  const logsCurrent = await prisma.activityLog.findMany({
    where: {
      createdAt: { gte: thirtyDaysAgo },
      action: { in: ['REPRODUCIR_AUDIO', 'Reproducción'] },
      user: { email: { notIn: ['musicabalu@gmail.com', 'hola@musicabalu.com'] } }
    },
    select: { details: true }
  });

  // Logs anteriores (los 30 días de la semana pasada, es decir, de hace 37 a hace 7 días)
  const logsPrevious = await prisma.activityLog.findMany({
    where: {
      createdAt: { gte: thirtySevenDaysAgo, lt: sevenDaysAgo },
      action: { in: ['REPRODUCIR_AUDIO', 'Reproducción'] },
      user: { email: { notIn: ['musicabalu@gmail.com', 'hola@musicabalu.com'] } }
    },
    select: { details: true }
  });

  // 2. Contar reproducciones
  const currentPlays = {};
  logsCurrent.forEach(log => {
    let audioName = log.details.replace('Escuchó: ', '').replace('(Compartida)', '').replace('(Compartido)', '').trim();
    currentPlays[audioName] = (currentPlays[audioName] || 0) + 1;
  });

  const previousPlays = {};
  logsPrevious.forEach(log => {
    let audioName = log.details.replace('Escuchó: ', '').replace('(Compartida)', '').replace('(Compartido)', '').trim();
    previousPlays[audioName] = (previousPlays[audioName] || 0) + 1;
  });

  // 3. Obtener el ranking de la semana pasada (para saber las posiciones)
  const previousRankingList = Object.keys(previousPlays)
    .sort((a, b) => previousPlays[b] - previousPlays[a]);

  // 4. Leer diccionarios de audios para sacar la categoría
  const titulosPath1 = path.join(process.cwd(), 'public', 'audios', 'comunidad_titulos.json');
  const titulosPath2 = path.join(process.cwd(), 'public', 'audios', 'titulos.json');
  
  const titleToCategory = {};

  try {
    const data1 = JSON.parse(fs.readFileSync(titulosPath1, 'utf8'));
    Object.entries(data1).forEach(([fileUrl, title]) => {
      let cat = 'Otros';
      if (fileUrl.includes('/canciones/')) cat = 'Canciones';
      else if (fileUrl.includes('/recitados/')) cat = 'Recitados';
      titleToCategory[title.trim()] = cat;
    });

    const data2 = JSON.parse(fs.readFileSync(titulosPath2, 'utf8'));
    Object.entries(data2).forEach(([fileUrl, title]) => {
      let cat = 'Otros';
      if (fileUrl.includes('/canciones/')) cat = 'Canciones';
      else if (fileUrl.includes('/karaokes/')) cat = 'Karaokes';
      else if (fileUrl.includes('/recitados/')) cat = 'Recitados';
      if (!titleToCategory[title.trim()]) {
        titleToCategory[title.trim()] = cat;
      }
    });
  } catch (error) {
    console.error("Error leyendo json de audios:", error);
  }

  // 5. Formatear datos finales
  const allAudiosData = Object.keys(currentPlays)
    .map(name => {
      const prevIndex = previousRankingList.indexOf(name);
      const prevRank = prevIndex === -1 ? null : prevIndex + 1;
      
      return {
        name,
        reproducciones: currentPlays[name],
        category: titleToCategory[name] || 'Otros',
        prevRank
      };
    })
    .sort((a, b) => b.reproducciones - a.reproducciones);

  // Añadir el cambio de posición
  allAudiosData.forEach((audio, index) => {
    const currentRank = index + 1;
    audio.change = audio.prevRank ? audio.prevRank - currentRank : 'NEW';
  });

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px 40px 20px' }}>
      <Link href="/admin/analiticas" style={{ display: 'inline-flex', alignItems: 'center', color: '#718096', textDecoration: 'none', marginBottom: '1.5rem', fontWeight: '500', fontSize: '0.9rem' }}>
        <span style={{ marginRight: '8px' }}>←</span> Volver a Panel General de Analíticas
      </Link>
      
      <header style={{ marginBottom: '1rem' }}>
        <h1 style={{ fontSize: '2rem', color: 'var(--color-dark)', margin: '0 0 10px 0', fontFamily: 'var(--font-heading)' }}>
          Audios Más Escuchados
        </h1>
      </header>

      <AudioStatsClient allAudiosData={allAudiosData} />
    </div>
  );
}
