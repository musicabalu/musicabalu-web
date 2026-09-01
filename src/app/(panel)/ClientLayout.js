'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import styles from './layout.module.css';

import LogoutButton from '@/components/auth/LogoutButton';
import { estrategiaHtml } from '@/app/(panel)/admin/estrategia/estrategiaData';

// Parsear el índice de la estrategia
const getEstrategiaIndex = () => {
  if (!estrategiaHtml) return [];
  const matches = [...estrategiaHtml.matchAll(/<div class="section-header">[\s\S]*?<div class="section-num[^>]*>(.*?)<\/div>[\s\S]*?<div class="section-title"[^>]*>(.*?)<\/div>/g)];
  return matches.map((m, i) => ({ 
    id: `estrategia-section-${i}`, 
    num: m[1].replace(/<[^>]+>/g, '').trim(), 
    title: m[2].replace(/<[^>]+>/g, '').trim() 
  }));
};

export default function ClientLayout({ children, user, hasFullAccess, isPresential, role }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // El menú siempre muestra Inicio y enlaces públicos
  const navItems = [
    { name: 'Inicio', path: '/dashboard', icon: '🏠' },
    { name: 'Conócenos', path: '/conocenos', icon: '👋' },
    { name: 'Clases', path: '/presencial', icon: '👶' },
    { name: 'Formaciones (Info)', path: '/formaciones', icon: '🏫' }
  ];

  // Si es presencial, mostramos Comunidad Musicabalú. Si tiene suscripción, Biblioteca Familiar.
  if (isPresential || role === 'admin') {
    // Nota: El admin ve Comunidad Musicabalú para tener acceso a Mi Clase
    navItems.push({ name: 'Comunidad Musicabalú', path: '/comunidad/mi-clase', icon: '❤️' });
  } else if (hasFullAccess) {
    navItems.push({ name: 'Biblioteca Familiar', path: '/comunidad/canciones', icon: '❤️' });
  }

  // Solo educadores/admin ven Formaciones
  if (role === 'educador' || role === 'admin') {
    navItems.push({ name: 'Mis Formaciones', path: '/formaciones/plataforma', icon: '🎓' });
  }

  // Enlace a panel de administrador
  if (role === 'admin') {
    navItems.push({ name: 'Administrador', path: '/admin', icon: '⚙️' });
  }

  // Admin tiene acceso total a todo (quita candados)
  const effectiveHasFullAccess = hasFullAccess || role === 'admin';

  return (
    <div className={styles.container}>
      <div className={styles.mobileTopBar}>
        <div className={styles.brandMobile}>
          <Link href="/">
            <Image src="/logo_texto_corazon.png" alt="Logo Musicabalú" width={140} height={35} style={{ objectFit: "contain" }} priority />
          </Link>
        </div>
        <button className={styles.hamburgerBtn} onClick={() => setIsSidebarOpen(true)}>
          ☰
        </button>
      </div>

      <div 
        className={`${styles.overlay} ${isSidebarOpen ? styles.overlayOpen : ''}`} 
        onClick={() => setIsSidebarOpen(false)}
      ></div>

      <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.sidebarHeader}>
          <div className={styles.brand} style={{ margin: 0, padding: 0 }}>
            <Link href="/" onClick={() => setIsSidebarOpen(false)}>
              <Image src="/logo_texto_corazon.png" alt="Logo Musicabalú" width={140} height={35} style={{ objectFit: "contain" }} priority />
            </Link>
          </div>
          <button className={styles.closeBtn} onClick={() => setIsSidebarOpen(false)}>✖</button>
        </div>
        
        {user && (
          <div className={styles.userInfo}>
            <div className={styles.userEmail}>{user.email}</div>
            <LogoutButton />
          </div>
        )}

        <nav className={styles.nav}>
          {navItems.map((item) => {
            const isBibliotecaItem = ['/comunidad/canciones', '/comunidad/recitados', '/comunidad/pildoras', '/comunidad/mi-clase'].includes(pathname);
            const isCommunityActive = (item.name === 'Biblioteca Familiar' || item.name === 'Comunidad Musicabalú') && isBibliotecaItem;
            const isAdminActive = item.name === 'Administrador' && pathname.startsWith('/admin');
            const isActive = pathname === item.path || isCommunityActive || isAdminActive;
            
            // Si el item es comunidad/* y no tiene fullAccess, le añadimos el candado visual
            const isCommunityItem = item.path.includes('/comunidad');
            const isLocked = isCommunityItem && !effectiveHasFullAccess;
            const isEstrategia = item.path === '/admin/estrategia' && pathname === '/admin/estrategia';
            
            // Generate index once
            const estrategiaIndex = isEstrategia ? getEstrategiaIndex() : [];

            return (
              <div key={item.path}>
                <Link 
                  href={item.path}
                  className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <span className={styles.navIcon}>{item.icon}</span>
                  {item.name}
                  {isLocked && <span style={{ marginLeft: 'auto', fontSize: '0.8rem' }}>🔒</span>}
                </Link>
                
                {isEstrategia && (
                  <ul style={{ listStyle: 'none', padding: '0 0 10px 15px', margin: '0 10px 10px 10px', borderLeft: '2px solid #edf2f7' }}>
                    {estrategiaIndex.map((sec) => (
                      <li key={sec.id} style={{ marginBottom: '8px' }}>
                        <a 
                          href={`#${sec.id}`}
                          onClick={(e) => {
                            e.preventDefault();
                            const el = document.getElementById(sec.id);
                            if (el) {
                              el.scrollIntoView({ behavior: 'smooth' });
                              setIsSidebarOpen(false); // close on mobile
                            }
                          }}
                          style={{ textDecoration: 'none', color: '#4a5568', fontSize: '0.85rem', display: 'flex', alignItems: 'flex-start', transition: 'color 0.2s' }}
                          onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-cyan)'}
                          onMouseOut={(e) => e.currentTarget.style.color = '#4a5568'}
                        >
                          <span style={{ backgroundColor: '#edf2f7', color: '#718096', fontSize: '0.7rem', padding: '2px 5px', borderRadius: '4px', marginRight: '8px', fontWeight: 'bold', flexShrink: 0 }}>
                            {sec.num}
                          </span>
                          <span style={{ lineHeight: '1.2' }}>{sec.title}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </nav>
      </aside>
      
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
}
