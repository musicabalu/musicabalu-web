'use client';

import { useState } from 'react';
import Link from 'next/link';
import AudioPlayer from '@/components/AudioPlayer';

export default function AudioList({ tracks, hasFullAccess }) {
  const [currentIndex, setCurrentIndex] = useState(null);

  const handlePlayPause = (index) => {
    // Si no tiene acceso total, bloqueamos a partir de la pista 2 (índice 2 o mayor)
    if (!hasFullAccess && index >= 2) {
      alert("Para escuchar esta pista necesitas estar matriculado o suscribirte a La Comunidad.");
      return;
    }
    setCurrentIndex(index);
    
    // Registrar actividad
    if (tracks[index]) {
      fetch('/api/activity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'REPRODUCIR_AUDIO', details: tracks[index].title })
      }).catch(e => console.error(e));
    }
  };

  const handleNext = () => {
    if (currentIndex !== null && tracks.length > 0) {
      let nextIndex = (currentIndex + 1) % tracks.length;
      if (!hasFullAccess && nextIndex >= 2) {
        nextIndex = 0; // Vuelve al principio si la siguiente está bloqueada
      }
      setCurrentIndex(nextIndex);
    }
  };

  const handlePrev = () => {
    if (currentIndex !== null && tracks.length > 0) {
      let prevIndex = (currentIndex - 1 + tracks.length) % tracks.length;
      if (!hasFullAccess && prevIndex >= 2) {
        prevIndex = 1; // Si va hacia atrás y cae en bloqueadas, va a la última permitida
      }
      setCurrentIndex(prevIndex);
    }
  };

  return (
    <div style={{ animation: 'fadeInUp 0.6s ease-out' }}>
      {!hasFullAccess && (
        <div style={{
          background: 'var(--color-yellow-light, #FEF9E7)',
          border: '1px solid var(--color-yellow, #FED65E)',
          padding: '1.5rem',
          borderRadius: '16px',
          marginBottom: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div>
            <h4 style={{ color: 'var(--color-dark, #2C3333)', margin: '0 0 0.5rem 0', fontSize: '1.2rem', fontWeight: '800' }}>Versión Gratuita 🔓</h4>
            <p style={{ margin: 0, color: '#92400e', fontSize: '0.95rem' }}>Estás escuchando las pistas de prueba. Suscríbete para desbloquear toda la biblioteca y disfrutar sin límites.</p>
          </div>
          <Link href="/tienda" className="btn btn-cyan">
            Suscribirme
          </Link>
        </div>
      )}

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
        gap: '15px' 
      }}>
        {tracks.map((track, index) => {
          const isLocked = !hasFullAccess && index >= 2;
          const isActive = currentIndex === index;

          return (
            <div 
              key={index}
              onClick={() => {
                if (!isLocked) handlePlayPause(index);
                else handlePlayPause(index); // para que salte el alert
              }}
              style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '12px',
                border: `2px solid ${isActive ? 'var(--color-cyan)' : 'var(--color-border)'}`,
                cursor: isLocked ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                transition: 'var(--transition-fast)',
                boxShadow: 'var(--shadow-sm)',
                opacity: isLocked ? 0.6 : 1
              }}
              onMouseEnter={(e) => !isActive && !isLocked && (e.currentTarget.style.transform = 'translateY(-2px)')}
              onMouseLeave={(e) => !isActive && !isLocked && (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: isLocked ? '#E2E8F0' : (isActive ? 'var(--color-cyan)' : 'var(--color-cyan-light)'),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: isLocked ? '#718096' : (isActive ? 'white' : 'var(--color-cyan)'),
                fontSize: '18px',
                transition: 'var(--transition-fast)',
                flexShrink: 0
              }}>
                {isLocked ? '🔒' : (isActive ? '▶' : '🎵')}
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1rem', margin: 0, color: isActive ? 'var(--color-cyan)' : 'var(--color-dark)' }}>{track.title}</h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-light)' }}>
                  {isLocked ? 'Bloqueado' : (isActive ? 'Reproduciendo...' : 'Click para reproducir')}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {currentIndex !== null && tracks[currentIndex] && (
        <AudioPlayer 
          src={`/${tracks[currentIndex].url}`} 
          title={tracks[currentIndex].title} 
          onClose={() => setCurrentIndex(null)}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}
    </div>
  );
}
