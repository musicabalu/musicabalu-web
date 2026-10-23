import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import styles from '../dashboard.module.css';

const prisma = new PrismaClient();
export const dynamic = 'force-dynamic';

export default async function SuscriptoresPage() {
  // Obtener usuarios con suscripción activa o con órdenes de suscripción
  const subscribers = await prisma.user.findMany({
    where: {
      OR: [
        { hasActiveSub: true },
        { orders: { some: { productType: 'subscription' } } }
      ],
      email: { notIn: ['musicabalu@gmail.com', 'hola@musicabalu.com', 'jamusanchez@gmail.com'] }
    },
    include: {
      orders: {
        where: { productType: 'subscription' },
        orderBy: { createdAt: 'desc' }
      },
      activityLogs: {
        orderBy: { createdAt: 'desc' },
        take: 1
      },
      enrollments: {
        select: {
          id: true,
          status: true,
          childName: true
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  // Métricas
  const totalSubscribers = subscribers.filter(s => s.hasActiveSub).length;
  
  let anualCount = 0;
  let mensualCount = 0;
  let estimatedARR = 0;

  subscribers.forEach(s => {
    if (!s.hasActiveSub) return;
    const latestOrder = s.orders[0];
    const isAnual = latestOrder?.productName?.toLowerCase().includes('anual') || (latestOrder?.amountTotal || 0) >= 3000;
    if (isAnual) {
      anualCount += 1;
      estimatedARR += 39;
    } else {
      mensualCount += 1;
      estimatedARR += (3.9 * 12);
    }
  });

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>⭐ Suscriptores de la Comunidad</h1>
        <p className={styles.subtitle}>
          Familias con suscripción digital activa a la plataforma de canciones, recitados y píldoras formativas.
        </p>
      </header>

      <Link href="/admin" style={{ display: 'inline-flex', alignItems: 'center', color: '#718096', textDecoration: 'none', marginBottom: '1.5rem', fontWeight: '500', fontSize: '0.9rem' }}>
        <span style={{ marginRight: '8px' }}>←</span> Volver al Panel de Control
      </Link>

      {/* Tarjetas de métricas */}
      <div className={styles.statsGrid} style={{ marginBottom: '2rem' }}>
        <div className={styles.statCard} style={{ borderTop: '4px solid #805AD5' }}>
          <h3 className={styles.statTitle}>Suscriptores Activos</h3>
          <p className={styles.statValue} style={{ color: '#805AD5' }}>{totalSubscribers}</p>
          <p className={styles.statDetail}>Acceso digital 100% ilimitado</p>
        </div>

        <div className={styles.statCard} style={{ borderTop: '4px solid #D69E2E' }}>
          <h3 className={styles.statTitle}>Plan Anual (39 €)</h3>
          <p className={styles.statValue} style={{ color: '#D69E2E' }}>{anualCount}</p>
          <p className={styles.statDetail}>Pagado en un único cobro anual</p>
        </div>

        <div className={styles.statCard} style={{ borderTop: '4px solid #3182CE' }}>
          <h3 className={styles.statTitle}>Plan Mensual (3,90 €)</h3>
          <p className={styles.statValue} style={{ color: '#3182CE' }}>{mensualCount}</p>
          <p className={styles.statDetail}>Renovación mensual automática</p>
        </div>

        <div className={styles.statCard} style={{ borderTop: '4px solid #38A169' }}>
          <h3 className={styles.statTitle}>Ingresos Anuales (ARR)</h3>
          <p className={styles.statValue} style={{ color: '#38A169' }}>
            {estimatedARR.toLocaleString('es-ES', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 })}
          </p>
          <p className={styles.statDetail}>Valor anual recurrente estimado</p>
        </div>
      </div>

      {/* Tabla de Suscriptores */}
      <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '10px' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#2D3748', margin: 0 }}>
            Listado de Suscriptores Digitales
          </h2>
          <span style={{ fontSize: '0.85rem', color: '#718096' }}>
            {subscribers.length} {subscribers.length === 1 ? 'registro' : 'registros'} en total
          </span>
        </div>

        {subscribers.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: '#718096' }}>
            <p style={{ fontSize: '1.2rem', marginBottom: '8px' }}>🌱 Todavía no hay suscriptores registrados</p>
            <p style={{ fontSize: '0.9rem' }}>Las familias que adquieran la suscripción en la tienda aparecerán aquí automáticamente.</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #E2E8F0' }}>
                  <th style={{ padding: '12px 16px', color: '#4A5568', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Suscriptor</th>
                  <th style={{ padding: '12px 16px', color: '#4A5568', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Plan</th>
                  <th style={{ padding: '12px 16px', color: '#4A5568', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Fecha de Alta</th>
                  <th style={{ padding: '12px 16px', color: '#4A5568', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Importe</th>
                  <th style={{ padding: '12px 16px', color: '#4A5568', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Estado</th>
                  <th style={{ padding: '12px 16px', color: '#4A5568', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Última Actividad</th>
                  <th style={{ padding: '12px 16px', color: '#4A5568', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {subscribers.map(sub => {
                  const latestOrder = sub.orders[0];
                  const isAnual = latestOrder?.productName?.toLowerCase().includes('anual') || (latestOrder?.amountTotal || 0) >= 3000;
                  const lastLog = sub.activityLogs[0];
                  
                  const startDate = latestOrder?.createdAt || sub.createdAt;
                  const formattedDate = new Date(startDate).toLocaleDateString('es-ES', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric'
                  });

                  let lastActiveText = 'Sin registros recientes';
                  if (lastLog) {
                    const logDate = new Date(lastLog.createdAt);
                    const isToday = new Date().toDateString() === logDate.toDateString();
                    const timeStr = logDate.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
                    lastActiveText = isToday 
                      ? `Hoy a las ${timeStr}` 
                      : `${logDate.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' })} ${timeStr}`;
                  }

                  const hasPresentialHistory = sub.enrollments && sub.enrollments.length > 0;

                  return (
                    <tr key={sub.id} style={{ borderBottom: '1px solid #E2E8F0', transition: 'background 0.15s' }}>
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ fontWeight: '600', color: '#2D3748', fontSize: '0.95rem' }}>
                          {sub.name || 'Sin nombre registrado'}
                        </div>
                        <div style={{ color: '#718096', fontSize: '0.85rem' }}>
                          {sub.email}
                        </div>
                        {hasPresentialHistory && (
                          <span style={{
                            display: 'inline-block',
                            marginTop: '4px',
                            background: '#EDF2F7',
                            color: '#4A5568',
                            fontSize: '0.72rem',
                            padding: '2px 6px',
                            borderRadius: '4px',
                            fontWeight: '500'
                          }}>
                            🏫 Ex-alumna presencial
                          </span>
                        )}
                      </td>

                      <td style={{ padding: '14px 16px' }}>
                        {isAnual ? (
                          <span style={{
                            background: '#FEFCBF',
                            color: '#975A16',
                            border: '1px solid #ECC94B',
                            padding: '4px 10px',
                            borderRadius: '12px',
                            fontSize: '0.8rem',
                            fontWeight: 'bold',
                            whiteSpace: 'nowrap'
                          }}>
                            👑 Plan Anual (39€)
                          </span>
                        ) : (
                          <span style={{
                            background: '#EBF8FF',
                            color: '#2B6CB0',
                            border: '1px solid #BEE3F8',
                            padding: '4px 10px',
                            borderRadius: '12px',
                            fontSize: '0.8rem',
                            fontWeight: 'bold',
                            whiteSpace: 'nowrap'
                          }}>
                            ⚡ Plan Mensual (3,90€)
                          </span>
                        )}
                      </td>

                      <td style={{ padding: '14px 16px', fontSize: '0.9rem', color: '#4A5568', whiteSpace: 'nowrap' }}>
                        {formattedDate}
                      </td>

                      <td style={{ padding: '14px 16px', fontWeight: 'bold', color: '#2D3748', fontSize: '0.95rem', whiteSpace: 'nowrap' }}>
                        {latestOrder ? (latestOrder.amountTotal / 100).toLocaleString('es-ES', { style: 'currency', currency: 'EUR' }) : '39,00 €'}
                      </td>

                      <td style={{ padding: '14px 16px' }}>
                        {sub.hasActiveSub ? (
                          <span style={{
                            background: '#C6F6D5',
                            color: '#22543D',
                            padding: '4px 10px',
                            borderRadius: '12px',
                            fontSize: '0.8rem',
                            fontWeight: 'bold',
                            whiteSpace: 'nowrap'
                          }}>
                            ✓ Activa
                          </span>
                        ) : (
                          <span style={{
                            background: '#FED7D7',
                            color: '#742A2A',
                            padding: '4px 10px',
                            borderRadius: '12px',
                            fontSize: '0.8rem',
                            fontWeight: 'bold',
                            whiteSpace: 'nowrap'
                          }}>
                            Inactiva
                          </span>
                        )}
                      </td>

                      <td style={{ padding: '14px 16px', fontSize: '0.85rem', color: '#4A5568' }}>
                        <div>{lastActiveText}</div>
                        {lastLog && (
                          <div style={{ color: '#A0AEC0', fontSize: '0.75rem', marginTop: '2px', maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {lastLog.action}: {lastLog.details}
                          </div>
                        )}
                      </td>

                      <td style={{ padding: '14px 16px', whiteSpace: 'nowrap' }}>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <Link 
                            href={`/admin/actividad`} 
                            style={{
                              background: '#EDF2F7',
                              color: '#4A5568',
                              padding: '6px 10px',
                              borderRadius: '6px',
                              fontSize: '0.8rem',
                              textDecoration: 'none',
                              fontWeight: '500'
                            }}
                          >
                            Ver Actividad
                          </Link>
                          <Link 
                            href={`/admin/analiticas`} 
                            style={{
                              background: '#EBF8FF',
                              color: '#3182CE',
                              padding: '6px 10px',
                              borderRadius: '6px',
                              fontSize: '0.8rem',
                              textDecoration: 'none',
                              fontWeight: '500'
                            }}
                          >
                            Analíticas
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
