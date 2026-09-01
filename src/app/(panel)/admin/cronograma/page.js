import CronogramaClient from './CronogramaClient';
import { cronogramaHtml } from './cronogramaData';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function CronogramaPage() {
  const htmlContent = cronogramaHtml;

  if (!htmlContent) {
    return (
      <div style={{ padding: '40px', color: 'red' }}>
        <h2>Error cargando el Cronograma</h2>
        <p>No se pudo cargar el módulo.</p>
      </div>
    );
  }

  // Same basic scoping as strategy just in case
  let styles = `
    .estrategia-doc.page { max-width: 1100px; margin: 0 auto; background: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); padding: clamp(15px, 4vw, 40px); }
    .estrategia-doc h3 { color: var(--pink); margin-top: 30px; font-size: 1.3rem; border-bottom: 2px dashed #edf2f7; padding-bottom: 8px; }
    .estrategia-doc h4 { color: var(--cyan); margin-top: 20px; font-size: 1.1rem; }
    .estrategia-doc ul { padding-left: 0; margin-top: 15px; margin-bottom: 30px; }
    .estrategia-doc li { margin-bottom: 15px; padding: 12px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0; }
    .estrategia-doc .section-header { margin-bottom: 30px; display: flex; align-items: center; gap: 15px; }
    .estrategia-doc .section-title { font-size: 2rem; font-weight: bold; color: var(--dark); }
    .estrategia-doc .section-num { background: #cbd5e1; color: white; padding: 5px 15px; border-radius: 20px; font-weight: bold; font-size: 1.2rem; }
    .estrategia-doc .alert { background: #f0fdf4; border: 1px solid #bbf7d0; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
    .estrategia-doc .alert-title { font-weight: bold; color: #166534; font-size: 1.1rem; margin-bottom: 10px; }
  `;

  return (
    <div style={{ padding: '0 20px 20px 20px' }}>
      <Link href="/admin" style={{ display: 'inline-flex', alignItems: 'center', color: '#718096', textDecoration: 'none', marginBottom: '1.5rem', fontWeight: '500', fontSize: '0.9rem' }}>
        <span style={{ marginRight: '8px' }}>←</span> Volver a Panel de Control
      </Link>
      <CronogramaClient styles={styles} body={htmlContent} />
    </div>
  );
}
