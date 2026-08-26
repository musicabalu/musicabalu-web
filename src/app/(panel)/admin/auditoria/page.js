import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import styles from '../dashboard.module.css';
import CleanupButton from './CleanupButton';

const prisma = new PrismaClient();
export const dynamic = 'force-dynamic';

export default async function AuditoriaDashboard() {
  const allOrders = await prisma.order.findMany();
  
  const totalOrders = allOrders.length;
  const completedOrders = allOrders.filter(o => o.status === 'completed').length;
  const pendingOrders = allOrders.filter(o => o.status === 'pending').length;
  
  const conversionRate = totalOrders > 0 
    ? Math.round((completedOrders / totalOrders) * 100) 
    : 0;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Auditoría y Mantenimiento</h1>
        <p className={styles.subtitle}>Herramientas para mantener la plataforma sana</p>
      </header>

      <div style={{ marginBottom: '20px' }}>
        <Link href="/admin" style={{ color: 'var(--color-cyan)', textDecoration: 'none', fontWeight: 'bold' }}>
          ← Volver al panel de control
        </Link>
      </div>

      <div className={styles.statsGrid} style={{ marginBottom: '2rem' }}>
        <div className={styles.statCard}>
          <h3 className={styles.statTitle}>Embudo de Tienda</h3>
          <p className={styles.statValue}>{conversionRate}%</p>
          <p className={styles.statDetail}>Tasa de conversión de carritos iniciados</p>
        </div>

        <div className={styles.statCard}>
          <h3 className={styles.statTitle}>Carritos Abandonados</h3>
          <p className={styles.statValue} style={{ color: pendingOrders > 10 ? '#E11D48' : 'inherit' }}>
            {pendingOrders}
          </p>
          <p className={styles.statDetail}>Pedidos iniciados pero no pagados</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {/* Panel de Limpieza */}
        <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
          <h3 style={{ marginTop: 0, color: '#2C3333' }}>Limpieza de Base de Datos (Trimestral)</h3>
          <p style={{ color: '#4A5568', fontSize: '0.9rem', lineHeight: '1.5' }}>
            Ejecuta esta acción cada 3 o 6 meses para borrar carritos abandonados antiguos (más de 30 días), sesiones caducadas y usuarios fantasma. Mantendrá la base de datos rápida y barata.
          </p>
          <CleanupButton />
        </div>

        {/* Panel de Dependencias */}
        <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
          <h3 style={{ marginTop: 0, color: '#2C3333' }}>Actualización de Código (Anual)</h3>
          <p style={{ color: '#4A5568', fontSize: '0.9rem', lineHeight: '1.5' }}>
            Para mantener la seguridad contra hackeos, es recomendable actualizar las librerías del servidor 1 o 2 veces al año. Esta acción la debe realizar un programador o técnico desde la consola.
          </p>
          <div style={{ background: '#1A202C', color: '#A0AEC0', padding: '12px', borderRadius: '8px', fontSize: '0.85rem', fontFamily: 'monospace', marginTop: '1rem' }}>
            npm outdated<br/>
            npm update
          </div>
          <p style={{ fontSize: '0.75rem', color: '#718096', marginTop: '8px' }}>
            * Requiere acceso al servidor y redesplegar en Vercel.
          </p>
        </div>
      </div>
    </div>
  );
}
