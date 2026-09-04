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
    disponible: { text: 'DISPONIBLES', color: '#2C3333', bg: '#AADB1E' }, // Green
    tres: { text: '3 PLAZAS', color: '#FFFFFF', bg: '#00B2E3' }, // Cyan
    dos: { text: '2 PLAZAS', color: '#FFFFFF', bg: '#00B2E3' }, // Cyan
    una: { text: '1 PLAZA', color: '#2C3333', bg: '#FED65E' }, // Yellow
    ultimas: { text: 'ÚLTIMAS PLAZAS', color: '#2C3333', bg: '#FED65E' }, // Yellow
    completo: { text: 'COMPLETO', color: '#FFFFFF', bg: '#F4436C' } // Pink
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

      // FIX: html-to-image bug with CSS transform on parents.
      // We must remove the scale from the parent temporarily to avoid cropping.
      const wrapper = cartelRef.current.parentElement;
      const originalTransform = wrapper.style.transform;
      const originalMargin = wrapper.style.marginBottom;
      
      wrapper.style.transform = 'scale(1)';
      wrapper.style.marginBottom = '0px';
      
      // Allow browser to repaint without scale
      await new Promise(r => setTimeout(r, 50));

      const dataUrl = await htmlToImage.toPng(cartelRef.current, {
        quality: 1.0,
        width: 1080,
        height: 1080,
        pixelRatio: 3, // ALTA CALIDAD
        style: {
          margin: 0
        }
      });

      // Restore the scale
      wrapper.style.transform = originalTransform;
      wrapper.style.marginBottom = originalMargin;

      const link = document.createElement('a');
      link.download = `plazas-musicabalu-${new Date().toISOString().split('T')[0]}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Error generating image:', error);
      alert('Hubo un error al generar la imagen.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Sort groups by day of week
  const daysOrder = { 'Lunes': 1, 'Martes': 2, 'Miércoles': 3, 'Jueves': 4, 'Viernes': 5, 'Sábado': 6, 'Domingo': 7 };
  const sortedGroups = [...initialGroups].sort((a, b) => {
    const dayA = a.schedule.split(' ')[0];
    const dayB = b.schedule.split(' ')[0];
    return (daysOrder[dayA] || 99) - (daysOrder[dayB] || 99);
  });

  return (
    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
      
      {/* Controles */}
      <div style={{ flex: '1', minWidth: '300px', background: 'white', padding: '2rem', borderRadius: '15px', boxShadow: 'var(--shadow-md)' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--color-dark)' }}>Editar Plazas</h2>
        
        {sortedGroups.map(group => (
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
            background: 'white', // Fondo blanco solicitado
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '40px', // Margen uniforme
            boxSizing: 'border-box',
            fontFamily: 'var(--font-body), sans-serif',
            justifyContent: 'space-between'
          }}
        >
          {/* Logo centrado */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', padding: '10px' }}>
            <img 
              src="/logo_texto_corazon.png" 
              alt="Musicabalú" 
              style={{ width: '500px', height: 'auto' }}
              crossOrigin="anonymous"
            />
          </div>

          {/* Lista de Grupos */}
          <div style={{
            background: 'rgba(255, 255, 255, 1)',
            width: '100%',
            borderRadius: '25px',
            padding: '25px',
            boxSizing: 'border-box', // CRUCIAL para que no se corte por la derecha
            border: '2px solid #E2E8F0', // Borde sutil para separarlo del fondo blanco
            display: 'grid',
            gridTemplateColumns: '1fr 1fr', // 2 COLUMNAS para que quepa todo
            gap: '15px 20px',
            marginTop: '10px',
            marginBottom: '10px'
          }}>
            {sortedGroups.map(group => {
              const st = statusConfig[statuses[group.id]];
              return (
                <div key={group.id} style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  borderBottom: '1px solid #eee',
                  paddingBottom: '10px'
                }}>
                  <div style={{ width: '100%' }}>
                    <h3 style={{ fontSize: '38px', margin: '0 0 2px 0', color: 'var(--color-dark)', fontWeight: '800', lineHeight: '1.1' }}>
                      {group.name}
                    </h3>
                    <p style={{ fontSize: '28px', margin: '0 0 12px 0', color: 'var(--color-pink)', fontWeight: 'bold' }}>
                      {group.schedule}
                    </p>
                  </div>
                  <div style={{
                    background: st.bg,
                    padding: '8px 12px',
                    borderRadius: '20px',
                    border: 'none',
                    width: '100%',
                    textAlign: 'center',
                    boxSizing: 'border-box'
                  }}>
                    <span style={{
                      color: st.color,
                      fontSize: '26px',
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
            <p style={{ fontSize: '32px', fontWeight: 'bold', color: 'var(--color-dark)', margin: '0 0 5px 0' }}>
              www.musicabalu.com
            </p>
            <p style={{ fontSize: '24px', color: 'var(--color-pink)', margin: 0, fontWeight: 'bold' }}>
              Reserva tu plaza online
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
