import EstrategiaClient from './EstrategiaClient';
import { estrategiaHtml } from './estrategiaData';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function EstrategiaPage() {
  const htmlContent = estrategiaHtml;

  if (!htmlContent) {
    return (
      <div style={{ padding: '40px', color: 'red' }}>
        <h2>Error cargando el Plan Estratégico</h2>
        <p>No se pudo cargar el módulo.</p>
      </div>
    );
  }

  // Extract <style>
  const styleMatch = htmlContent.match(/<style>([\s\S]*?)<\/style>/);
  let styles = styleMatch ? styleMatch[1] : '';

  // To prevent generic tags from bleeding into the whole app, we can do some basic scoping
  // by prefixing common generic selectors with .estrategia-doc
  const genericSelectors = ['body', 'h3', 'h4', 'p', 'table', 'th', 'td'];
  genericSelectors.forEach(sel => {
    const regex = new RegExp(`(^|\\})\\s*(${sel})\\s*\\{`, 'g');
    styles = styles.replace(regex, `$1 .estrategia-doc $2 {`);
  });

  // Extract <div class="page">
  const bodyMatch = htmlContent.match(/<div class="page">([\s\S]*?)<\/div><!-- \/page -->/);
  const body = bodyMatch ? bodyMatch[1] : '';

  return (
    <div style={{ padding: '0 20px 20px 20px' }}>
      <Link href="/admin" style={{ display: 'inline-flex', alignItems: 'center', color: '#718096', textDecoration: 'none', marginBottom: '1.5rem', fontWeight: '500', fontSize: '0.9rem' }}>
        <span style={{ marginRight: '8px' }}>←</span> Volver a Panel de Control
      </Link>
      <EstrategiaClient styles={styles} body={body} />
    </div>
  );
}
