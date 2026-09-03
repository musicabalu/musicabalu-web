'use client';

import React, { useState } from 'react';
import styles from './inscripciones.module.css';

export default function InscripcionesClient({ initialGroups }) {
  // Aplanar todos los alumnos en una sola lista
  const allEnrollments = initialGroups.flatMap(g => 
    g.enrollments.map(e => ({
      ...e,
      groupName: g.name,
      groupSchedule: g.schedule
    }))
  );

  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'childName', direction: 'asc' });

  // Filtrar
  const filteredEnrollments = allEnrollments.filter(e => 
    e.childName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    e.parentName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Ordenar
  const sortedEnrollments = [...filteredEnrollments].sort((a, b) => {
    let aVal = a[sortConfig.key];
    let bVal = b[sortConfig.key];
    
    // Tratamiento especial para booleanos o strings nulos
    if (aVal === null || aVal === undefined) aVal = '';
    if (bVal === null || bVal === undefined) bVal = '';
    
    if (typeof aVal === 'string') aVal = aVal.toLowerCase();
    if (typeof bVal === 'string') bVal = bVal.toLowerCase();

    if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return '↕️';
    return sortConfig.direction === 'asc' ? '🔽' : '🔼';
  };

  return (
    <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
      <div style={{ marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder="Buscar por nombre del alumno o padre/madre..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '12px 20px', width: '100%', maxWidth: '500px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '1rem' }}
        />
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', minWidth: '800px', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #edf2f7', backgroundColor: '#f7fafc' }}>
              <th onClick={() => handleSort('childName')} style={{ padding: '1rem', cursor: 'pointer', color: '#4a5568' }}>
                Alumno {getSortIcon('childName')}
              </th>
              <th onClick={() => handleSort('parentName')} style={{ padding: '1rem', cursor: 'pointer', color: '#4a5568' }}>
                Madre/Padre {getSortIcon('parentName')}
              </th>
              <th onClick={() => handleSort('groupName')} style={{ padding: '1rem', cursor: 'pointer', color: '#4a5568' }}>
                Grupo {getSortIcon('groupName')}
              </th>
              <th onClick={() => handleSort('isEmpi')} style={{ padding: '1rem', cursor: 'pointer', color: '#4a5568', textAlign: 'center' }}>
                EMPI {getSortIcon('isEmpi')}
              </th>
              <th onClick={() => handleSort('paymentMethod')} style={{ padding: '1rem', cursor: 'pointer', color: '#4a5568', textAlign: 'center' }}>
                Pago {getSortIcon('paymentMethod')}
              </th>
              <th style={{ padding: '1rem', color: '#4a5568', textAlign: 'center' }}>Contacto</th>
            </tr>
          </thead>
          <tbody>
            {sortedEnrollments.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ padding: '2rem', textAlign: 'center', color: '#718096' }}>No hay inscripciones que coincidan con la búsqueda.</td>
              </tr>
            ) : (
              sortedEnrollments.map(e => (
                <tr key={e.id} style={{ borderBottom: '1px solid #edf2f7', transition: 'background-color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#fbfbfc'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ fontWeight: 'bold', color: '#2d3748' }}>{e.childName}</div>
                    <div style={{ fontSize: '0.8rem', color: '#718096' }}>Nac: {e.childBirthDate ? e.childBirthDate.split('-')[0] : '?'}</div>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ fontWeight: '500', color: '#4a5568' }}>{e.parentName}</div>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ fontWeight: 'bold', color: 'var(--color-pink)' }}>{e.groupName}</div>
                    <div style={{ fontSize: '0.8rem', color: '#718096' }}>{e.groupSchedule}</div>
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>
                    {e.isEmpi ? (
                      <span style={{ padding: '4px 8px', borderRadius: '12px', backgroundColor: '#e0e7ff', color: '#4338ca', fontSize: '0.8rem', fontWeight: 'bold' }}>SÍ</span>
                    ) : (
                      <span style={{ padding: '4px 8px', borderRadius: '12px', backgroundColor: '#f3f4f6', color: '#6b7280', fontSize: '0.8rem' }}>No</span>
                    )}
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>
                    <span style={{ 
                      padding: '4px 8px', 
                      borderRadius: '12px', 
                      backgroundColor: e.paymentMethod === 'stripe' ? '#dcfce7' : '#fef3c7', 
                      color: e.paymentMethod === 'stripe' ? '#166534' : '#b45309', 
                      fontSize: '0.8rem', 
                      fontWeight: 'bold' 
                    }}>
                      {e.paymentMethod === 'stripe' ? '💳 STRIPE' : '💵 EFECTIVO'}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>
                    <a 
                      href={`https://wa.me/34${e.phone.replace(/\s+/g, '')}?text=Hola%20${e.parentName},%20te%20escribo%20desde%20Musicabalú...`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ padding: '6px 12px', backgroundColor: '#25D366', color: 'white', borderRadius: '8px', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 'bold', display: 'inline-block' }}
                    >
                      WhatsApp
                    </a>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
