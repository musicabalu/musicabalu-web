import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import styles from '../dashboard.module.css';

const prisma = new PrismaClient();
export const dynamic = 'force-dynamic';

export default async function ActividadPage({ searchParams }) {
  // 1. Determinar la fecha seleccionada en zona horaria de Madrid
  const formatter = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Madrid' });
  const todayStr = formatter.format(new Date()); 
  const selectedDateStr = searchParams.date || todayStr;

  // Calcular fechas anterior y siguiente para los botones
  const selectedDateObj = new Date(`${selectedDateStr}T12:00:00Z`); // Mediodía UTC para evitar saltos de día por zona horaria
  
  const prevDateObj = new Date(selectedDateObj);
  prevDateObj.setDate(prevDateObj.getDate() - 1);
  const prevDateStr = prevDateObj.toISOString().split('T')[0];

  const nextDateObj = new Date(selectedDateObj);
  nextDateObj.setDate(nextDateObj.getDate() + 1);
  const nextDateStr = nextDateObj.toISOString().split('T')[0];

  const isToday = selectedDateStr === todayStr;

  let logs = [];
  try {
    // 2. Consulta amplia a Prisma (cubriendo todos los posibles desfases horarios de España)
    const startOfDayUTC = new Date(`${selectedDateStr}T00:00:00Z`);
    startOfDayUTC.setHours(startOfDayUTC.getHours() - 2); 
    
    const endOfDayUTC = new Date(`${selectedDateStr}T23:59:59Z`);
    endOfDayUTC.setHours(endOfDayUTC.getHours() + 2);

    const rawLogs = await prisma.activityLog.findMany({
      where: {
        user: {
          email: {
            notIn: ['musicabalu@gmail.com', 'hola@musicabalu.com']
          }
        },
        createdAt: {
          gte: startOfDayUTC,
          lte: endOfDayUTC
        }
      },
      orderBy: { createdAt: 'desc' },
      include: {
        user: { select: { name: true, email: true, role: true } }
      }
    });

    // 3. Filtro exacto en JavaScript asegurando la zona horaria de Madrid
    logs = rawLogs.filter(log => {
      const logDateStr = formatter.format(new Date(log.createdAt));
      return logDateStr === selectedDateStr;
    });

  } catch (error) {
    console.error("Error fetching activity logs:", error);
  }

  // Formateador visual de la fecha seleccionada
  const displayDate = new Date(`${selectedDateStr}T12:00:00Z`).toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className={styles.container}>
      <Link href="/admin" style={{ display: 'inline-flex', alignItems: 'center', color: '#718096', textDecoration: 'none', marginBottom: '1.5rem', fontWeight: '500', fontSize: '0.9rem' }}>
        <span style={{ marginRight: '8px' }}>←</span> Volver a Panel de Control
      </Link>
      
      <header className={styles.header}>
        <h1 className={styles.title}>Actividad de Usuarios</h1>
        <p className={styles.subtitle}>Supervisa quién entra y qué hace en la plataforma</p>
      </header>

      {/* Navegación por Días */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white', padding: '1rem 1.5rem', borderRadius: '12px', marginBottom: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <Link 
          href={`/admin/actividad?date=${prevDateStr}`}
          style={{ padding: '0.5rem 1rem', background: '#edf2f7', color: '#4a5568', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}
        >
          ← Día anterior
        </Link>
        
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.2rem', margin: 0, color: 'var(--color-dark)', textTransform: 'capitalize' }}>
            {displayDate}
          </h2>
          {isToday && <span style={{ fontSize: '0.8rem', color: 'var(--color-pink)', fontWeight: 'bold' }}>HOY</span>}
        </div>

        <Link 
          href={`/admin/actividad?date=${nextDateStr}`}
          style={{ padding: '0.5rem 1rem', background: isToday ? '#f7fafc' : '#edf2f7', color: isToday ? '#cbd5e0' : '#4a5568', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', pointerEvents: isToday ? 'none' : 'auto' }}
        >
          Día siguiente →
        </Link>
      </div>

      <div style={{ background: 'white', borderRadius: '16px', padding: '2rem', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
        {logs.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#718096', padding: '2rem', fontSize: '1.1rem' }}>
            💤 No hay ninguna actividad registrada en este día.
          </p>
        ) : (
          <div style={{ overflowX: 'auto', width: '100%' }}>
            <table style={{ width: '100%', minWidth: '600px', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #edf2f7' }}>
                <th style={{ padding: '1rem', color: '#4a5568' }}>Hora</th>
                <th style={{ padding: '1rem', color: '#4a5568' }}>Usuario</th>
                <th style={{ padding: '1rem', color: '#4a5568' }}>Acción</th>
                <th style={{ padding: '1rem', color: '#4a5568' }}>Detalles</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id} style={{ borderBottom: '1px solid #edf2f7' }}>
                  <td style={{ padding: '1rem', fontSize: '1rem', color: '#2d3748', fontWeight: 'bold' }}>
                    {new Date(log.createdAt).toLocaleTimeString('es-ES', { 
                      timeZone: 'Europe/Madrid',
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ fontWeight: '500' }}>{log.user?.name || 'Desconocido'}</div>
                    <div style={{ fontSize: '0.8rem', color: '#718096' }}>{log.user?.email}</div>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ 
                      backgroundColor: '#edf2f7', 
                      padding: '4px 8px', 
                      borderRadius: '4px', 
                      fontSize: '0.85rem', 
                      fontWeight: 'bold',
                      color: '#4a5568'
                    }}>
                      {log.action}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', color: '#4a5568', fontSize: '0.9rem' }}>
                    {log.details || '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        )}
      </div>
    </div>
  );
}
