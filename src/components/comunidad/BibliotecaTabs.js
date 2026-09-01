'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BibliotecaTabs({ isPresential, role }) {
  const pathname = usePathname();
  
  const isComunidad = isPresential || role === 'admin';
  const title = isComunidad ? 'Comunidad Musicabalú' : 'Biblioteca Familiar';
  const subtitle = isComunidad 
    ? 'Tu espacio exclusivo con clases presenciales y recursos familiares.'
    : 'Recursos musicales y pedagógicos para toda la familia.';

  const tabs = [
    { id: 'canciones', label: 'Canciones', path: '/comunidad/canciones', color: 'var(--color-pink)' },
    { id: 'recitados', label: 'Recitados', path: '/comunidad/recitados', color: 'var(--color-cyan)' },
    { id: 'pildoras', label: 'Píldoras y FAQs', path: '/comunidad/pildoras', color: 'var(--color-yellow)' }
  ];

  if (isComunidad) {
    tabs.unshift({ id: 'mi-clase', label: 'Mi Clase', path: '/comunidad/mi-clase', color: 'var(--color-green, #AADB1E)' });
    tabs.splice(1, 0, { id: 'calendario', label: 'Calendario', path: '/comunidad/calendario', color: 'var(--color-yellow)' });
  }

  return (
    <div>
      <div style={{ marginBottom: '30px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', color: 'var(--color-dark)', marginBottom: '10px' }}>{title}</h1>
        <p style={{ color: 'var(--color-text-light)' }}>{subtitle}</p>
      </div>

      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '30px', flexWrap: 'wrap' }}>
        {tabs.map(tab => {
          const isActive = pathname === tab.path;
          return (
            <Link
              key={tab.id}
              href={tab.path}
              style={{
                padding: '12px 24px',
                borderRadius: '30px',
                textDecoration: 'none',
                backgroundColor: isActive ? tab.color : 'var(--color-bg-alt)',
                color: isActive ? ((tab.id === 'pildoras' || tab.id === 'mi-clase') ? 'var(--color-dark)' : 'white') : 'var(--color-text)',
                fontFamily: 'var(--font-heading)',
                fontWeight: '600',
                transition: 'var(--transition-fast)',
                boxShadow: isActive ? 'var(--shadow-md)' : 'none',
                display: 'inline-block'
              }}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
