'use client';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function RouteTracker() {
  const pathname = usePathname();
  const startTime = useRef(Date.now());
  const currentPath = useRef(pathname);

  const logActivity = (action, details) => {
    fetch('/api/logActivity', {
      method: 'POST',
      body: JSON.stringify({ action, details }),
      headers: { 'Content-Type': 'application/json' }
    }).catch(e => console.error(e));
  };

  // Tracking route changes
  useEffect(() => {
    const now = Date.now();
    const timeSpentMs = now - startTime.current;
    
    // Log previous page duration if changed and stayed > 2 seconds
    if (pathname && currentPath.current && currentPath.current !== pathname) {
      if (timeSpentMs > 2000) {
        const secs = Math.floor(timeSpentMs / 1000);
        const timeStr = secs >= 60 ? `${Math.floor(secs / 60)}m ${secs % 60}s` : `${secs}s`;
        logActivity('Permanencia', `Estuvo ${timeStr} en: ${currentPath.current}`);
      }
      
      // Log new page view
      logActivity('Visita de vista', `Accedió a: ${pathname}`);
      
      currentPath.current = pathname;
      startTime.current = now;
    }
  }, [pathname]);

  // Initial load and beforeunload
  useEffect(() => {
    if (pathname) {
      logActivity('Visita de vista', `Accedió a: ${pathname}`);
    }
    
    // Attempt tracking when tab is closed or navigated away externally
    const handleBeforeUnload = () => {
      const ms = Date.now() - startTime.current;
      if (ms > 2000) {
        const secs = Math.floor(ms / 1000);
        const timeStr = secs >= 60 ? `${Math.floor(secs / 60)}m ${secs % 60}s` : `${secs}s`;
        
        const data = new Blob([
          JSON.stringify({ action: 'Cierre de sesión / Pestaña', details: `Salió tras estar ${timeStr} en: ${currentPath.current}` })
        ], { type: 'application/json' });
        
        navigator.sendBeacon('/api/logActivity', data);
      }
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []); // Run once on mount

  return null;
}
