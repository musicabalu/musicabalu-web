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
        where: { status: { in: ['active', 'pending'] } }
      }
    }
  });

  const orders = await prisma.order.findMany({
    where: { status: 'completed' }
  });

  const enrollments = await prisma.enrollment.findMany({
    where: { status: { in: ['active', 'pending'] } }
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
        
      </div>
      
      {/* Herramientas de Gestión */}
      <h2 className={styles.sectionTitle} style={{ marginTop: '2rem' }}>Herramientas de Gestión</h2>
      <div className={styles.statsGrid} style={{ marginBottom: '2rem' }}>
        <Link href="/admin/actividad" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className={styles.statCard} style={{ cursor: 'pointer', transition: 'transform 0.2s' }}>
            <h3 className={styles.statTitle}>📊 Actividad</h3>
            <p className={styles.statDetail} style={{ marginTop: '0.5rem' }}>Registro de acciones de usuarios</p>
          </div>
        </Link>
        <Link href="/admin/cronograma" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className={styles.statCard} style={{ cursor: 'pointer', transition: 'transform 0.2s' }}>
            <h3 className={styles.statTitle}>📅 Cronograma</h3>
            <p className={styles.statDetail} style={{ marginTop: '0.5rem' }}>Planificación de tareas</p>
          </div>
        </Link>
        <Link href="/admin/estrategia" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className={styles.statCard} style={{ cursor: 'pointer', transition: 'transform 0.2s' }}>
            <h3 className={styles.statTitle}>📈 Estrategia</h3>
            <p className={styles.statDetail} style={{ marginTop: '0.5rem' }}>Plan de negocio a largo plazo</p>
          </div>
        </Link>
        <Link href="/admin/auditoria" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className={styles.statCard} style={{ cursor: 'pointer', transition: 'transform 0.2s' }}>
            <h3 className={styles.statTitle}>🧹 Auditoría y Limpieza</h3>
            <p className={styles.statDetail} style={{ marginTop: '0.5rem' }}>Mantenimiento del sistema</p>
          </div>
        </Link>
        <Link href="/admin/cartel" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className={styles.statCard} style={{ cursor: 'pointer', transition: 'transform 0.2s' }}>
            <h3 className={styles.statTitle}>🖼️ Cartel Plazas</h3>
            <p className={styles.statDetail} style={{ marginTop: '0.5rem' }}>Generador de estado de WhatsApp</p>
          </div>
        </Link>
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
