import Link from 'next/link';
import React from 'react';

export const metadata = {
  title: 'Tabla de Precios y Cuotas - Musicabalú',
};

export default function PreciosPage() {
  return (
    <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
      <Link href="/admin" style={{ display: 'inline-flex', alignItems: 'center', color: '#718096', textDecoration: 'none', marginBottom: '1.5rem', fontWeight: '500', fontSize: '0.9rem' }}>
        <span style={{ marginRight: '8px' }}>←</span> Volver a Panel de Control
      </Link>
      
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ color: '#2d3748', margin: '0 0 0.5rem 0', fontSize: '2rem' }}>Tabla de Precios y Cuotas (2026/2027)</h1>
        <p style={{ color: '#718096', margin: 0, fontSize: '1.1rem' }}>Resumen de las tarifas exactas para cobrar en Stripe y Efectivo.</p>
      </header>

      {/* Matrícula */}
      <div style={{ backgroundColor: '#f7fafc', padding: '1.5rem', borderRadius: '12px', borderLeft: '6px solid var(--color-cyan)', marginBottom: '2rem' }}>
        <h2 style={{ margin: '0 0 0.5rem 0', color: '#2b6cb0' }}>Matrícula Inicial (Fija)</h2>
        <p style={{ color: '#4a5568', margin: 0, fontSize: '1.2rem', fontWeight: 'bold' }}>25,00 € por alumno</p>
        <p style={{ color: '#718096', fontSize: '0.9rem', marginTop: '0.5rem' }}>* No aplica ningún descuento, todos pagan lo mismo.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        
        {/* ALUMNOS EMPI */}
        <div style={{ border: '1px solid #edf2f7', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
          <h2 style={{ color: '#805ad5', borderBottom: '2px solid #e9d8fd', paddingBottom: '0.5rem', marginBottom: '1rem' }}>🟣 Alumnos EMPI</h2>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#4a5568' }}>Un solo hij@ (Precio Normal)</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem', backgroundColor: '#faf5ff', borderRadius: '8px', marginBottom: '4px' }}>
              <span>Mensual</span><strong>45,00 €</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem', backgroundColor: '#faf5ff', borderRadius: '8px' }}>
              <span>Trimestral</span><strong>117,00 €</strong>
            </div>
          </div>

          <div>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#d53f8c' }}>Dos Hermanos (Con descuento a ambos)</h3>
            <p style={{ fontSize: '0.8rem', color: '#718096', marginBottom: '0.5rem' }}>Mensual (-15%) | Trimestral (-10%)</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem', backgroundColor: '#fff5f7', borderRadius: '8px', marginBottom: '4px' }}>
              <span>Mensual por alumno (38,25€)</span><strong style={{ color: '#d53f8c' }}>Total: 76,50 €</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem', backgroundColor: '#fff5f7', borderRadius: '8px' }}>
              <span>Trimestral por alumno (105,30€)</span><strong style={{ color: '#d53f8c' }}>Total: 210,60 €</strong>
            </div>
          </div>
        </div>

        {/* ALUMNOS NO EMPI */}
        <div style={{ border: '1px solid #edf2f7', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
          <h2 style={{ color: '#dd6b20', borderBottom: '2px solid #feebc8', paddingBottom: '0.5rem', marginBottom: '1rem' }}>🟠 Alumnos Externos (No EMPI)</h2>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#4a5568' }}>Un solo hij@ (Precio Normal)</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem', backgroundColor: '#fffaf0', borderRadius: '8px', marginBottom: '4px' }}>
              <span>Mensual</span><strong>50,00 €</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem', backgroundColor: '#fffaf0', borderRadius: '8px' }}>
              <span>Trimestral</span><strong>132,00 €</strong>
            </div>
          </div>

          <div>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#d53f8c' }}>Dos Hermanos (Con descuento a ambos)</h3>
            <p style={{ fontSize: '0.8rem', color: '#718096', marginBottom: '0.5rem' }}>Mensual (-15%) | Trimestral (-10%)</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem', backgroundColor: '#fff5f7', borderRadius: '8px', marginBottom: '4px' }}>
              <span>Mensual por alumno (42,50€)</span><strong style={{ color: '#d53f8c' }}>Total: 85,00 €</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem', backgroundColor: '#fff5f7', borderRadius: '8px' }}>
              <span>Trimestral por alumno (118,80€)</span><strong style={{ color: '#d53f8c' }}>Total: 237,60 €</strong>
            </div>
          </div>
        </div>

      </div>

      <div style={{ marginTop: '3rem', padding: '1.5rem', backgroundColor: '#ebf8ff', borderRadius: '12px', color: '#2b6cb0' }}>
        <h4 style={{ margin: '0 0 0.5rem 0' }}>💡 Tip para cobrar en Stripe:</h4>
        <p style={{ margin: 0, lineHeight: 1.5 }}>
          Cuando entres en Stripe para crear la suscripción, busca al cliente y selecciona el producto de la cuota elegida. Si la familia tiene dos niños, la forma más rápida y limpia es <strong>asegurarte de seleccionar 2 cantidades (Qty 2)</strong> y aplicarle un cupón de descuento general (que tendrás que tener creado en Stripe por el 15% mensual o 10% trimestral) o simplemente usar los productos específicos con el precio rebajado ya asignado por unidad.
        </p>
      </div>

    </div>
  );
}
