'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from '../../grupos/[id]/grupo.module.css';

function parseFlexibleDate(input) {
  if (!input) return null;
  const trimmed = String(input).trim();
  // Formato DD/MM/YYYY o DD-MM-YYYY
  const dmy = trimmed.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
  if (dmy) {
    const day = parseInt(dmy[1], 10);
    const month = parseInt(dmy[2], 10) - 1;
    const year = parseInt(dmy[3], 10);
    const d = new Date(year, month, day);
    if (!isNaN(d.getTime())) return d;
  }
  const iso = new Date(trimmed);
  if (!isNaN(iso.getTime()) && trimmed.length >= 8) return iso;
  return null;
}

function formatAgeBadge(birthDateInput) {
  if (!birthDateInput) return null;
  const birthDate = parseFlexibleDate(birthDateInput);
  if (!birthDate) {
    // Si escribieron directamente "18 meses" o similar
    return String(birthDateInput).trim();
  }

  const now = new Date();
  let months = (now.getFullYear() - birthDate.getFullYear()) * 12;
  months -= birthDate.getMonth();
  months += now.getMonth();

  if (months <= 0) return 'Recién nacido';
  if (months < 24) return `${months} meses`;

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  if (remainingMonths === 0) return `${years} años`;
  return `${years} años y ${remainingMonths} mes${remainingMonths > 1 ? 'es' : ''}`;
}

