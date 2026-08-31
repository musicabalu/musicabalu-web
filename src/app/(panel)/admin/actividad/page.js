import { PrismaClient } from '@prisma/client';
import styles from '../dashboard.module.css';

const prisma = new PrismaClient();
export const dynamic = 'force-dynamic';

export default async function ActividadPage() {
  let logs = [];
  try {
    logs = await prisma.activityLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
      include: {
        user: { select: { name: true, email: true, role: true } }
      }
    });
  } catch (error) {
    console.error("Error fetching activity logs (maybe table doesn't exist yet):", error);
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Actividad Reciente</h1>
        <p className={styles.subtitle}>Registro de acciones de los usuarios en la plataforma</p>
      </header>

      <div style={{ background: 'white', borderRadius: '16px', padding: '2rem', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
        {logs.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#718096', padding: '2rem' }}>
            No hay actividad registrada o la tabla aún no se ha creado.
          </p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #edf2f7' }}>
                <th style={{ padding: '1rem', color: '#4a5568' }}>Fecha</th>
                <th style={{ padding: '1rem', color: '#4a5568' }}>Usuario</th>
                <th style={{ padding: '1rem', color: '#4a5568' }}>Acción</th>
                <th style={{ padding: '1rem', color: '#4a5568' }}>Detalles</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id} style={{ borderBottom: '1px solid #edf2f7' }}>
                  <td style={{ padding: '1rem', fontSize: '0.9rem', color: '#718096' }}>
                    {new Date(log.createdAt).toLocaleString('es-ES', { 
                      day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' 
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
                      fontSize: '0.8rem', 
                      fontWeight: 'bold' 
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
        )}
      </div>
    </div>
  );
}
