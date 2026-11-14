import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import styles from './dashboard.module.css';

const prisma = new PrismaClient();
export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  // 1. Obtener métricas
  const groups = await prisma.group.findMany({
    include: {
      enrollments: {
        where: { 
          status: { in: ['active', 'pending'] },
          email: { not: 'jamusanchez@gmail.com' }
        }
      }
    },
    orderBy: {
      schedule: 'asc'
    }
  });

  const orders = await prisma.order.findMany({
    where: { status: 'completed' }
  });

  const enrollments = await prisma.enrollment.findMany({
    where: { 
      status: { in: ['active', 'pending'] },
      email: { not: 'jamusanchez@gmail.com' }
    }
  });

  const activeSubscribers = await prisma.user.count({
    where: {
      hasActiveSub: true,
      email: { notIn: ['musicabalu@gmail.com', 'hola@musicabalu.com', 'jamusanchez@gmail.com'] }
    }
  });

  // 2. Cálculos
  const totalCapacity = groups.reduce((acc, g) => acc + g.capacity, 0);
  const totalEnrolled = enrollments.length;
  const availableSpots = totalCapacity - totalEnrolled;
  const occupancyRate = totalCapacity > 0 ? Math.round((totalEnrolled / totalCapacity) * 100) : 0;

  const totalStoreRevenue = orders.reduce((acc, order) => acc + order.amountTotal, 0) / 100;

  const paymentStripe = enrollments.filter(e => e.paymentMethod === 'stripe').length;
  const paymentEfectivo = enrollments.filter(e => e.paymentMethod === 'efectivo').length;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Panel de Control Global</h1>
        <p className={styles.subtitle}>Visión general de Musicabalú</p>
      </header>

      {/* Tarjetas de Métricas Principales */}
      <div className={styles.statsGrid}>
        <Link href="/admin/inscripciones" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className={styles.statCard} style={{ cursor: 'pointer', transition: 'transform 0.2s', ':hover': { transform: 'translateY(-2px)' } }}>
            <h3 className={styles.statTitle}>Alumnos Activos</h3>
            <p className={styles.statValue}>{totalEnrolled}</p>
            <p className={styles.statDetail}>Plazas libres globales: {availableSpots} (Click para ver listado)</p>
          </div>
        </Link>

        <div className={styles.statCard}>
          <h3 className={styles.statTitle}>Ocupación</h3>
          <p className={styles.statValue}>{occupancyRate}%</p>
          <p className={styles.statDetail}>De {totalCapacity} plazas totales ofertadas</p>
        </div>

        <div className={styles.statCard}>
          <h3 className={styles.statTitle}>Métodos de Pago</h3>
          <p className={styles.statValue} style={{ fontSize: '1.8rem', marginTop: '10px' }}>
            💳 {paymentStripe} <span style={{fontSize: '1rem', color: '#888', fontWeight: 'normal'}}>Stripe</span>
          </p>
          <p className={styles.statValue} style={{ fontSize: '1.8rem' }}>
            💵 {paymentEfectivo} <span style={{fontSize: '1rem', color: '#888', fontWeight: 'normal'}}>Efectivo</span>
          </p>
        </div>

        <Link href="/admin/ventas" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className={styles.statCard} style={{ cursor: 'pointer', transition: 'transform 0.2s', ':hover': { transform: 'translateY(-2px)' } }}>
            <h3 className={styles.statTitle}>Ventas Tienda</h3>
            <p className={styles.statValue}>{totalStoreRevenue.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</p>
            <p className={styles.statDetail}>{orders.length} pedidos completados (Click para ver detalles)</p>
          </div>
        </Link>

        <Link href="/admin/suscriptores" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className={styles.statCard} style={{ cursor: 'pointer', transition: 'transform 0.2s', ':hover': { transform: 'translateY(-2px)' }, borderTop: '4px solid #805AD5' }}>
            <h3 className={styles.statTitle}>⭐ Suscriptores</h3>
            <p className={styles.statValue} style={{ color: '#805AD5' }}>{activeSubscribers}</p>
            <p className={styles.statDetail}>Suscripciones Comunidad (Click para ver listado)</p>
          </div>
        </Link>
        
      </div>
      
      {/* Herramientas de Gestión en Orden Alfabético */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2.5rem', marginBottom: '1rem', flexWrap: 'wrap', gap: '10px' }}>
        <h2 className={styles.sectionTitle} style={{ margin: 0 }}>Herramientas de Gestión</h2>
        <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: '600' }}>
          Ordenadas alfabéticamente (A → Z)
        </span>
      </div>
      <div className={styles.statsGrid} style={{ marginBottom: '2.5rem' }}>
        {[
          {
            title: "Analíticas (Gráficas)",
            href: "/admin/analiticas",
            icon: "📊",
            desc: "Estadísticas de uso mensual y gráficas",
            border: null,
          },
          {
            title: "Aterrizaje en EMPI",
            href: "/admin/aterrizaje-empi",
            icon: "🚀",
            desc: "Estrategia, Guía de Aula y Cartel A4",
            border: "2px solid #FED65E",
          },
          {
            title: "Auditoría, mantenimiento y backups",
            href: "/admin/auditoria",
            icon: "🧹",
            desc: "Mantenimiento y estado del sistema",
            border: null,
          },
          {
            title: "Cartel Plazas WhatsApp",
            href: "/admin/cartel",
            icon: "🖼️",
            desc: "Generador de carteles de WhatsApp",
            border: null,
          },
          {
            title: "Correo de los Viernes",
            href: "/admin/comunicaciones",
            icon: "📧",
            desc: "Enviar novedades semanales a la Comunidad",
            border: "2px solid var(--color-cyan, #00B2E3)",
          },
          {
            title: "Cronograma",
            href: "/admin/cronograma",
            icon: "📅",
            desc: "Planificación y seguimiento de tareas",
            border: null,
          },
          {
            title: "Embudo de Ventas (5 Emails)",
            href: "/admin/embudo",
            icon: "⚡",
            desc: "Automatización y seguimiento de leads",
            border: "2px solid #F4436C",
          },
          {
            title: "Estrategia",
            href: "/admin/estrategia",
            icon: "📈",
            desc: "Plan de negocio y visión a largo plazo",
            border: null,
          },
          {
            title: "Fiscalidad e IVA",
            href: "/admin/fiscalidad",
            icon: "🧾",
            desc: "Guía de cobros 4T e informe para asesoría",
            border: "2px solid #D97706",
          },
          {
            title: "Formaciones",
            href: "/admin/formaciones",
            icon: "🎓",
            desc: "Hub: EMPI, Conservatorios y Propuestas",
            border: "2px solid #805ad5",
          },
          {
            title: "Guía de Rutinas de Aula",
            href: "/admin/guia-aula",
            icon: "🏫",
            desc: "Repertorio de aula por momentos del día",
            border: "2px solid #0284c7",
          },
          {
            title: "Guiones y Píldoras",
            href: "/admin/guiones",
            icon: "🎬",
            desc: "Gestor de grabaciones de vídeo y guiones",
            border: null,
          },
          {
            title: "Inscripciones y Alumnos",
            href: "/admin/inscripciones",
            icon: "👥",
            desc: "Listado general de alumnos y grupos",
            border: null,
          },
          {
            title: "La ranita quiere cantar",
            href: "/admin/la-ranita-quiere-cantar",
            icon: "🐸",
            desc: "Libro sonoro: 8 modos y 4 métricas",
            border: "2px solid #10B981",
          },
          {
            title: "Lab de Proyectos",
            href: "/admin/proyectos",
            icon: "📓",
            desc: "Cuaderno de bitácora centralizado",
            border: null,
          },
          {
            title: "Lista de Espera",
            href: "/admin/lista-espera",
            icon: "⏳",
            desc: "Familias pendientes de plaza",
            border: null,
          },
          {
            title: "Paquete Regalo & Packaging",
            href: "/admin/packaging",
            icon: "🎁",
            desc: "Guía de montaje, fotos, seda y pegatinas",
            border: "2px solid #00B2E3",
          },
          {
            title: "Precios y Cuotas",
            href: "/admin/precios",
            icon: "💶",
            desc: "Chuletario para cobrar en Stripe",
            border: null,
          },
          {
            title: "Programas para Conservatorios",
            href: "/admin/formaciones/conservatorios",
            icon: "🏛️",
            desc: "Propuesta académica CSM Murcia y temario MLT",
            border: null,
          },
          {
            title: "Propuestas de Formaciones",
            href: "/admin/formaciones/propuestas",
            icon: "📑",
            desc: "Modelos B2B/B2C, centros privados, CPR y FUNDAE",
            border: "2px solid #00B2E3",
          },
          {
            title: "Registro de Actividad",
            href: "/admin/actividad",
            icon: "📋",
            desc: "Lista diaria de acciones en la web",
            border: null,
          },
          {
            title: "Suscriptores Comunidad",
            href: "/admin/suscriptores",
            icon: "⭐",
            desc: "Planes anuales y mensuales activos",
            border: "2px solid #805AD5",
          },
          {
            title: "Talleres",
            href: "/admin/talleres",
            icon: "🧸",
            desc: "Grupos en marcha y gestión de talleres",
            border: null,
          },
          {
            title: "Ventas de la Tienda",
            href: "/admin/ventas",
            icon: "🛍️",
            desc: "Pedidos completados e historial de ventas",
            border: null,
          },
        ]
          .sort((a, b) => a.title.localeCompare(b.title, 'es', { sensitivity: 'base' }))
          .map((tool) => (
            <Link key={tool.href} href={tool.href} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div
                className={styles.statCard}
                style={{
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  border: tool.border || undefined,
                }}
              >
                <h3 className={styles.statTitle}>{tool.icon} {tool.title}</h3>
                <p className={styles.statDetail} style={{ marginTop: '0.5rem' }}>{tool.desc}</p>
              </div>
            </Link>
          ))}
      </div>

      {/* Desglose de Grupos */}
      <h2 className={styles.sectionTitle}>Estado de los Grupos</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
        {['Martes', 'Jueves', 'Viernes'].map(day => (
          <div key={day}>
            <h3 style={{ fontSize: '1.2rem', color: '#4a5568', borderBottom: '2px solid #edf2f7', paddingBottom: '10px', marginBottom: '15px', fontWeight: 'bold', textAlign: 'center' }}>{day}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {groups
                .filter(g => g.schedule.toLowerCase().includes(day.toLowerCase()))
                .map(group => {
                  const enrolled = group.enrollments.length;
                  const percentage = Math.round((enrolled / group.capacity) * 100);
                  const isFull = enrolled >= group.capacity;

                  return (
                    <Link key={group.id} href={`/admin/grupos/${group.id}`} style={{ textDecoration: 'none' }}>
                      <div className={styles.groupCard}>
                        <h3 className={styles.groupName}>{group.name}</h3>
                        <p className={styles.groupSchedule}>🕒 {group.schedule}</p>
                        
                        <div className={styles.progressBar}>
                          <div 
                            className={styles.progressFill} 
                            style={{ 
                              width: `${Math.min(percentage, 100)}%`,
                              backgroundColor: isFull ? '#ef4444' : 'var(--color-cyan)'
                            }}
                          ></div>
                        </div>
                        
                        <div className={styles.groupStats}>
                          <span>{enrolled} / {group.capacity} plazas</span>
                          <span className={`${styles.badge} ${isFull ? styles.badgeFull : styles.badgeOpen}`}>
                            {isFull ? 'COMPLETO' : 'DISPONIBLE'}
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
