import { PrismaClient } from '@prisma/client';
import AudioStatsClient from './AudioStatsClient';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();
export const dynamic = 'force-dynamic';

export default async function AudiosAnaliticasPage() {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  // 1. Obtener todos los logs de audios
  const logs = await prisma.activityLog.findMany({
    where: {
      createdAt: { gte: thirtyDaysAgo },
      action: { in: ['REPRODUCIR_AUDIO', 'Reproducción'] },
      user: {
        email: { notIn: ['musicabalu@gmail.com', 'hola@musicabalu.com'] }
      }
    },
    select: { details: true }
  });

  // 2. Contar reproducciones
  const audioPlays = {};
  logs.forEach(log => {
    let audioName = log.details.replace('Escuchó: ', '').replace('(Compartida)', '').replace('(Compartido)', '').trim();
    audioPlays[audioName] = (audioPlays[audioName] || 0) + 1;
  });

  // 3. Leer diccionarios de audios para sacar la categoría
  const titulosPath1 = path.join(process.cwd(), 'public', 'audios', 'comunidad_titulos.json');
  const titulosPath2 = path.join(process.cwd(), 'public', 'audios', 'titulos.json');
  
  const titleToCategory = {}; // Map: "El oso bailarín" -> "Canciones"

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
      // Si ya existía de la comunidad, no lo machacamos si ya tenía categoría
      if (!titleToCategory[title.trim()]) {
        titleToCategory[title.trim()] = cat;
      }
    });
  } catch (error) {
    console.error("Error leyendo json de audios:", error);
  }

  // 4. Formatear datos finales
  const allAudiosData = Object.keys(audioPlays)
    .map(name => ({
      name,
      reproducciones: audioPlays[name],
      category: titleToCategory[name] || 'Otros'
    }))
    .sort((a, b) => b.reproducciones - a.reproducciones);

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
