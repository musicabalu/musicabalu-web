'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ProyectosAdminPage() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  
  // Form states for creating/editing
  const [editTitle, setEditTitle] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [editContent, setEditContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await fetch('/api/admin/notes');
      const data = await res.json();
      if (data.success) {
        setNotes(data.notes);
      }
    } catch (error) {
      console.error('Error fetching notes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNew = () => {
    setIsCreating(true);
    setEditTitle('Nuevo Proyecto');
    setEditCategory('General');
    setEditContent('');
    setExpandedId('new');
    setEditingId('new');
  };

  const handleEdit = (note) => {
    setEditingId(note.id);
    setEditTitle(note.title);
    setEditCategory(note.category);
    setEditContent(note.content);
  };

  const handleCancelEdit = () => {
    if (editingId === 'new') {
      setIsCreating(false);
      setExpandedId(null);
    }
    setEditingId(null);
  };

  const handleSave = async (id) => {
    setIsSaving(true);
    try {
      if (id === 'new') {
        const res = await fetch('/api/admin/notes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: editTitle, category: editCategory, content: editContent })
        });
        const data = await res.json();
        if (data.success) {
          setNotes([data.note, ...notes]);
          setIsCreating(false);
          setEditingId(null);
          setExpandedId(data.note.id);
        }
      } else {
        const res = await fetch('/api/admin/notes', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id, title: editTitle, category: editCategory, content: editContent })
        });
        if (res.ok) {
          const updated = notes.map(n => n.id === id ? { ...n, title: editTitle, category: editCategory, content: editContent } : n);
          setNotes(updated);
          setEditingId(null);
        }
      }
    } catch (error) {
      console.error('Error saving note:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Seguro que quieres borrar este documento? Esta acción no se puede deshacer.')) return;
    try {
      const res = await fetch(`/api/admin/notes?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setNotes(notes.filter(n => n.id !== id));
        if (expandedId === id) setExpandedId(null);
      }
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const toggleExpand = (id) => {
    if (editingId && editingId !== id) return; // Prevent collapse while editing another
    if (expandedId === id) {
      setExpandedId(null);
      setEditingId(null);
    } else {
      setExpandedId(id);
    }
  };

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Cargando documentos...</div>;

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem 1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ color: 'var(--color-pink)', marginBottom: '0.5rem' }}>Laboratorio de Proyectos</h1>
          <p style={{ color: 'var(--color-dark)', marginBottom: '1.5rem' }}>
            Tu cuaderno de bitácora centralizado. Estrategia, ideas y documentos vivos.
          </p>
          <Link href="/admin" style={{ display: 'inline-flex', alignItems: 'center', color: '#718096', textDecoration: 'none', fontWeight: '500', fontSize: '0.9rem' }}>
            <span style={{ marginRight: '8px' }}>←</span> Volver a Panel de Control
          </Link>
        </div>
        <button 
          onClick={handleCreateNew}
          disabled={isCreating || editingId !== null}
          style={{ padding: '10px 20px', backgroundColor: 'var(--color-pink)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: (isCreating || editingId) ? 'not-allowed' : 'pointer', opacity: (isCreating || editingId) ? 0.5 : 1 }}
        >
          + Nuevo Proyecto
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {isCreating && (
          <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '2px solid var(--color-cyan)', overflow: 'hidden' }}>
            <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--color-border)', backgroundColor: '#fafafa' }}>
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                <input 
                  type="text" 
                  value={editTitle} 
                  onChange={e => setEditTitle(e.target.value)} 
                  placeholder="Título del proyecto..."
                  style={{ flex: 1, padding: '8px 12px', fontSize: '1.1rem', borderRadius: '6px', border: '1px solid #ccc' }}
                />
                <select 
                  value={editCategory} 
                  onChange={e => setEditCategory(e.target.value)}
                  style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #ccc', backgroundColor: 'white' }}
                >
                  <option value="General">General</option>
                  <option value="Estrategia">Estrategia</option>
                  <option value="Editorial">Editorial</option>
                  <option value="Tienda">Tienda</option>
                  <option value="Contenido">Contenido</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Formaciones">Formaciones</option>
                  <option value="Legal">Legal</option>
                </select>
              </div>
              <textarea 
                value={editContent}
                onChange={e => setEditContent(e.target.value)}
                placeholder="Escribe aquí tu análisis, checklist o estrategia..."
                style={{ width: '100%', minHeight: '300px', padding: '1rem', fontSize: '1.05rem', lineHeight: '1.6', borderRadius: '6px', border: '1px solid #ccc', fontFamily: 'inherit', resize: 'vertical' }}
              />
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                <button onClick={handleCancelEdit} style={{ padding: '8px 16px', borderRadius: '6px', border: '1px solid #ccc', background: '#f1f1f1', cursor: 'pointer', fontWeight: 'bold' }}>Cancelar</button>
                <button onClick={() => handleSave('new')} disabled={isSaving || !editTitle} style={{ padding: '8px 16px', borderRadius: '6px', border: 'none', background: 'var(--color-cyan)', color: 'white', cursor: 'pointer', fontWeight: 'bold' }}>
                  {isSaving ? 'Guardando...' : '💾 Crear Proyecto'}
                </button>
              </div>
            </div>
          </div>
        )}

        {notes.map(note => (
          <div key={note.id} style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid var(--color-border)', overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', padding: '1.2rem 1.5rem' }}>
              <div style={{ flex: 1, cursor: editingId ? 'default' : 'pointer' }} onClick={() => toggleExpand(note.id)}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--color-dark)' }}>{note.title}</h3>
                  <span style={{ fontSize: '0.75rem', padding: '3px 8px', backgroundColor: 'var(--color-bg)', borderRadius: '12px', fontWeight: '600', color: '#666' }}>
                    {note.category}
                  </span>
                </div>
                <p style={{ margin: '5px 0 0 0', fontSize: '0.85rem', color: '#888' }}>Última edición: {new Date(note.updatedAt).toLocaleDateString('es-ES')}</p>
              </div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <button 
                  onClick={() => toggleExpand(note.id)}
                  style={{ padding: '8px 12px', backgroundColor: 'transparent', border: '1px solid var(--color-pink)', color: 'var(--color-pink)', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  {expandedId === note.id ? 'Cerrar' : 'Ver Documento'}
                </button>
              </div>
            </div>

            {expandedId === note.id && (
              <div style={{ padding: '1.5rem', borderTop: '1px solid var(--color-border)', backgroundColor: '#fafafa' }}>
                {editingId === note.id ? (
                  <div>
                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                      <input 
                        type="text" 
                        value={editTitle} 
                        onChange={e => setEditTitle(e.target.value)} 
                        style={{ flex: 1, padding: '8px 12px', fontSize: '1.1rem', borderRadius: '6px', border: '1px solid #ccc' }}
                      />
                      <select 
                        value={editCategory} 
                        onChange={e => setEditCategory(e.target.value)}
                        style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #ccc', backgroundColor: 'white' }}
                      >
                        <option value="General">General</option>
                        <option value="Estrategia">Estrategia</option>
                        <option value="Editorial">Editorial</option>
                        <option value="Tienda">Tienda</option>
                        <option value="Contenido">Contenido</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Formaciones">Formaciones</option>
                        <option value="Legal">Legal</option>
                      </select>
                    </div>
                    <textarea 
                      value={editContent}
                      onChange={e => setEditContent(e.target.value)}
                      style={{ width: '100%', minHeight: '400px', padding: '1rem', fontSize: '1.05rem', lineHeight: '1.6', borderRadius: '6px', border: '2px solid var(--color-cyan)', fontFamily: 'inherit', resize: 'vertical' }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                      <button onClick={() => handleDelete(note.id)} style={{ padding: '8px 12px', color: '#e53e3e', background: 'transparent', border: '1px solid #e53e3e', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>🗑️ Borrar</button>
                      <div style={{ display: 'flex', gap: '1rem' }}>
                        <button onClick={handleCancelEdit} disabled={isSaving} style={{ padding: '8px 16px', borderRadius: '6px', border: '1px solid #ccc', background: '#f1f1f1', cursor: 'pointer', fontWeight: 'bold' }}>Cancelar</button>
                        <button onClick={() => handleSave(note.id)} disabled={isSaving || !editTitle} style={{ padding: '8px 16px', borderRadius: '6px', border: 'none', background: 'var(--color-cyan)', color: 'white', cursor: 'pointer', fontWeight: 'bold' }}>
                          {isSaving ? 'Guardando...' : '💾 Guardar Cambios'}
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
                      <button 
                        onClick={() => handleEdit(note)}
                        style={{ padding: '6px 12px', fontSize: '0.85rem', backgroundColor: 'transparent', border: '1px solid var(--color-cyan)', color: 'var(--color-cyan)', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}
                      >
                        ✏️ Editar
                      </button>
                    </div>
                    <div 
                      className="markdown-content"
                      style={{ 
                        fontSize: '1.05rem', 
                        lineHeight: '1.7',
                        backgroundColor: 'white',
                        padding: '1.5rem',
                        borderRadius: '8px',
                        border: '1px dashed var(--color-cyan)',
                        whiteSpace: 'normal'
                      }} 
                      dangerouslySetInnerHTML={{ __html: note.content }} 
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
        {notes.length === 0 && !isCreating && (
          <div style={{ textAlign: 'center', padding: '3rem', backgroundColor: 'white', borderRadius: '12px', border: '1px dashed #ccc' }}>
            <h3 style={{ color: '#888', margin: 0 }}>No tienes ningún proyecto guardado aún</h3>
            <p style={{ color: '#aaa' }}>Crea tu primer documento para empezar a organizar tus ideas.</p>
          </div>
        )}
      </div>
    </div>
  );
}
