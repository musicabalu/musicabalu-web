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
      details: true,
      user: {
        select: {
          name: true,
          email: true,
          role: true,
          hasActiveSub: true,
          enrollments: {
            select: { status: true }
          }
        }
      }
    }
  });

  // Procesar Visitas a Páginas y Reproducciones Globales
  const pageViews = {};
  const audioPlays = {};
  
  // Procesar por usuario
  const usersMap = {};

  // Fetch all users to ensure everyone (especially 'educador' without recent activity) appears in the dropdowns
  const allUsers = await prisma.user.findMany({
    where: {
      email: { notIn: ['musicabalu@gmail.com', 'hola@musicabalu.com', 'jamusanchez@gmail.com'] }
    },
    select: {
      name: true,
      email: true,
      role: true,
      hasActiveSub: true,
      enrollments: {
        select: { status: true }
      }
    }
  });

  allUsers.forEach(u => {
    if (!u.email) return;
    const hasComunidad = u.hasActiveSub || u.role === 'admin' || (u.enrollments && u.enrollments.some(e => e.status === 'active' || e.status === 'pending'));
    const hasFormaciones = u.role === 'educador' || u.role === 'admin';
    
    usersMap[u.email] = {
      name: u.name || u.email,
      email: u.email,
      hasComunidad,
      hasFormaciones,
      pageViews: {},
      audioPlays: {}
    };
  });

  logs.forEach(log => {
    const userKey = log.user?.email || 'Desconocido';
    if (!usersMap[userKey]) {
      const u = log.user;
      
      let hasComunidad = false;
      let hasFormaciones = false;
      
      if (u) {
        hasComunidad = u.hasActiveSub || u.role === 'admin' || (u.enrollments && u.enrollments.some(e => e.status === 'active' || e.status === 'pending'));
        hasFormaciones = u.role === 'educador' || u.role === 'admin';
      }

      usersMap[userKey] = {
        name: u?.name || userKey,
        email: userKey,
        hasComunidad,
        hasFormaciones,
        pageViews: {},
        audioPlays: {}
      };
    }

    if (log.action === 'Visita de vista') {
      let page = log.details.replace('Accedió a: ', '').trim();
      if (page.startsWith('/comunidad/mi-clase')) page = 'Mi Clase';
      else if (page.startsWith('/comunidad/canciones')) page = 'Canciones';
      else if (page.startsWith('/comunidad/recitados')) page = 'Recitados';
      else if (page.startsWith('/comunidad/pildoras')) page = 'Píldoras';
      else if (page.startsWith('/formaciones')) page = 'Formaciones';
      else if (page.startsWith('/dashboard')) page = 'Inicio';
      else if (page.startsWith('/conocenos')) page = 'Conócenos';
      else if (page.startsWith('/presencial')) page = 'Presencial';
      else if (page === '/') page = 'Landing';

      // Excluir Inicio de las analíticas
      if (page !== 'Inicio') {
        pageViews[page] = (pageViews[page] || 0) + 1;
        usersMap[userKey].pageViews[page] = (usersMap[userKey].pageViews[page] || 0) + 1;
      }
    } 
    else if (log.action === 'REPRODUCIR_AUDIO' || log.action === 'Reproducción') {
      let audio = log.details.replace('Escuchó: ', '').replace('(Compartida)', '').replace('(Compartido)', '').trim();
      audioPlays[audio] = (audioPlays[audio] || 0) + 1;
      usersMap[userKey].audioPlays[audio] = (usersMap[userKey].audioPlays[audio] || 0) + 1;
    }
  });

  // Formatear datos Globales
  const pageViewsData = Object.keys(pageViews)
    .map(key => ({ name: key, vistas: pageViews[key] }))
    .sort((a, b) => b.vistas - a.vistas)
    .slice(0, 10);

  const audioPlaysData = Object.keys(audioPlays)
    .map(key => ({ name: key, reproducciones: audioPlays[key] }))
    .sort((a, b) => b.reproducciones - a.reproducciones)
    .slice(0, 10);

  // Formatear datos de Usuarios
  const usersData = Object.values(usersMap).map(u => ({
    name: u.name,
    email: u.email,
    hasComunidad: u.hasComunidad,
    hasFormaciones: u.hasFormaciones,
    topPages: Object.keys(u.pageViews)
      .map(k => ({ name: k, vistas: u.pageViews[k] }))
      .sort((a, b) => b.vistas - a.vistas)
      .slice(0, 3),
    topAudios: Object.keys(u.audioPlays)
      .map(k => ({ name: k, reproducciones: u.audioPlays[k] }))
      .sort((a, b) => b.reproducciones - a.reproducciones)
      .slice(0, 3)
  })).sort((a, b) => a.name.localeCompare(b.name));

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
        usersData={usersData}
      />
    </div>
  );
}
