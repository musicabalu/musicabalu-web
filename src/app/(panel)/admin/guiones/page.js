'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function GuionesAdminPage() {
  const [scripts, setScripts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [expandedId, setExpandedId] = useState(null);
  const [draggedIndex, setDraggedIndex] = useState(null);

  useEffect(() => {
    fetchScripts();
  }, []);

  const fetchScripts = async () => {
    try {
      const res = await fetch('/api/admin/scripts');
      const data = await res.json();
      if (data.success) {
        setScripts(data.scripts);
      }
    } catch (error) {
      console.error('Error fetching scripts:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    const updated = scripts.map(s => s.id === id ? { ...s, status: newStatus } : s);
    setScripts(updated);
    
    try {
      await fetch('/api/admin/scripts', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus })
      });
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const moveUp = async (index) => {
    if (index === 0) return;
    const newScripts = [...scripts];
    const temp = newScripts[index];
    newScripts[index] = newScripts[index - 1];
    newScripts[index - 1] = temp;
    
    // Update local order values
    newScripts.forEach((s, i) => s.order = i);
    setScripts(newScripts);
    saveOrder(newScripts);
  };

  const moveDown = async (index) => {
    if (index === scripts.length - 1) return;
    const newScripts = [...scripts];
    const temp = newScripts[index];
    newScripts[index] = newScripts[index + 1];
    newScripts[index + 1] = temp;
    
    // Update local order values
    newScripts.forEach((s, i) => s.order = i);
    setScripts(newScripts);
    saveOrder(newScripts);
  };

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    
    const newScripts = [...scripts];
    const item = newScripts.splice(draggedIndex, 1)[0];
    newScripts.splice(index, 0, item);
    
    newScripts.forEach((s, i) => s.order = i);
    setScripts(newScripts);
    saveOrder(newScripts);
    setDraggedIndex(null);
  };

  const saveOrder = async (currentScripts) => {
    setSaving(true);
    const reorderData = currentScripts.map(s => ({ id: s.id, order: s.order }));
    try {
      await fetch('/api/admin/scripts', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reorder: reorderData })
      });
    } catch (error) {
      console.error('Error saving order:', error);
    } finally {
      setSaving(false);
    }
  };

  const toggleExpand = (id) => {
    if (expandedId === id) setExpandedId(null);
    else setExpandedId(id);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Grabada': return 'var(--color-green)';
      case 'Próxima': return 'var(--color-cyan)';
      default: return 'var(--color-dark)';
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <p>Cargando guiones...</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem 1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ color: 'var(--color-pink)', marginBottom: '0.5rem' }}>Píldoras y Guiones</h1>
          <p style={{ color: 'var(--color-dark)', marginBottom: '1.5rem' }}>
            Arrastra o usa las flechas para ordenar tus grabaciones.
            {saving && <span style={{ color: 'var(--color-cyan)', marginLeft: '1rem', fontSize: '0.9rem' }}>Guardando orden...</span>}
          </p>
          <Link href="/admin" style={{ display: 'inline-flex', alignItems: 'center', color: '#718096', textDecoration: 'none', fontWeight: '500', fontSize: '0.9rem' }}>
            <span style={{ marginRight: '8px' }}>←</span> Volver a Panel de Control
          </Link>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
            <span style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: 'var(--color-green)' }}></span> Grabada
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
            <span style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: 'var(--color-cyan)' }}></span> Próxima
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
            <span style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: 'var(--color-dark)' }}></span> Pendiente
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {scripts.map((script, index) => (
          <div 
            key={script.id} 
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
            style={{ 
              backgroundColor: 'white', 
              borderRadius: '12px',
              border: '1px solid var(--color-border)',
              borderLeft: `6px solid ${getStatusColor(script.status)}`,
              overflow: 'hidden',
              cursor: 'grab',
              opacity: draggedIndex === index ? 0.5 : 1
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', padding: '1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', marginRight: '1rem' }}>
                <button 
                  onClick={() => moveUp(index)}
                  disabled={index === 0}
                  style={{ background: 'none', border: 'none', cursor: index === 0 ? 'not-allowed' : 'pointer', color: index === 0 ? '#ccc' : 'var(--color-pink)', fontSize: '1.2rem', padding: '0 5px' }}
                >
                  ▲
                </button>
                <button 
                  onClick={() => moveDown(index)}
                  disabled={index === scripts.length - 1}
                  style={{ background: 'none', border: 'none', cursor: index === scripts.length - 1 ? 'not-allowed' : 'pointer', color: index === scripts.length - 1 ? '#ccc' : 'var(--color-pink)', fontSize: '1.2rem', padding: '0 5px' }}
                >
                  ▼
                </button>
              </div>

              <div style={{ flex: 1, cursor: 'pointer' }} onClick={() => toggleExpand(script.id)}>
                <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--color-dark)' }}>
                  {index + 1}. {script.title.replace('🎬 ', '').replace(/^(?:Píldora|Pildora)\s*\d+[\.\-\:]?\s*/i, '')}
                </h3>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <select 
                  value={script.status}
                  onChange={(e) => updateStatus(script.id, e.target.value)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid var(--color-border)',
                    backgroundColor: 'var(--color-bg)',
                    fontFamily: 'inherit',
                    fontWeight: 600,
                    color: getStatusColor(script.status)
                  }}
                >
                  <option value="Pendiente">Pendiente</option>
                  <option value="Próxima">Próxima</option>
                  <option value="Grabada">Grabada</option>
                </select>

                <button 
                  onClick={() => toggleExpand(script.id)}
                  className="btn btn-pink-outline"
                  style={{ padding: '8px 12px' }}
                >
                  {expandedId === script.id ? 'Cerrar' : 'Leer Guion'}
                </button>
              </div>
            </div>

            {expandedId === script.id && (
              <div style={{ padding: '0 1.5rem 1.5rem 4rem', borderTop: '1px solid var(--color-border)', backgroundColor: '#fafafa' }}>
                {script.theoryContent && (
                  <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: 'var(--color-yellow-light)', borderRadius: '8px' }}>
                    <h4 style={{ color: '#8B6914', margin: '0 0 10px 0' }}>Base Teórica</h4>
                    <div style={{ fontSize: '0.95rem' }} dangerouslySetInnerHTML={{ __html: script.theoryContent }} />
                  </div>
                )}
                
                <div style={{ marginTop: '1.5rem' }}>
                  <h4 style={{ color: 'var(--color-cyan)', margin: '0 0 10px 0' }}>Guion de Grabación</h4>
                  <div 
                    style={{ 
                      fontSize: '1.1rem', 
                      lineHeight: '1.8',
                      backgroundColor: 'white',
                      padding: '1.5rem',
                      borderRadius: '8px',
                      border: '1px dashed var(--color-cyan)'
                    }} 
                    dangerouslySetInnerHTML={{ __html: script.scriptContent }} 
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
