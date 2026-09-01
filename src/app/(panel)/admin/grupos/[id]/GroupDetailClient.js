'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './grupo.module.css';
import { useRouter } from 'next/navigation';

// Helper: Calcular edad
function calculateAge(birthDateString) {
  if (!birthDateString) return '?';
  const birthDate = new Date(birthDateString);
  const today = new Date();
  
  let months = (today.getFullYear() - birthDate.getFullYear()) * 12;
  months -= birthDate.getMonth();
  months += today.getMonth();
  
  if (months <= 0) return 'Recién nacido';
  if (months < 24) return `${months} meses`;
  
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  
  if (remainingMonths === 0) return `${years} años`;
  return `${years} años y ${remainingMonths} mes${remainingMonths > 1 ? 'es' : ''}`;
}

// Lista de meses
const monthsList = [
  '2026-09', '2026-10', '2026-11', '2026-12',
  '2027-01', '2027-02', '2027-03', '2027-04', '2027-05', '2027-06'
];

export default function GroupDetailClient({ group }) {
  // Estado inicial de asistencias
  const [attendance, setAttendance] = useState(() => {
    const initialState = {};
    group.enrollments.forEach(e => {
      try {
        initialState[e.id] = e.attendanceData ? JSON.parse(e.attendanceData) : {};
      } catch {
        initialState[e.id] = {};
      }
    });
    return initialState;
  });

  const [currentMonth, setCurrentMonth] = useState('2026-09');
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const toggleAttendance = async (enrollmentId, weekIndex) => {
    // Clonar estado actual
    const currentStudentAtt = attendance[enrollmentId] || {};
    const monthAtt = currentStudentAtt[currentMonth] || [false, false, false, false];
    
    // Modificar
    const newMonthAtt = [...monthAtt];
    newMonthAtt[weekIndex] = !newMonthAtt[weekIndex];
    
    const newStudentAtt = {
      ...currentStudentAtt,
      [currentMonth]: newMonthAtt
    };

    // Actualizar UI optimista
    setAttendance(prev => ({
      ...prev,
      [enrollmentId]: newStudentAtt
    }));

    // Guardar en BD (Fetch silencioso)
    try {
      await fetch('/api/admin/attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          enrollmentId,
          attendanceData: JSON.stringify(newStudentAtt)
        })
      });
    } catch (error) {
      console.error("Error guardando asistencia:", error);
    }
  };

  const deleteEnrollment = async (enrollmentId, childName) => {
    if (!window.confirm(`¿Estás seguro de que quieres eliminar la inscripción de ${childName}? Esta acción no se puede deshacer.`)) {
      return;
    }
    
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/enrollments/${enrollmentId}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        router.refresh(); // Recarga la página para actualizar la lista
      } else {
        alert('Error al eliminar la inscripción');
      }
    } catch (e) {
      alert('Error de conexión');
    }
    setIsDeleting(false);
  };

  return (
    <div className={styles.container}>
      <Link href="/admin" style={{ display: 'inline-flex', alignItems: 'center', color: '#718096', textDecoration: 'none', marginBottom: '1.5rem', fontWeight: '500', fontSize: '0.9rem' }}>
        <span style={{ marginRight: '8px' }}>←</span> Volver a Panel de Control
      </Link>
      
      <div className={styles.header}>
        <h1 className={styles.title}>{group.name}</h1>
        <p className={styles.subtitle}>🕒 {group.schedule} &bull; {group.enrollments.length} alumnos matriculados</p>
      </div>

      <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem', background: 'white', padding: '1rem 1.5rem', borderRadius: '12px', boxShadow: 'var(--shadow-sm)' }}>
        <h2 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--color-dark)' }}>Ver asistencia de:</h2>
        <select 
          className={styles.monthSelector}
          value={currentMonth}
          onChange={(e) => setCurrentMonth(e.target.value)}
          style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '1rem', flex: 1, maxWidth: '250px' }}
        >
          <option value="2026-09">Septiembre 2026</option>
          <option value="2026-10">Octubre 2026</option>
          <option value="2026-11">Noviembre 2026</option>
          <option value="2026-12">Diciembre 2026</option>
          <option value="2027-01">Enero 2027</option>
          <option value="2027-02">Febrero 2027</option>
          <option value="2027-03">Marzo 2027</option>
          <option value="2027-04">Abril 2027</option>
          <option value="2027-05">Mayo 2027</option>
          <option value="2027-06">Junio 2027</option>
        </select>
      </div>

      <div>
        {group.enrollments.length === 0 ? (
          <p>No hay alumnos en este grupo aún.</p>
        ) : (
          group.enrollments.map(e => {
            const ageText = calculateAge(e.childBirthDate);
            const stuAtt = attendance[e.id]?.[currentMonth] || [false, false, false, false];

            return (
              <div key={e.id} className={styles.studentCard}>
                <div className={styles.studentInfo}>
                  <h3 className={styles.childName}>
                    {e.childName} 
                    {e.status === 'pending' && <span style={{ fontSize: '0.75rem', background: '#fef3c7', color: '#b45309', padding: '2px 8px', borderRadius: '12px', marginLeft: '10px', verticalAlign: 'middle' }}>PENDIENTE</span>}
                  </h3>
                  <p style={{ color: 'var(--color-text-light)', fontSize: '0.9rem', margin: '0 0 5px 0' }}>
                    🎂 Nacimiento: {e.childBirthDate ? new Date(e.childBirthDate).toLocaleDateString('es-ES') : 'Desconocida'} 
                    <span className={styles.ageBadge}>{ageText}</span>
                  </p>
                  <p className={styles.parentInfo}>
                    👤 {e.parentName} &bull; ✉️ {e.email}
                  </p>
                  <div className={styles.actions}>
                    <a 
                      href={`https://wa.me/34${e.phone.replace(/\s+/g, '')}?text=Hola%20${e.parentName},%20te%20escribo%20desde%20Musicabalú...`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={styles.waBtn}
                    >
                      💬 WhatsApp
                    </a>
                    <button 
                      onClick={() => deleteEnrollment(e.id, e.childName)}
                      disabled={isDeleting}
                      style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: '#fee2e2', color: '#ef4444', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.9rem' }}
                    >
                      🗑️ Eliminar
                    </button>
                  </div>
                </div>

                <div className={styles.attendanceSection}>
                  <div className={styles.attendanceHeader}>
                    <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Asistencia {currentMonth.split('-')[1]}/{currentMonth.split('-')[0]}</span>
                  </div>
                  
                  <div className={styles.weeksGrid}>
                    {[0, 1, 2, 3].map(weekIndex => (
                      <div 
                        key={weekIndex} 
                        className={styles.weekBox}
                        onClick={() => toggleAttendance(e.id, weekIndex)}
                      >
                        <span className={styles.weekLabel}>S{weekIndex + 1}</span>
                        <div className={`${styles.checkbox} ${stuAtt[weekIndex] ? styles.checkboxChecked : ''}`}>
                          {stuAtt[weekIndex] && '✓'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
