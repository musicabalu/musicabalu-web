import { PrismaClient } from '@prisma/client';
import AnalyticsDashboard from './AnalyticsDashboard';
import Link from 'next/link';

const prisma = new PrismaClient();
export const dynamic = 'force-dynamic';

export default async function AnaliticasPage() {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  // Fetch all logs from the last 30 days excluding admin
  const logs = await prisma.activityLog.findMany({
    where: {
      createdAt: { gte: thirtyDaysAgo },
      user: {
        email: { notIn: ['musicabalu@gmail.com', 'hola@musicabalu.com'] }
      }
    },
    select: {
      action: true,
      details: true
    }
  });

  // Procesar Visitas a Páginas
  const pageViews = {};
  // Procesar Reproducciones de Audio
  const audioPlays = {};

  logs.forEach(log => {
    if (log.action === 'Visita de vista') {
      let page = log.details.replace('Accedió a: ', '').trim();
      // Simplify page names for better charts
      if (page.startsWith('/comunidad/mi-clase')) page = 'Mi Clase';
      else if (page.startsWith('/comunidad/canciones')) page = 'Canciones';
      else if (page.startsWith('/comunidad/recitados')) page = 'Recitados';
      else if (page.startsWith('/comunidad/pildoras')) page = 'Píldoras';
      else if (page.startsWith('/formaciones')) page = 'Formaciones';
      else if (page.startsWith('/dashboard')) page = 'Inicio';
      else if (page.startsWith('/conocenos')) page = 'Conócenos';
      else if (page.startsWith('/presencial')) page = 'Presencial';
      else if (page === '/') page = 'Landing';

      pageViews[page] = (pageViews[page] || 0) + 1;
    } 
    else if (log.action === 'REPRODUCIR_AUDIO' || log.action === 'Reproducción') {
      let audio = log.details.replace('Escuchó: ', '').replace('(Compartida)', '').replace('(Compartido)', '').trim();
      audioPlays[audio] = (audioPlays[audio] || 0) + 1;
    }
  });

  // Formatear datos para Recharts y ordenar
  const pageViewsData = Object.keys(pageViews)
    .map(key => ({ name: key, vistas: pageViews[key] }))
    .sort((a, b) => b.vistas - a.vistas)
    .slice(0, 10); // Top 10

  const audioPlaysData = Object.keys(audioPlays)
    .map(key => ({ name: key, reproducciones: audioPlays[key] }))
    .sort((a, b) => b.reproducciones - a.reproducciones)
    .slice(0, 10); // Top 10

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px 40px 20px' }}>
      <Link href="/admin" style={{ display: 'inline-flex', alignItems: 'center', color: '#718096', textDecoration: 'none', marginBottom: '1.5rem', fontWeight: '500', fontSize: '0.9rem' }}>
        <span style={{ marginRight: '8px' }}>←</span> Volver a Panel de Control
      </Link>
      
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', color: 'var(--color-dark)', margin: '0 0 10px 0', fontFamily: 'var(--font-heading)' }}>
          Analíticas y Estadísticas
        </h1>
        <p style={{ color: '#718096', margin: 0 }}>
          Mostrando datos agregados de los últimos 30 días.
        </p>
      </header>

      <AnalyticsDashboard 
        pageViewsData={pageViewsData} 
        audioPlaysData={audioPlaysData} 
      />
    </div>
  );
}