export default function WorkshopGroupClient({ workshop, initialOrders }) {
  const router = useRouter();
  const [orders, setOrders] = useState(initialOrders);
  const [isBusy, setIsBusy] = useState(false);

  // Estados de comunicaciones
  const [modalType, setModalType] = useState(null); // 'reminder' | 'post_workshop' | null
  const [subject, setSubject] = useState('');
  const [bodyText, setBodyText] = useState('');
  const [loadingTemplate, setLoadingTemplate] = useState(false);
  const [sendingComms, setSendingComms] = useState(false);
  const [commsFeedback, setCommsFeedback] = useState(null);
  const [testEmail, setTestEmail] = useState('hola@musicabalu.com');

  const parts = (workshop.dateText || '').split('|').map(s => s.trim());
  const schedulePart = parts[0] || workshop.dateText;
  const addressPart = parts[1] || '';

  const handleOpenModal = async (type) => {
    setModalType(type);
    setLoadingTemplate(true);
    setCommsFeedback(null);
    try {
      const res = await fetch(`/api/admin/workshop-comms?workshopId=${workshop.id}`);
      const data = await res.json();
      if (res.ok && data.templates) {
        const tpl = type === 'reminder' ? data.templates.reminder : data.templates.postWorkshop;
        setSubject(tpl.subject);
        setBodyText(tpl.body);
      } else {
        alert('Error al cargar la plantilla');
      }
    } catch (e) {
      alert('Error de conexión');
    } finally {
      setLoadingTemplate(false);
    }
  };

  const handleSendComms = async (isTest = false) => {
    if (!isTest) {
      const confirmSend = window.confirm(
        `¿Seguro que quieres enviar este email a las ${orders.length} familias inscritas en esta sesión?`
      );
      if (!confirmSend) return;
    }

    setSendingComms(true);
    setCommsFeedback(null);

    try {
      const res = await fetch('/api/admin/workshop-comms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          workshopId: workshop.id,
          type: modalType,
          subject,
          bodyText,
          isTest,
          testEmail
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setCommsFeedback({
          type: 'success',
          text: isTest
            ? `✅ Correo de prueba enviado a ${testEmail}`
            : `🎉 ¡Enviado con éxito a ${data.sentCount} familias!`
        });
        if (!isTest) {
          setTimeout(() => setModalType(null), 2500);
        }
      } else {
        setCommsFeedback({
          type: 'error',
          text: data.error || 'Error al enviar el correo'
        });
      }
    } catch (e) {
      setCommsFeedback({
        type: 'error',
        text: 'Error de conexión al enviar'
      });
    } finally {
      setSendingComms(false);
    }
  };

  const toggleAttendance = async (order) => {
    let extra = {};
    try { extra = order.shippingData ? JSON.parse(order.shippingData) : {}; } catch {}

    let nextState = 'present';
    if (extra.attended === 'present') nextState = 'absent';
    else if (extra.attended === 'absent') nextState = null;

    const updatedExtra = { ...extra, attended: nextState };
    setOrders(prev =>
      prev.map(o => o.id === order.id ? { ...o, shippingData: JSON.stringify(updatedExtra) } : o)
    );

    try {
      await fetch(`/api/admin/workshop-orders/${order.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ attended: nextState })
      });
    } catch (e) {
      console.error('Error guardando asistencia del taller:', e);
    }
  };

  const handleEditNotes = async (order, currentNotes, childLabel) => {
    const newNotes = window.prompt(`Notas para ${childLabel}:`, currentNotes || '');
    if (newNotes === null || newNotes === currentNotes) return;

    let extra = {};
    try { extra = order.shippingData ? JSON.parse(order.shippingData) : {}; } catch {}
    const updatedExtra = { ...extra, notes: newNotes };

    setOrders(prev =>
      prev.map(o => o.id === order.id ? { ...o, shippingData: JSON.stringify(updatedExtra) } : o)
    );

    try {
      await fetch(`/api/admin/workshop-orders/${order.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes: newNotes })
      });
      router.refresh();
    } catch (e) {
      alert('Error al guardar las notas');
    }
  };

  const handleDeleteAttendee = async (orderId, childLabel) => {
    if (!window.confirm(`¿Quieres eliminar la inscripción de ${childLabel} de este taller? Se liberará su plaza, pero el adulto seguirá registrado como usuario.`)) return;
    setIsBusy(true);
    try {
      const res = await fetch(`/api/admin/workshop-orders/${orderId}`, { method: 'DELETE' });
      if (res.ok) {
        setOrders(prev => prev.filter(o => o.id !== orderId));
        router.refresh();
      } else {
        alert('No se pudo eliminar la inscripción');
      }
    } catch (e) {
      alert('Error de conexión');
    }
    setIsBusy(false);
  };

  const handleDeleteFullGroup = async () => {
    if (!window.confirm(`¿Seguro que quieres finalizar y borrar el grupo "${workshop.title}"?\n\nSe borrará este taller y los datos de los peques de esta sesión para limpiar tu panel, pero todos los padres seguirán guardados como usuarios (y conservarán su suscripción si la tienen).`)) {
      return;
    }
    setIsBusy(true);
    try {
      const res = await fetch(`/api/admin/workshop-orders/${workshop.id}?group=1`, {
        method: 'DELETE'
      });
      if (res.ok) {
        router.push('/admin/talleres');
        router.refresh();
      } else {
        alert('Error al borrar el grupo del taller');
      }
    } catch (e) {
      alert('Error de conexión');
    }
    setIsBusy(false);
  };

  return (
    <div className={styles.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '12px' }}>
        <Link href="/admin/talleres" style={{ display: 'inline-flex', alignItems: 'center', color: '#718096', textDecoration: 'none', fontWeight: '600', fontSize: '0.95rem' }}>
          <span style={{ marginRight: '8px' }}>←</span> Volver a Talleres
        </Link>

        <button
          onClick={handleDeleteFullGroup}
          disabled={isBusy}
          style={{
            padding: '10px 16px',
            borderRadius: '10px',
            border: '1px solid #fecaca',
            backgroundColor: '#fee2e2',
            color: '#b91c1c',
            fontWeight: '700',
            fontSize: '0.9rem',
            cursor: 'pointer'
          }}
        >
          🗑️ Finalizar y borrar este grupo
        </button>
      </div>

      <div className={styles.header}>
        <h1 className={styles.title}>{workshop.title}</h1>
        <p className={styles.subtitle}>
          🕒 {schedulePart} {addressPart ? ` • ${addressPart}` : ''} &bull; <strong>{orders.length} / 12 plazas ocupadas</strong>
        </p>
      </div>

      {/* Barra de Comunicaciones del Taller */}
      <div style={{
        backgroundColor: 'white',
        padding: '18px 24px',
        borderRadius: '16px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.04)',
        border: '1px solid #e2e8f0',
        marginBottom: '2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div>
          <div style={{ fontWeight: '800', color: '#2d3748', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>📬</span> Comunicaciones de esta Sesión
          </div>
          <div style={{ color: '#718096', fontSize: '0.85rem', marginTop: '2px' }}>
            {orders.length === 0
              ? 'Cuando haya inscritos en esta sesión, podrás enviarles el recordatorio previo o el email post-taller.'
              : `Gestiona los correos para las ${orders.length} familias inscritas en este grupo.`}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={() => handleOpenModal('reminder')}
            disabled={orders.length === 0}
            style={{
              padding: '10px 18px',
              borderRadius: '10px',
              border: '1px solid #fed7aa',
              backgroundColor: '#fff7ed',
              color: '#c2410c',
              fontWeight: '700',
              fontSize: '0.88rem',
              cursor: orders.length === 0 ? 'not-allowed' : 'pointer',
              opacity: orders.length === 0 ? 0.5 : 1,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'transform 0.15s'
            }}
          >
            <span>🧸</span> Recordatorio Previo
          </button>

          <button
            onClick={() => handleOpenModal('post_workshop')}
            disabled={orders.length === 0}
            style={{
              padding: '10px 18px',
              borderRadius: '10px',
              border: '1px solid #fbcfe8',
              backgroundColor: '#fdf2f8',
              color: '#be185d',
              fontWeight: '700',
              fontSize: '0.88rem',
              cursor: orders.length === 0 ? 'not-allowed' : 'pointer',
              opacity: orders.length === 0 ? 0.5 : 1,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'transform 0.15s'
            }}
          >
            <span>💛</span> Email Post-Taller
          </button>
        </div>
      </div>

      <div>
        {orders.length === 0 ? (
          <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '12px', textAlign: 'center', color: '#64748b', boxShadow: 'var(--shadow-sm)' }}>
            Todavía no hay peques inscritos en esta sesión. Cuando una familia reserve plaza en <strong>/talleres</strong>, aparecerá su ficha aquí automáticamente.
          </div>
        ) : (
          orders.map((ord) => {
            let extra = {};
            try { extra = ord.shippingData ? JSON.parse(ord.shippingData) : {}; } catch {}

            const childName = extra.childName || extra.childInfo || 'Peque';
            const rawBirth = extra.childBirthDate || '';
            const parsedBirth = parseFlexibleDate(rawBirth);
            const formattedBirthDate = parsedBirth
              ? parsedBirth.toLocaleDateString('es-ES')
              : (rawBirth || 'No indicada');
            const ageBadge = formatAgeBadge(rawBirth);

            const adultName = extra.adultName || ord.user?.name || 'Familia';
            const email = extra.email || ord.user?.email || '';
            const phone = extra.phone && extra.phone !== 'No indicado' ? extra.phone : '';
            const cleanPhone = phone.replace(/\s+/g, '').replace(/^\+34/, '');
            const attended = extra.attended || null;

            return (
              <div key={ord.id} className={styles.studentCard} style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                  <div className={styles.studentInfo} style={{ flex: 1, minWidth: '280px' }}>
                    <h3 className={styles.childName}>
                      {childName}
                      {ageBadge && <span className={styles.ageBadge}>{ageBadge}</span>}
                    </h3>

                    <p style={{ color: 'var(--color-text-light)', fontSize: '0.9rem', margin: '0 0 5px 0' }}>
                      🎂 Nacimiento: {formattedBirthDate}
                    </p>

                    <p className={styles.parentInfo} style={{ marginBottom: '8px' }}>
                      👤 {adultName} {email ? <>&bull; ✉️ {email}</> : null}
                    </p>

                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '10px' }}>
                      <span style={{ fontSize: '0.75rem', background: '#e2e8f0', color: '#475569', padding: '2px 8px', borderRadius: '12px', fontWeight: '600' }}>
                        💳 Stripe ({((ord.amountTotal || 2000) / 100).toFixed(0)} €)
                      </span>
                      <span style={{ fontSize: '0.75rem', background: '#e0f2fe', color: '#0369a1', padding: '2px 8px', borderRadius: '12px', fontWeight: '600' }}>
                        🗓️ Reserva: {new Date(ord.createdAt).toLocaleDateString('es-ES')}
                      </span>
                    </div>

                    {extra.notes && (
                      <div style={{ background: '#FEFCBF', padding: '10px', borderRadius: '8px', fontSize: '0.9rem', marginTop: '10px', borderLeft: '4px solid #D69E2E' }}>
                        <strong>📝 Notas:</strong> {extra.notes}
                      </div>
                    )}

                    <div className={styles.actions} style={{ marginTop: '15px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                      {cleanPhone && (
                        <a
                          href={`https://wa.me/34${cleanPhone}?text=Hola%20${encodeURIComponent(adultName)},%20te%20escribo%20desde%20Musicabalú%20por%20el%20taller%20de%20música%20en%20familia...`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.waBtn}
                        >
                          💬 WhatsApp <span style={{ fontSize: '0.8rem', opacity: 0.85, marginLeft: '5px' }}>{phone}</span>
                        </a>
                      )}

                      <button
                        onClick={() => handleEditNotes(ord, extra.notes, childName)}
                        style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #CBD5E0', background: '#EDF2F7', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.9rem' }}
                      >
                        📝 Notas
                      </button>

                      <button
                        onClick={() => handleDeleteAttendee(ord.id, childName)}
                        disabled={isBusy}
                        style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: '#fee2e2', color: '#ef4444', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.9rem' }}
                      >
                        🗑️ Eliminar
                      </button>
                    </div>
                  </div>

                  {/* Casilla de asistencia del día del taller */}
                  <div style={{ width: '200px', minWidth: '180px', flexShrink: 0 }}>
                    <div className={styles.attendanceSection} style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '0.88rem', fontWeight: 600, marginBottom: '10px', color: '#334155' }}>
                        Asistencia al taller
                      </div>
                      <div
                        className={styles.weekBox}
                        onClick={() => toggleAttendance(ord)}
                        style={{ margin: '0 auto', width: 'fit-content' }}
                      >
                        <span className={styles.weekLabel}>Sesión</span>
                        <div className={`${styles.checkbox} ${attended === 'present' ? styles.checkboxChecked : (attended === 'absent' ? styles.checkboxAbsent : '')}`}>
                          {attended === 'present' && '✓'}
                          {attended === 'absent' && '✗'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Modal de Comunicaciones del Taller */}
      {modalType && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.55)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px',
          backdropFilter: 'blur(3px)'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '20px',
            maxWidth: '720px',
            width: '100%',
            maxHeight: '92vh',
            overflowY: 'auto',
            padding: '28px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '1.4rem' }}>
                  {modalType === 'reminder' ? '🧸' : '💛'}
                </span>
                <h2 style={{ margin: 0, fontSize: '1.25rem', color: '#1e293b', fontWeight: '800' }}>
                  {modalType === 'reminder' ? 'Recordatorio Previo al Taller' : 'Email de Agradecimiento Post-Taller'}
                </h2>
              </div>
              <button
                onClick={() => setModalType(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.4rem',
                  cursor: 'pointer',
                  color: '#64748b'
                }}
              >
                ✕
              </button>
            </div>

            <p style={{ margin: '0 0 20px 0', fontSize: '0.88rem', color: '#64748b', lineHeight: '1.5' }}>
              Este correo se enviará a las <strong>{orders.length} familias</strong> inscritas en esta sesión específica (<em>{workshop.title}</em>).
              Los datos como el nombre del adulto, del peque y la fecha se personalizan automáticamente para cada uno.
            </p>

            {loadingTemplate ? (
              <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
                Cargando plantilla personalizada...
              </div>
            ) : (
              <div>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontWeight: '700', fontSize: '0.9rem', color: '#334155', marginBottom: '6px' }}>
                    Asunto del correo:
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '10px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.95rem',
                      fontFamily: 'inherit'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontWeight: '700', fontSize: '0.9rem', color: '#334155', marginBottom: '6px' }}>
                    Mensaje (puedes editarlo o dejarlo tal cual):
                  </label>
                  <textarea
                    rows={13}
                    value={bodyText}
                    onChange={(e) => setBodyText(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '10px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.92rem',
                      fontFamily: 'inherit',
                      lineHeight: '1.55',
                      resize: 'vertical'
                    }}
                  />
                  <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '6px' }}>
                    💡 Los marcadores <code>[Nombre Madre/Padre]</code>, <code>[Nombre del peque]</code> y <code>[Email]</code> se rellenarán con los datos reales de cada familia.
                  </div>
                </div>

                {commsFeedback && (
                  <div style={{
                    padding: '12px 16px',
                    borderRadius: '10px',
                    marginBottom: '16px',
                    backgroundColor: commsFeedback.type === 'success' ? '#dcfce7' : '#fee2e2',
                    color: commsFeedback.type === 'success' ? '#166534' : '#991b1b',
                    fontWeight: '600',
                    fontSize: '0.9rem'
                  }}>
                    {commsFeedback.text}
                  </div>
                )}

                {/* Zona de prueba */}
                <div style={{
                  backgroundColor: '#f8fafc',
                  padding: '14px 16px',
                  borderRadius: '12px',
                  border: '1px dashed #cbd5e1',
                  marginBottom: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '10px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: '240px' }}>
                    <span style={{ fontSize: '0.85rem', color: '#475569', fontWeight: '600' }}>Prueba a:</span>
                    <input
                      type="email"
                      value={testEmail}
                      onChange={(e) => setTestEmail(e.target.value)}
                      style={{
                        padding: '6px 10px',
                        borderRadius: '6px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.85rem',
                        flex: 1
                      }}
                    />
                  </div>
                  <button
                    onClick={() => handleSendComms(true)}
                    disabled={sendingComms}
                    style={{
                      padding: '8px 14px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      backgroundColor: 'white',
                      color: '#334155',
                      fontWeight: '700',
                      fontSize: '0.82rem',
                      cursor: 'pointer'
                    }}
                  >
                    {sendingComms ? 'Enviando...' : '📨 Enviar prueba a mi correo'}
                  </button>
                </div>

                {/* Acciones principales */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                  <button
                    onClick={() => setModalType(null)}
                    disabled={sendingComms}
                    style={{
                      padding: '10px 18px',
                      borderRadius: '10px',
                      border: '1px solid #cbd5e1',
                      backgroundColor: 'white',
                      color: '#64748b',
                      fontWeight: '700',
                      cursor: 'pointer'
                    }}
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => handleSendComms(false)}
                    disabled={sendingComms || orders.length === 0}
                    style={{
                      padding: '10px 22px',
                      borderRadius: '10px',
                      border: 'none',
                      backgroundColor: modalType === 'reminder' ? '#c2410c' : '#be185d',
                      color: 'white',
                      fontWeight: '800',
                      cursor: sendingComms || orders.length === 0 ? 'not-allowed' : 'pointer',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.12)'
                    }}
                  >
                    {sendingComms
                      ? 'Enviando correos...'
                      : `🚀 Enviar a las ${orders.length} familias`}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
