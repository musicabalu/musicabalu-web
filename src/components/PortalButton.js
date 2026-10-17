'use client';

import { useState } from 'react';

export default function PortalButton() {
  const [loading, setLoading] = useState(false);

  const handlePortal = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetch('/api/portal', { method: 'POST' });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else if (data.error) {
        alert(data.error);
        setLoading(false);
      }
    } catch (e) {
      alert('Error al acceder al portal de facturación');
      setLoading(false);
    }
  };

  return (
    <div onClick={handlePortal} style={{ cursor: loading ? 'wait' : 'pointer', textDecoration: 'none' }}>
      <section style={{ backgroundColor: "white", padding: "28px", borderRadius: "16px", boxShadow: "var(--shadow-md)", borderLeft: "4px solid var(--color-cyan)", height: '100%', transition: 'transform 0.2s', opacity: loading ? 0.7 : 1 }} className="hover-lift">
        <h2 style={{ fontSize: "1.25rem", margin: 0, display: "flex", alignItems: "center", gap: "10px", color: "var(--color-dark)" }}>
          ⚙️ Mi Suscripción
        </h2>
        <p style={{ color: "var(--color-text-light)", marginTop: "12px", fontSize: "0.9rem", lineHeight: "1.5" }}>
          {loading ? 'Conectando con Stripe...' : 'Gestiona tu plan, método de pago, facturas o cancelación.'}
        </p>
      </section>
    </div>
  );
}
