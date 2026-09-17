'use client';
import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from 'recharts';

const COLORS = ['#F4436C', '#AADB1E', '#38B2AC', '#F6E05E', '#ED8936', '#9F7AEA', '#4299E1', '#E53E3E', '#319795', '#D69E2E'];

export default function AnalyticsDashboard({ pageViewsData, audioPlaysData }) {
  // Manejo de hidratación para evitar errores de mismatch en SVG de Recharts
  const [mounted, setMounted] = useState(false);
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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
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
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Gráfica de Canciones Más Escuchadas */}
      <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
        <h2 style={{ fontSize: '1.4rem', color: '#2d3748', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span>🎵</span> Top 10 Canciones/Recitados Más Escuchados
        </h2>
        {audioPlaysData.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#a0aec0', fontStyle: 'italic' }}>No hay reproducciones registradas aún.</p>
        ) : (
          <div style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer>
              <BarChart
                data={audioPlaysData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 150, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e2e8f0" />
                <XAxis type="number" tick={{ fill: '#718096' }} axisLine={false} tickLine={false} />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  tick={{ fill: '#4a5568', fontSize: 13, fontWeight: 500 }} 
                  axisLine={false} 
                  tickLine={false}
                  width={140}
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
  );
}
