'use client';

import React, { useState } from 'react';
import styles from './inscripciones.module.css';

export default function InscripcionesClient({ initialGroups }) {
  // Opcional: estado para filtrar por texto o similar en el futuro
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrar grupos (o alumnos) por término de búsqueda si lo deseamos
  const filteredGroups = initialGroups.map(g => {
    return {
      ...g,
      enrollments: g.enrollments.filter(e => 
        e.childName.toLowerCase().includes(searchTerm.toLowerCase()) || 
        e.parentName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    };
  });

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder="Buscar por nombre del alumno o padre/madre..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '10px 15px', width: '100%', maxWidth: '400px', borderRadius: '8px', border: '1px solid #ccc' }}
        />
      </div>

      <div className={styles.grid}>
        {filteredGroups.map(group => (
          <div key={group.id} className={styles.groupCard}>
            <div className={styles.groupHeader}>
              <h2 className={styles.groupTitle}>{group.name} {group.schedule}</h2>
              <span className={styles.capacityBadge}>
                {group.enrollments.length} / {group.capacity} plazas
              </span>
            </div>
            
            <div style={{ height: '15px' }}></div> {/* Espaciador donde estaba el horario */}

            {group.enrollments.length === 0 ? (
              <p style={{ fontSize: '0.9rem', color: '#999', fontStyle: 'italic' }}>No hay inscripciones activas.</p>
            ) : (
              <div className={styles.enrollmentList}>
                {group.enrollments.map(e => {
                  
                  // Calcular edad aproximada (solo año de referencia rápido)
                  const birthYear = e.childBirthDate ? e.childBirthDate.split('-')[0] : '?';

                  return (
                    <div key={e.id} className={styles.enrollmentItem}>
                      <h3 className={styles.childName}>{e.childName} <span style={{fontWeight: 'normal', color: '#888'}}>(Nac: {birthYear})</span></h3>
                      <p className={styles.parentInfo}>
                        👤 {e.parentName} &bull; ✉️ {e.email}
                      </p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                        <div className={styles.badges}>
                          <span className={`${styles.badge} ${e.paymentMethod === 'stripe' ? styles.badgeStripe : styles.badgeEfectivo}`}>
                            {e.paymentMethod === 'stripe' ? '💳 Stripe' : '💵 Efectivo'}
                          </span>
                          <span className={`${styles.badge} ${styles.badgeFreq}`}>
                            🔄 {e.paymentFrequency === 'trimestral' ? 'Trimestral' : 'Mensual'}
                          </span>
                        </div>
                        <a 
                          href={`https://wa.me/34${e.phone.replace(/\s+/g, '')}?text=Hola%20${e.parentName},%20te%20escribo%20desde%20Musicabalú...`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className={styles.waBtn}
                        >
                          💬 WhatsApp
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
