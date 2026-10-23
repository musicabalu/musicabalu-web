import { PrismaClient } from '@prisma/client';
import AnalyticsDashboard from './AnalyticsDashboard';
import Link from 'next/link';
import { VIDEO_PILLS } from '@/data/videoPills';

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
        email: { notIn: ['musicabalu@gmail.com', 'hola@musicabalu.com', 'jamusanchez@gmail.com'] }
      }
    },
    select: {
      action: true,
      details: true,
      createdAt: true,
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

  // Procesar Visitas a Páginas, Reproducciones de Audio y Visualizaciones de Píldoras
  const pageViews = {};
  const audioPlays = {};
  const pillViews = {};

  // Inicializar las 5 píldoras para que siempre se vean en la gráfica aunque tengan 0 vistas
  VIDEO_PILLS.forEach(p => {
    const key = `#${p.numero} ${p.title}`;
    pillViews[key] = 0;
  });

  // Mapa de usuarios que han entrado a /comunidad/pildoras o visto alguna píldora
  const pildorasVisitorsMap = {};
  
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
    const isDigitalSubscriber = !!u.hasActiveSub;
    const isPresential = u.enrollments && u.enrollments.some(e => e.status === 'active' || e.status === 'pending');
    const hasComunidad = isDigitalSubscriber || isPresential || u.role === 'admin';
    const hasFormaciones = u.role === 'educador' || u.role === 'admin';
    
    usersMap[u.email] = {
      name: u.name || u.email,
      email: u.email,
      hasComunidad,
      hasFormaciones,
      isDigitalSubscriber,
      isPresential,
      pageViews: {},
      audioPlays: {},
      pillViews: {},
      lastConnection: null
    };
  });

  logs.forEach(log => {
    const userKey = log.user?.email || 'Desconocido';
    if (!usersMap[userKey]) {
      const u = log.user;
      
      const isDigitalSubscriber = !!u?.hasActiveSub;
      const isPresential = u?.enrollments && u.enrollments.some(e => e.status === 'active' || e.status === 'pending');
      const hasComunidad = isDigitalSubscriber || isPresential || u?.role === 'admin';
      const hasFormaciones = u?.role === 'educador' || u?.role === 'admin';

      usersMap[userKey] = {
        name: u?.name || userKey,
        email: userKey,
        hasComunidad,
        hasFormaciones,
        isDigitalSubscriber,
        isPresential,
        pageViews: {},
        audioPlays: {},
        pillViews: {},
        lastConnection: null
      };
    }

    if (!usersMap[userKey].lastConnection || log.createdAt > usersMap[userKey].lastConnection) {
      usersMap[userKey].lastConnection = log.createdAt;
    }

    if (log.action === 'Visita de vista') {
      let rawPath = (log.details || '').replace('Accedió a: ', '').trim();
      let page = rawPath;
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

      // Si visitó la sección de Píldoras, registrar en el resumen de visitantes de Píldoras
      if (rawPath.startsWith('/comunidad/pildoras')) {
        if (!pildorasVisitorsMap[userKey]) {
          pildorasVisitorsMap[userKey] = {
            name: usersMap[userKey].name,
            email: userKey,
            sectionVisits: 0,
            pillsOpened: 0,
            pillsList: new Set(),
            durations: [],
            lastVisit: null
          };
        }
        pildorasVisitorsMap[userKey].sectionVisits += 1;
        if (!pildorasVisitorsMap[userKey].lastVisit || log.createdAt > pildorasVisitorsMap[userKey].lastVisit) {
          pildorasVisitorsMap[userKey].lastVisit = log.createdAt;
        }
      }
    } 
    else if (log.action === 'REPRODUCIR_AUDIO' || log.action === 'Reproducción') {
      let audio = (log.details || '').replace('Escuchó: ', '').replace('(Compartida)', '').replace('(Compartido)', '').trim();
      audioPlays[audio] = (audioPlays[audio] || 0) + 1;
      usersMap[userKey].audioPlays[audio] = (usersMap[userKey].audioPlays[audio] || 0) + 1;
    }
    else if (log.action === 'VER_PILDORA') {
      // Ejemplo de details: "Píldora #1: Edwin Gordon y la MLT"
      const rawDetail = (log.details || '').trim();
      let normalizedKey = rawDetail.replace('Píldora ', '').replace(':', '');
      // Buscar coincidencia exacta con VIDEO_PILLS
      const matchedPill = VIDEO_PILLS.find(p => rawDetail.includes(p.title) || rawDetail.includes(`#${p.numero}`));
      if (matchedPill) {
        normalizedKey = `#${matchedPill.numero} ${matchedPill.title}`;
      }
      pillViews[normalizedKey] = (pillViews[normalizedKey] || 0) + 1;
      usersMap[userKey].pillViews[normalizedKey] = (usersMap[userKey].pillViews[normalizedKey] || 0) + 1;

      if (!pildorasVisitorsMap[userKey]) {
        pildorasVisitorsMap[userKey] = {
          name: usersMap[userKey].name,
          email: userKey,
          sectionVisits: 0,
          pillsOpened: 0,
          pillsList: new Set(),
          durations: [],
          lastVisit: null
        };
      }
      pildorasVisitorsMap[userKey].pillsOpened += 1;
      pildorasVisitorsMap[userKey].pillsList.add(normalizedKey);
      if (!pildorasVisitorsMap[userKey].lastVisit || log.createdAt > pildorasVisitorsMap[userKey].lastVisit) {
        pildorasVisitorsMap[userKey].lastVisit = log.createdAt;
      }
    }
    else if ((log.action === 'Permanencia' || log.action === 'Cierre de sesión / Pestaña') && (log.details || '').includes('/comunidad/pildoras')) {
      const matchTime = (log.details || '').match(/(?:Estuvo|estar)\s+([0-9ms\s]+)\s+en:/);
      if (matchTime && matchTime[1]) {
        const rawDuration = matchTime[1].trim();
        // Si dejó la pestaña abierta en segundo plano más de 60 minutos (ej. 1856m), no ensuciar con ese número
        const minMatch = rawDuration.match(/(\d+)m/);
        const minutes = minMatch ? parseInt(minMatch[1], 10) : 0;
        if (minutes <= 60) {
          if (!pildorasVisitorsMap[userKey]) {
            pildorasVisitorsMap[userKey] = {
              name: usersMap[userKey].name,
              email: userKey,
              sectionVisits: 0,
              pillsOpened: 0,
              pillsList: new Set(),
              durations: [],
              lastVisit: log.createdAt
            };
          }
          pildorasVisitorsMap[userKey].durations.push(rawDuration);
        }
      }
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

  const pillViewsData = Object.keys(pillViews)
    .map(key => ({ name: key, visualizaciones: pillViews[key] }));

  const pildorasVisitorsData = Object.values(pildorasVisitorsMap)
    .map(v => ({
      name: v.name,
      email: v.email,
      sectionVisits: v.sectionVisits,
      pillsOpened: v.pillsOpened,
      pillsList: Array.from(v.pillsList),
      durations: v.durations.slice(0, 5),
      lastVisit: v.lastVisit ? v.lastVisit.toISOString() : null
    }))
    .sort((a, b) => (b.lastVisit || '').localeCompare(a.lastVisit || ''));

  // Formatear datos de Usuarios
  const usersData = Object.values(usersMap).map(u => ({
    name: u.name,
    email: u.email,
    hasComunidad: u.hasComunidad,
    hasFormaciones: u.hasFormaciones,
    isDigitalSubscriber: u.isDigitalSubscriber,
    isPresential: u.isPresential,
    totalViews: Object.values(u.pageViews).reduce((a, b) => a + b, 0),
    totalAudios: Object.values(u.audioPlays).reduce((a, b) => a + b, 0),
    totalPildoras: Object.values(u.pillViews).reduce((a, b) => a + b, 0) + (u.pageViews['Píldoras'] || 0),
    lastConnection: u.lastConnection ? u.lastConnection.toISOString() : null,
    topPages: Object.keys(u.pageViews)
      .map(k => ({ name: k, vistas: u.pageViews[k] }))
      .sort((a, b) => b.vistas - a.vistas)
      .slice(0, 3),
    topAudios: Object.keys(u.audioPlays)
      .map(k => ({ name: k, reproducciones: u.audioPlays[k] }))
      .sort((a, b) => b.reproducciones - a.reproducciones)
      .slice(0, 3),
    topPills: Object.keys(u.pillViews)
      .map(k => ({ name: k, visualizaciones: u.pillViews[k] }))
      .sort((a, b) => b.visualizaciones - a.visualizaciones)
      .slice(0, 5)
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
        pillViewsData={pillViewsData}
        pildorasVisitorsData={pildorasVisitorsData}
        usersData={usersData}
      />
    </div>
  );
}
