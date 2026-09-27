'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function WaitlistPage() {
  const [waitlist, setWaitlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);
  
  const [formData, setFormData] = useState({
    childName: '',
    childBirthDate: '',
    parentName: '',
    contact: '',
    desiredGroups: '',
    notes: '',
    status: 'pending'
  });

  useEffect(() => {
    fetchWaitlist();
  }, []);

  const fetchWaitlist = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/waitlist');
      if (res.ok) {
        const data = await res.json();
        setWaitlist(data);
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openNewModal = () => {
    setEditingEntry(null);
    setFormData({
      childName: '',
      childBirthDate: '',
      parentName: '',
      contact: '',
      desiredGroups: '',
      notes: '',
      status: 'pending'
    });
    setIsModalOpen(true);
  };

  const openEditModal = (entry) => {
    setEditingEntry(entry);
    setFormData({
      childName: entry.childName,
      childBirthDate: entry.childBirthDate || '',
      parentName: entry.parentName,
      contact: entry.contact,
      desiredGroups: entry.desiredGroups,
      notes: entry.notes || '',
      status: entry.status
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingEntry) {
        const res = await fetch('/api/waitlist', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingEntry.id, ...formData })
        });
        if (res.ok) {
          fetchWaitlist();
          setIsModalOpen(false);
        }
      } else {
        const res = await fetch('/api/waitlist', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        if (res.ok) {
          fetchWaitlist();
          setIsModalOpen(false);
        }
      }
    } catch (error) {
      console.error("Error saving entry", error);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("¿Estás seguro de que deseas borrar a esta familia de la lista de espera?")) {
      try {
        const res = await fetch(`/api/waitlist?id=${id}`, { method: 'DELETE' });
        if (res.ok) {
          fetchWaitlist();
        }
      } catch (error) {
        console.error("Error deleting entry", error);
      }
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'pending': return <span style={{ backgroundColor: '#fef3c7', color: '#d97706', padding: '4px 8px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 'bold' }}>Pendiente</span>;
      case 'contacted': return <span style={{ backgroundColor: '#e0e7ff', color: '#4338ca', padding: '4px 8px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 'bold' }}>Contactado</span>;
      case 'enrolled': return <span style={{ backgroundColor: '#dcfce7', color: '#15803d', padding: '4px 8px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 'bold' }}>Matriculado</span>;
      case 'rejected': return <span style={{ backgroundColor: '#fee2e2', color: '#b91c1c', padding: '4px 8px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 'bold' }}>Descartado</span>;
      default: return null;
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px 40px 20px' }}>
      <Link href="/admin" style={{ display: 'inline-flex', alignItems: 'center', color: '#718096', textDecoration: 'none', marginBottom: '1.5rem', fontWeight: '500', fontSize: '0.9rem' }}>
        <span style={{ marginRight: '8px' }}>←</span> Volver a Panel de Control
      </Link>
      
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', color: 'var(--color-dark)', margin: '0 0 10px 0', fontFamily: 'var(--font-heading)' }}>
            Lista de Espera
          </h1>
          <p style={{ color: '#718096', margin: 0 }}>
            Gestiona las familias interesadas en grupos completos.
          </p>
        </div>
        <button 
          onClick={openNewModal}
          style={{ backgroundColor: 'var(--color-cyan)', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
        >
          + Añadir a la lista
        </button>
      </header>

      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#718096' }}>Cargando lista de espera...</div>
      ) : waitlist.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px', backgroundColor: 'white', borderRadius: '16px', border: '1px dashed #cbd5e1' }}>
          <span style={{ fontSize: '3rem' }}>📋</span>
          <p style={{ color: '#64748b', marginTop: '16px', fontSize: '1.1rem' }}>No hay nadie en la lista de espera actualmente.</p>
        </div>
      ) : (
        <div style={{ backgroundColor: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
              <tr>
                <th style={{ padding: '16px', textAlign: 'left', color: '#475569', fontWeight: '600', fontSize: '0.9rem' }}>Peque</th>
                <th style={{ padding: '16px', textAlign: 'left', color: '#475569', fontWeight: '600', fontSize: '0.9rem' }}>Familiar</th>
                <th style={{ padding: '16px', textAlign: 'left', color: '#475569', fontWeight: '600', fontSize: '0.9rem' }}>Contacto</th>
                <th style={{ padding: '16px', textAlign: 'left', color: '#475569', fontWeight: '600', fontSize: '0.9rem' }}>Grupo(s) deseado(s)</th>
                <th style={{ padding: '16px', textAlign: 'left', color: '#475569', fontWeight: '600', fontSize: '0.9rem' }}>Estado</th>
                <th style={{ padding: '16px', textAlign: 'right', color: '#475569', fontWeight: '600', fontSize: '0.9rem' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {waitlist.map((entry) => (
                <tr key={entry.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '16px', fontWeight: '500', color: 'var(--color-dark)' }}>
                    {entry.childName} 
                    {entry.childBirthDate && <span style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block', marginTop: '4px' }}>F.Nac: {entry.childBirthDate}</span>}
                  </td>
                  <td style={{ padding: '16px', color: '#475569' }}>{entry.parentName}</td>
                  <td style={{ padding: '16px', color: '#475569' }}>{entry.contact}</td>
                  <td style={{ padding: '16px', color: '#475569' }}>{entry.desiredGroups}</td>
                  <td style={{ padding: '16px' }}>{getStatusBadge(entry.status)}</td>
                  <td style={{ padding: '16px', textAlign: 'right' }}>
                    <button onClick={() => openEditModal(entry)} style={{ background: 'none', border: 'none', color: '#3b82f6', cursor: 'pointer', marginRight: '16px', fontWeight: '500' }}>Editar</button>
                    <button onClick={() => handleDelete(entry.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontWeight: '500' }}>Borrar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '16px', width: '100%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto' }}>
            <h2 style={{ margin: '0 0 24px 0', color: 'var(--color-dark)' }}>
              {editingEntry ? 'Editar Lista de Espera' : 'Añadir a la Lista de Espera'}
            </h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: '#475569', fontWeight: '500', fontSize: '0.9rem' }}>Nombre del peque *</label>
                <input type="text" name="childName" value={formData.childName} onChange={handleInputChange} required style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: '#475569', fontWeight: '500', fontSize: '0.9rem' }}>Fecha de Nacimiento del peque</label>
                <input type="date" name="childBirthDate" value={formData.childBirthDate} onChange={handleInputChange} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', backgroundColor: 'white' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: '#475569', fontWeight: '500', fontSize: '0.9rem' }}>Nombre del padre/madre *</label>
                <input type="text" name="parentName" value={formData.parentName} onChange={handleInputChange} required style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: '#475569', fontWeight: '500', fontSize: '0.9rem' }}>Contacto (Teléfono o Email) *</label>
                <input type="text" name="contact" value={formData.contact} onChange={handleInputChange} required style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: '#475569', fontWeight: '500', fontSize: '0.9rem' }}>Grupo(s) deseado(s) *</label>
                <input type="text" name="desiredGroups" value={formData.desiredGroups} onChange={handleInputChange} required placeholder="Ej: Lunes 17:30 o Bebés Jueves" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: '#475569', fontWeight: '500', fontSize: '0.9rem' }}>Estado</label>
                <select name="status" value={formData.status} onChange={handleInputChange} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', backgroundColor: 'white' }}>
                  <option value="pending">Pendiente</option>
                  <option value="contacted">Contactado</option>
                  <option value="enrolled">Matriculado</option>
                  <option value="rejected">Descartado (No le interesa)</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: '#475569', fontWeight: '500', fontSize: '0.9rem' }}>Notas (Opcional)</label>
                <textarea name="notes" value={formData.notes} onChange={handleInputChange} rows="3" placeholder="Ej: Prefieren horario de tarde, hermano de un alumno..." style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', resize: 'vertical' }} />
              </div>
              <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ flex: 1, padding: '12px', backgroundColor: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>Cancelar</button>
                <button type="submit" style={{ flex: 1, padding: '12px', backgroundColor: 'var(--color-cyan)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
