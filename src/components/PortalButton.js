'use client';

export default function PortalButton() {
  const handlePortal = async () => {
    try {
      const res = await fetch('/api/portal', { method: 'POST' });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else if (data.error) {
        alert(data.error);
      }
    } catch (e) {
      alert('Error al acceder al portal de facturación');
    }
  };

  return (
    <div onClick={handlePortal} style={{ cursor: 'pointer', textDecoration: 'none' }}>
      <section style={{ backgroundColor: "white", padding: "28px", borderRadius: "16px", boxShadow: "var(--shadow-md)", borderLeft: "4px solid var(--color-text-light)", height: '100%', transition: 'transform 0.2s' }} className="hover-lift">
        <h2 style={{ fontSize: "1.25rem", margin: 0, display: "flex", alignItems: "center", gap: "10px", color: "var(--color-dark)" }}>
          ⚙️ Mi Cuenta
        </h2>
        <p style={{ color: "var(--color-text-light)", marginTop: "12px", fontSize: "0.9rem", lineHeight: "1.5" }}>
          Gestiona tu método de pago y tus suscripciones en Stripe.
        </p>
      </section>
    </div>
  );
}
