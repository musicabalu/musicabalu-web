'use client';

import { useState } from 'react';

export default function CleanupButton() {
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [result, setResult] = useState(null);

  const handleCleanup = async () => {
    if (!window.confirm('¿Estás seguro de que quieres realizar la limpieza trimestral? Esta acción borrará carritos pendientes de hace más de 30 días.')) {
      return;
    }

    setStatus('loading');
    try {
      const res = await fetch('/api/admin/cleanup', {
        method: 'POST',
      });
      const data = await res.json();
      
      if (data.success) {
        setResult(data.stats);
        setStatus('success');
      } else {
        alert(data.error || 'Error desconocido');
        setStatus('error');
      }
    } catch (error) {
      console.error(error);
      alert('Error de conexión');
      setStatus('error');
    }
  };

  return (
    <div style={{ marginTop: '1.5rem' }}>
      <button 
        onClick={handleCleanup}
        disabled={status === 'loading'}
        style={{
          background: status === 'loading' ? '#CBD5E0' : '#E11D48',
          color: 'white',
          border: 'none',
          padding: '10px 16px',
          borderRadius: '8px',
          fontWeight: 'bold',
          cursor: status === 'loading' ? 'not-allowed' : 'pointer',
          transition: 'background 0.2s',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        {status === 'loading' ? '⏳ Limpiando...' : '🧹 Ejecutar Limpieza'}
      </button>

      {status === 'success' && result && (
        <div style={{ marginTop: '1rem', padding: '12px', background: '#F0FFF4', border: '1px solid #C6F6D5', borderRadius: '8px', color: '#2F855A', fontSize: '0.85rem' }}>
          <strong>¡Limpieza completada!</strong> Se han eliminado:
          <ul style={{ margin: '8px 0 0 0', paddingLeft: '20px' }}>
            <li>{result.ordersDeleted} carritos abandonados antiguos</li>
            <li>{result.usersDeleted} usuarios fantasma sin verificar</li>
            <li>{result.sessionsDeleted} sesiones web caducadas</li>
            <li>{result.tokensDeleted} tokens de acceso caducados</li>
          </ul>
        </div>
      )}
    </div>
  );
}
