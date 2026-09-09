import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import styles from '../dashboard.module.css';

const prisma = new PrismaClient();
export const dynamic = 'force-dynamic';

export default async function ActividadPage({ searchParams }) {
  const params = await searchParams;
  // 1. Determinar la fecha seleccionada en zona horaria de Madrid
  const formatter = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Madrid' });
  const todayStr = formatter.format(new Date()); 
  const selectedDateStr = params.date || todayStr;

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
    if (params.email) {
      // Filtrar por correo específico: Historial completo del usuario
      logs = await prisma.activityLog.findMany({
        where: {
          user: {
            email: params.email
          }
        },
        orderBy: { createdAt: 'desc' },
        include: {
          user: { select: { name: true, email: true, role: true } }
        },
        take: 100 // Límite para no sobrecargar
      });
    } else {
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
    }
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

      {/* Buscador manual por email */}
      <form action="/admin/actividad" method="GET" style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem', width: '100%', maxWidth: '600px' }}>
        <input 
          type="email" 
          name="email" 
          placeholder="🔍 Buscar historial por email del usuario..." 
          defaultValue={params.email || ''} 
          style={{ flex: 1, padding: '0.8rem 1rem', borderRadius: '8px', border: '1px solid #cbd5e0', outline: 'none', fontSize: '1rem' }}
          required 
        />
        <button type="submit" style={{ padding: '0.8rem 1.5rem', background: 'var(--color-pink)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
          Buscar
        </button>
        {params.email && (
          <Link href="/admin/actividad" style={{ padding: '0.8rem 1.5rem', background: '#edf2f7', color: '#4a5568', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center' }}>
            Limpiar
          </Link>
        )}
      </form>

      {/* Navegación por Días o Filtro Activo */}
      {params.email ? (
        <div style={{ background: '#ebf8ff', padding: '1rem 1.5rem', borderRadius: '12px', marginBottom: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '1.2rem', margin: 0, color: '#2b6cb0' }}>
              Historial completo: {params.email}
            </h2>
            <p style={{ margin: '4px 0 0', fontSize: '0.9rem', color: '#4a5568' }}>Mostrando hasta las últimas 100 acciones de este usuario.</p>
          </div>
          <Link 
            href="/admin/actividad"
            style={{ padding: '0.5rem 1rem', background: '#3182ce', color: 'white', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}
          >
            ← Volver a Vista Diaria
          </Link>
        </div>
      ) : (
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
      )}

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
                    <div style={{ fontSize: '0.8rem', color: '#718096', marginBottom: '5px' }}>{log.user?.email}</div>
                    {log.user?.email && (
                      <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                        {!params.email && (
                          <Link href={`/admin/actividad?email=${log.user.email}`} style={{ fontSize: '0.75rem', padding: '4px 8px', background: '#edf2f7', color: '#2b6cb0', borderRadius: '4px', textDecoration: 'none', fontWeight: '500', display: 'inline-flex', alignItems: 'center' }}>
                            🔍 Historial Completo
                          </Link>
                        )}
                        <Link href={`/admin/inscripciones?q=${log.user.email}`} style={{ fontSize: '0.75rem', padding: '4px 8px', background: '#edf2f7', color: 'var(--color-pink)', borderRadius: '4px', textDecoration: 'none', fontWeight: '500', display: 'inline-flex', alignItems: 'center' }}>
                          📋 Ver inscripciones
                        </Link>
                      </div>
                    )}
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
