'use client';
import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from 'recharts';

const COLORS = ['#F4436C', '#AADB1E', '#38B2AC', '#F6E05E', '#ED8936', '#9F7AEA', '#4299E1', '#E53E3E', '#319795', '#D69E2E'];

export default function AnalyticsDashboard({ pageViewsData, audioPlaysData, usersData }) {
  // Manejo de hidratación para evitar errores de mismatch en SVG de Recharts
  const [mounted, setMounted] = useState(false);
  const [selectedUserEmail, setSelectedUserEmail] = useState('');
  
  useEffect(() => setMounted(true), []);

  if (!mounted) return <div style={{ minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Cargando gráficas...</div>;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <p style={{ margin: 0, fontWeight: 'bold', color: '#2d3748' }}>{label || payload[0].name}</p>
          <p style={{ margin: 0, color: 'var(--color-pink)' }}>{`${payload[0].value} interacciones`}</p>
        </div>
      );
    }
    return null;
  };

  const selectedUser = usersData?.find(u => u.email === selectedUserEmail);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Sección Global */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {/* Gráfica de Páginas Más Visitadas */}
        <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: '1.4rem', color: '#2d3748', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>👀</span> Top Páginas Más Visitadas
          </h2>
          {pageViewsData.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#a0aec0', fontStyle: 'italic' }}>No hay datos suficientes.</p>
          ) : (
            <div style={{ width: '100%', height: 350 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={pageViewsData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={2}
                    dataKey="vistas"
                    nameKey="name"
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  >
                    {pageViewsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Gráfica de Canciones Más Escuchadas */}
        <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: '1.4rem', color: '#2d3748', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>🎵</span> Top Audios Más Escuchados
          </h2>
          {audioPlaysData.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#a0aec0', fontStyle: 'italic' }}>No hay reproducciones registradas aún.</p>
          ) : (
            <div style={{ width: '100%', height: 350 }}>
              <ResponsiveContainer>
                <BarChart
                  data={audioPlaysData}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 120, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e2e8f0" />
                  <XAxis type="number" tick={{ fill: '#718096' }} axisLine={false} tickLine={false} />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    tick={{ fill: '#4a5568', fontSize: 13, fontWeight: 500 }} 
                    axisLine={false} 
                    tickLine={false}
                    width={110}
                  />
                  <RechartsTooltip content={<CustomTooltip />} cursor={{ fill: '#f7fafc' }} />
                  <Bar dataKey="reproducciones" fill="var(--color-green, #AADB1E)" radius={[0, 4, 4, 0]}>
                    {audioPlaysData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>

      {/* Sección Individual por Usuario */}
      <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', marginTop: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.4rem', color: '#2d3748', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>👤</span> Analíticas por Familia
          </h2>
          
          <select 
            value={selectedUserEmail} 
            onChange={(e) => setSelectedUserEmail(e.target.value)}
            style={{
              padding: '10px 15px',
              borderRadius: '8px',
              border: '1px solid #cbd5e0',
              fontSize: '1rem',
              color: '#2d3748',
              backgroundColor: '#f7fafc',
              minWidth: '250px'
            }}
          >
            <option value="">-- Selecciona una familia --</option>
            {usersData?.map(u => (
              <option key={u.email} value={u.email}>{u.name} ({u.email})</option>
            ))}
          </select>
        </div>

        {selectedUserEmail && !selectedUser && (
          <p style={{ color: '#a0aec0', textAlign: 'center' }}>No hay datos suficientes para este usuario en los últimos 30 días.</p>
        )}

        {selectedUser && (
          <div style={{ animation: 'fadeInUp 0.4s ease-out' }}>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#4a5568', marginRight: '10px' }}>Nivel de Acceso:</span>
              {selectedUser.hasComunidad ? (
                <span style={{ background: '#e6fffa', color: '#319795', padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold' }}>✓ Comunidad / Presencial</span>
              ) : (
                <span style={{ background: '#fff5f5', color: '#e53e3e', padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold' }}>✕ Sin Comunidad</span>
              )}
              {selectedUser.hasFormaciones ? (
                <span style={{ background: '#ebf4ff', color: '#3182ce', padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold' }}>✓ Formaciones</span>
              ) : (
                <span style={{ background: '#fff5f5', color: '#e53e3e', padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold' }}>✕ Sin Formaciones</span>
              )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
              
              {/* Top Páginas del Usuario */}
              <div style={{ background: '#f7fafc', padding: '1.5rem', borderRadius: '12px' }}>
                <h3 style={{ fontSize: '1.1rem', color: '#4a5568', margin: '0 0 1rem 0' }}>📌 Secciones Favoritas</h3>
                {selectedUser.topPages.length > 0 ? (
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {selectedUser.topPages.map((page, idx) => (
                      <li key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: idx !== 2 ? '1px solid #e2e8f0' : 'none' }}>
                        <span style={{ fontWeight: 500, color: '#2d3748' }}>{page.name}</span>
                        <span style={{ color: 'var(--color-pink)', fontWeight: 'bold' }}>{page.vistas}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p style={{ color: '#a0aec0', margin: 0, fontSize: '0.9rem' }}>Sin visitas registradas.</p>
                )}
              </div>

              {/* Top Audios del Usuario */}
              <div style={{ background: '#f7fafc', padding: '1.5rem', borderRadius: '12px' }}>
                <h3 style={{ fontSize: '1.1rem', color: '#4a5568', margin: '0 0 1rem 0' }}>🎧 Canciones Favoritas</h3>
                {selectedUser.topAudios.length > 0 ? (
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {selectedUser.topAudios.map((audio, idx) => (
                      <li key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: idx !== 2 ? '1px solid #e2e8f0' : 'none' }}>
                        <span style={{ fontWeight: 500, color: '#2d3748' }}>{audio.name}</span>
                        <span style={{ color: 'var(--color-green)', fontWeight: 'bold' }}>{audio.reproducciones}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p style={{ color: '#a0aec0', margin: 0, fontSize: '0.9rem' }}>Sin audios registrados.</p>
                )}
              </div>

            </div>
          </div>
        )}
      </div>

    </div>
  );
}
