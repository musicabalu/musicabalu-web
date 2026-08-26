'use client';
import { useEffect, useRef } from 'react';
import styles from './estrategia.module.css';

export default function EstrategiaClient({ styles: htmlStyles, body }) {
  const contentRef = useRef(null);

  useEffect(() => {
    if (!contentRef.current) return;
    
    // Asignar IDs a las secciones para que el menú global pueda hacer scroll
    const sections = contentRef.current.querySelectorAll('.section-header');
    sections.forEach((sec, i) => {
      sec.id = `estrategia-section-${i}`;
    });



    const images = contentRef.current.querySelectorAll('img');
    images.forEach(img => {
      const src = img.getAttribute('src');
      if (src && !src.startsWith('http') && !src.startsWith('/')) {
        img.onerror = () => { img.style.display = 'none'; };
      }
    });

    if (window.location.hash) {
      const element = document.querySelector(window.location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [body]);

  return (
    <div className={styles.layout}>
      <style dangerouslySetInnerHTML={{ __html: htmlStyles }} />
      <main className={styles.mainContent}>
        <div 
          ref={contentRef}
          className={`estrategia-doc page ${styles.htmlWrapper}`}
          dangerouslySetInnerHTML={{ __html: body }} 
        />
      </main>
    </div>
  );
}
