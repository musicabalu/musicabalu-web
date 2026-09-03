'use client';

import { useState, useRef } from 'react';
import * as htmlToImage from 'html-to-image';

export default function CartelClient({ initialGroups }) {
  const [statuses, setStatuses] = useState(
    initialGroups.reduce((acc, group) => {
      acc[group.id] = 'disponible';
      return acc;
    }, {})
  );

  const [isGenerating, setIsGenerating] = useState(false);
  const cartelRef = useRef(null);

  const statusConfig = {
    disponible: { text: 'DISPONIBLES', color: '#10B981', bg: '#D1FAE5' }, // Green
    tres: { text: '3 PLAZAS', color: '#059669', bg: '#D1FAE5' }, // Green-ish
    dos: { text: '2 PLAZAS', color: '#D97706', bg: '#FEF3C7' }, // Orange-ish
    una: { text: '1 PLAZA', color: '#EA580C', bg: '#FFEDD5' }, // Orange-Red
    ultimas: { text: 'ÚLTIMAS PLAZAS', color: '#F59E0B', bg: '#FEF3C7' }, // Yellow
    completo: { text: 'COMPLETO', color: '#EF4444', bg: '#FEE2E2' } // Red
  };

  const handleStatusChange = (groupId, newStatus) => {
    setStatuses(prev => ({ ...prev, [groupId]: newStatus }));
  };

  const downloadImage = async () => {
    if (!cartelRef.current) return;
    
    try {
      setIsGenerating(true);
      // We need to wait a tick for fonts/images to be fully ready just in case
      await new Promise(r => setTimeout(r, 100));

      const dataUrl = await htmlToImage.toJpeg(cartelRef.current, {
        quality: 0.95,
        width: 1080,
        height: 1080,
        pixelRatio: 1, // Ensure exact 1080x1080
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left',
          margin: 0
        }
      });

      const link = document.createElement('a');
      link.download = `plazas-musicabalu-${new Date().toISOString().split('T')[0]}.jpg`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Error generating image:', error);
      alert('Hubo un error al generar la imagen.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Group groups by day of week if possible, or just list them
  // Assuming `schedule` contains the day (e.g., "Lunes 17:00")
  
  return (
    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
      
      {/* Controles */}
      <div style={{ flex: '1', minWidth: '300px', background: 'white', padding: '2rem', borderRadius: '15px', boxShadow: 'var(--shadow-md)' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--color-dark)' }}>Editar Plazas</h2>
        
        {initialGroups.map(group => (
          <div key={group.id} style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #eee' }}>
            <p style={{ fontWeight: 'bold', margin: '0 0 0.5rem 0' }}>{group.name} <span style={{ fontWeight: 'normal', color: 'gray', fontSize: '0.9em' }}>({group.schedule})</span></p>
            <select
              value={statuses[group.id]}
              onChange={(e) => handleStatusChange(group.id, e.target.value)}
              style={{
                width: '100%',
                padding: '0.8rem',
                borderRadius: '8px',
                border: '1px solid #ddd',
                fontSize: '1rem',
                backgroundColor: statusConfig[statuses[group.id]].bg,
                color: statusConfig[statuses[group.id]].color,
                fontWeight: 'bold'
              }}
            >
              <option value="disponible">🟢 Disponibles</option>
              <option value="tres">🟩 3 Plazas</option>
              <option value="dos">🟧 2 Plazas</option>
              <option value="una">🔥 1 Plaza</option>
              <option value="ultimas">🟡 Últimas plazas</option>
              <option value="completo">🔴 Completo</option>
            </select>
          </div>
        ))}

        <button
          onClick={downloadImage}
          disabled={isGenerating}
          style={{
            width: '100%',
            padding: '1rem',
            background: isGenerating ? 'gray' : 'var(--color-pink)',
            color: 'white',
            border: 'none',
            borderRadius: '30px',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            fontFamily: 'var(--font-heading)',
            cursor: isGenerating ? 'not-allowed' : 'pointer',
            marginTop: '1rem',
            boxShadow: 'var(--shadow-md)',
            transition: 'var(--transition-fast)'
          }}
        >
          {isGenerating ? 'Generando...' : '📥 Descargar Cartel (WhatsApp)'}
        </button>
        <p style={{ fontSize: '0.9rem', color: 'gray', marginTop: '1rem', textAlign: 'center' }}>
          La imagen se descargará en formato vertical HD, perfecta para Estados de WhatsApp e Instagram.
        </p>
      </div>

      {/* Vista Previa del Cartel */}
      <div style={{ 
        width: '1080px', 
        height: '1080px', 
        transform: 'scale(0.5)', 
        transformOrigin: 'top left',
        marginBottom: '-540px', // Compensa el espacio del scale(0.5) -> 1080 * 0.5 = 540
        boxShadow: '0 0 20px rgba(0,0,0,0.1)',
        borderRadius: '30px',
        overflow: 'hidden',
        border: '10px solid #333'
      }}>
        
        {/* ELEMENTO A CAPTURAR */}
        <div 
          ref={cartelRef}
          style={{
            width: '1080px',
            height: '1080px',
            background: 'linear-gradient(135deg, #FEF08A 0%, #FDE047 100%)', // Fondo amarillo
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '30px',
            boxSizing: 'border-box',
            fontFamily: 'var(--font-body), sans-serif',
            justifyContent: 'space-between'
          }}
        >
          {/* Logo y Título combinados en horizontal para ahorrar espacio vertical */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '0 10px' }}>
            <img 
              src="/logo_texto_corazon.png" 
              alt="Musicabalú" 
              style={{ width: '300px', height: 'auto' }}
              crossOrigin="anonymous"
            />
            <h1 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '60px',
              color: 'var(--color-dark)',
              textAlign: 'right',
              lineHeight: '0.9',
              margin: '0',
              textShadow: '3px 3px 0px rgba(255,255,255,0.8)'
            }}>
              MATRÍCULAS<br/>ABIERTAS
            </h1>
          </div>

          {/* Lista de Grupos */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.9)',
            width: '100%',
            borderRadius: '25px',
            padding: '20px',
            boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            marginTop: '15px',
            marginBottom: '15px'
          }}>
            {initialGroups.map(group => {
              const st = statusConfig[statuses[group.id]];
              return (
                <div key={group.id} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderBottom: '2px solid #eee',
                  paddingBottom: '8px'
                }}>
                  <div>
                    <h3 style={{ fontSize: '26px', margin: '0 0 4px 0', color: 'var(--color-dark)', fontWeight: '800' }}>
                      {group.name}
                    </h3>
                    <p style={{ fontSize: '20px', margin: 0, color: 'var(--color-pink)', fontWeight: 'bold' }}>
                      {group.schedule}
                    </p>
                  </div>
                  <div style={{
                    background: st.bg,
                    padding: '8px 16px',
                    borderRadius: '20px',
                    border: '3px solid ' + st.color
                  }}>
                    <span style={{
                      color: st.color,
                      fontSize: '18px',
                      fontWeight: '900',
                      letterSpacing: '1px'
                    }}>
                      {st.text}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div style={{ textAlign: 'center', paddingBottom: '10px' }}>
            <p style={{ fontSize: '26px', fontWeight: 'bold', color: 'var(--color-dark)', margin: '0 0 5px 0' }}>
              www.musicabalu.com
            </p>
            <p style={{ fontSize: '18px', color: 'var(--color-pink)', margin: 0, fontWeight: 'bold' }}>
              Reserva tu plaza online
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
