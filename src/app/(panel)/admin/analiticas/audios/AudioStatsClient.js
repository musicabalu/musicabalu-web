'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function AudioStatsClient({ allAudiosData }) {
  const [filter, setFilter] = useState('Todos'); // 'Todos', 'Canciones', 'Recitados', 'Karaokes', 'Otros'

  const filteredData = allAudiosData.filter(audio => {
    if (filter === 'Todos') return true;
    return audio.category === filter;
  });

  // Colores para la visualización del gráfico
  const COLORS = ['#F4436C', '#AADB1E', '#38B2AC', '#F6E05E', '#ED8936', '#9F7AEA', '#4299E1', '#E53E3E', '#319795', '#D69E2E'];

  return (
    <div style={{ background: '#f7fafc', padding: '2rem', borderRadius: '16px', marginTop: '1rem' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h2 style={{ margin: 0, color: '#2d3748', fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span>🎧</span> Estadísticas Completas
        </h2>

        {/* Controles de Filtro */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {['Todos', 'Canciones', 'Recitados', 'Karaokes'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                border: 'none',
                backgroundColor: filter === f ? 'var(--color-pink)' : 'white',
                color: filter === f ? 'white' : '#4a5568',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: filter === f ? 'var(--shadow-md)' : 'var(--shadow-sm)',
                transition: 'all 0.2s'
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Tarjeta grande ideal para pantallazos */}
      <div style={{ 
        background: 'white', 
        padding: '2rem', 
        borderRadius: '16px', 
        boxShadow: 'var(--shadow-md)',
        borderTop: '6px solid var(--color-cyan)',
        minHeight: '400px'
      }}>
        
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.8rem', color: 'var(--color-dark)', margin: '0 0 10px 0', fontFamily: 'var(--font-heading)' }}>
            Ranking de {filter === 'Todos' ? 'Audios' : filter}
          </h3>
          <p style={{ color: '#718096', margin: 0 }}>
            El top más escuchado por la comunidad en los últimos 30 días
          </p>
        </div>

        {filteredData.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#a0aec0', padding: '3rem 0' }}>No hay reproducciones en esta categoría.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {filteredData.map((audio, idx) => {
              const maxReproducciones = filteredData[0].reproducciones;
              const porcentaje = Math.max((audio.reproducciones / maxReproducciones) * 100, 5); // mínimo 5% para que se vea la barra
              const barColor = COLORS[idx % COLORS.length];

              return (
                <div key={audio.name} style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  
                  {/* Puesto */}
                  <div style={{ 
                    width: '35px', 
                    height: '35px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    background: idx < 3 ? 'var(--color-yellow)' : '#edf2f7',
                    color: idx < 3 ? 'white' : '#4a5568',
                    borderRadius: '50%',
                    fontWeight: 'bold',
                    flexShrink: 0
                  }}>
                    {idx + 1}
                  </div>

                  {/* Barra de progreso visual */}
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                      <span style={{ fontWeight: 600, color: '#2d3748' }}>
                        {audio.name} 
                        {filter === 'Todos' && <span style={{ fontSize: '0.75rem', fontWeight: 'normal', color: '#718096', marginLeft: '10px' }}>({audio.category})</span>}
                      </span>
                      <span style={{ fontWeight: 'bold', color: barColor }}>{audio.reproducciones}</span>
                    </div>
                    <div style={{ width: '100%', background: '#edf2f7', borderRadius: '10px', height: '10px', overflow: 'hidden' }}>
                      <div style={{ 
                        width: `${porcentaje}%`, 
                        background: barColor, 
                        height: '100%', 
                        borderRadius: '10px',
                        transition: 'width 1s ease-out' 
                      }}></div>
                    </div>
                  </div>

                </div>
              )
            })}
          </div>
        )}
      </div>

    </div>
  );
}
