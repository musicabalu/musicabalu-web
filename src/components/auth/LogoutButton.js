'use client';

import { signOut } from 'next-auth/react';

export default function LogoutButton() {
  return (
    <button 
      onClick={() => {
        if (window.confirm('¿Estás seguro de que quieres cerrar sesión?\n\nLa próxima vez que quieras entrar, el sistema te pedirá tu email y te enviará un nuevo enlace mágico de acceso (por seguridad).')) {
          signOut({ callbackUrl: '/login' });
        }
      }}
      style={{
        background: '#FFF0F2',
        border: '1px solid #FFE4E6',
        padding: '6px 12px',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '0.85rem',
        marginTop: '10px',
        color: '#E11D48',
        fontWeight: '600',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        transition: 'all 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.target.style.background = '#FFE4E6';
        e.target.style.transform = 'translateY(-1px)';
      }}
      onMouseLeave={(e) => {
        e.target.style.background = '#FFF0F2';
        e.target.style.transform = 'translateY(0)';
      }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
        <polyline points="16 17 21 12 16 7"></polyline>
        <line x1="21" y1="12" x2="9" y2="12"></line>
      </svg>
      Cerrar sesión
    </button>
  );
}
