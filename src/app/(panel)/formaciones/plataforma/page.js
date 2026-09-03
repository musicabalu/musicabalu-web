"use client";

import React, { useState, useEffect } from 'react';
import AudioPlayer from '@/components/AudioPlayer';

export default function FormacionesPlataforma() {
  const [titulos, setTitulos] = useState({});
  const [activeTab, setActiveTab] = useState('apuntes');
  const [currentIndex, setCurrentIndex] = useState(null);

  useEffect(() => {
    // Leer el JSON estático de la carpeta public
    fetch('/audios/titulos.json')
      .then(res => res.json())
      .then(data => setTitulos(data))
      .catch(err => console.error("Error cargando títulos:", err));
  }, []);

  // Obtener la playlist actual en base a la pestaña
  const currentPlaylist = Object.entries(titulos).filter(([path]) => path.includes(`/${activeTab}/`));

  const handleNext = () => {
    if (currentIndex !== null && currentPlaylist.length > 0) {
      setCurrentIndex((currentIndex + 1) % currentPlaylist.length);
    }
  };

  const handlePrev = () => {
    if (currentIndex !== null && currentPlaylist.length > 0) {
      setCurrentIndex((currentIndex - 1 + currentPlaylist.length) % currentPlaylist.length);
    }
  };

  // Al cambiar de pestaña, cerramos el reproductor por simplicidad
  useEffect(() => {
    setCurrentIndex(null);
  }, [activeTab]);

  const tabs = [
    { id: 'apuntes', label: 'Apuntes', color: 'var(--color-green)' },
    { id: 'canciones', label: 'Canciones', color: 'var(--color-pink)' },
    { id: 'recitados', label: 'Recitados', color: 'var(--color-cyan)' },
    { id: 'karaokes', label: 'Karaokes', color: 'var(--color-yellow)' }
  ];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (tabId === 'apuntes') {
      fetch('/api/activity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'Plataforma', details: 'Visualizó los Apuntes' })
      }).catch(err => console.error(err));
    }
  };

  return (
    <div style={{ paddingBottom: currentIndex !== null ? '120px' : '40px', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ marginBottom: '30px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', color: 'var(--color-dark)', marginBottom: '10px' }}>Plataforma Formaciones</h1>
        <p style={{ color: 'var(--color-text-light)' }}>Acceso a la biblioteca musical y recursos pedagógicos.</p>
      </div>

      {/* Pestañas (Tabs) */}
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '30px', flexWrap: 'wrap' }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            style={{
              padding: '12px 24px',
              borderRadius: '30px',
              border: 'none',
              backgroundColor: activeTab === tab.id ? tab.color : 'var(--color-bg-alt)',
              color: activeTab === tab.id ? (tab.id === 'karaokes' ? 'var(--color-dark)' : 'white') : 'var(--color-text)',
              fontFamily: 'var(--font-heading)',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'var(--transition-fast)',
              boxShadow: activeTab === tab.id ? 'var(--shadow-md)' : 'none'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Renderizado Condicional: Apuntes o Lista de Audios */}
      {activeTab === 'apuntes' ? (
        <div style={{ marginTop: '20px', borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}>
          <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
            <iframe 
              src="https://docs.google.com/presentation/d/e/2PACX-1vSBbTDbABS3112rgENthbpN_JbxJGiiMv4Bi2cZ9aO_Xha7s-38a6ogygcF_RmzKw/pubembed?start=false&loop=false&delayms=3000" 
              frameBorder="0" 
              width="100%" 
              height="100%" 
              allowFullScreen={true} 
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            ></iframe>
          </div>
        </div>
      ) : (
        <>
          {/* Lista de Audios */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
            gap: '15px' 
          }}>
            {currentPlaylist.map(([path, title], index) => {
              const isActive = currentIndex === index;
              
              const handlePlayAudio = () => {
                setCurrentIndex(index);
                fetch('/api/activity', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ action: 'Reproducción', details: `Escuchó: ${title}` })
                }).catch(err => console.error(err));
              };

              return (
                <div 
                  key={path}
                  onClick={handlePlayAudio}
                  style={{
                    backgroundColor: 'white',
                    padding: '20px',
                    borderRadius: '12px',
                    border: `2px solid ${isActive ? 'var(--color-cyan)' : 'var(--color-border)'}`,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                    transition: 'var(--transition-fast)',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                  onMouseEnter={(e) => !isActive && (e.currentTarget.style.transform = 'translateY(-2px)')}
                  onMouseLeave={(e) => !isActive && (e.currentTarget.style.transform = 'translateY(0)')}
                >
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: isActive ? 'var(--color-cyan)' : 'var(--color-cyan-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: isActive ? 'white' : 'var(--color-cyan)',
                    fontSize: '18px',
                    transition: 'var(--transition-fast)'
                  }}>
                    {isActive ? '▶' : '🎵'}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '1rem', margin: 0, color: isActive ? 'var(--color-cyan)' : 'var(--color-dark)' }}>{title}</h3>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-light)' }}>
                      {isActive ? 'Reproduciendo...' : 'Click para reproducir'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Reproductor Fijo en el Footer */}
          {currentIndex !== null && currentPlaylist[currentIndex] && (
            <AudioPlayer 
              src={`/${currentPlaylist[currentIndex][0]}`} 
              title={currentPlaylist[currentIndex][1]} 
              onClose={() => setCurrentIndex(null)}
              onNext={handleNext}
              onPrev={handlePrev}
            />
          )}
        </>
      )}
    </div>
  );
}
