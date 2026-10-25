import Link from 'next/link';
import React from 'react';

export const metadata = {
  title: 'Guía Fiscal e IVA (Trimestres y Asesoría) - Musicabalú',
};

export default function FiscalidadPage() {
  return (
    <div style={{ backgroundColor: 'white', padding: '2.5rem', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', maxWidth: '1100px', margin: '0 auto' }}>
      
      {/* Volver */}
      <Link href="/admin" style={{ display: 'inline-flex', alignItems: 'center', color: '#718096', textDecoration: 'none', marginBottom: '1.5rem', fontWeight: '500', fontSize: '0.9rem' }}>
        <span style={{ marginRight: '8px' }}>←</span> Volver a Panel de Control
      </Link>
      
      <header style={{ marginBottom: '2.5rem', borderBottom: '2px solid #edf2f7', paddingBottom: '1.5rem' }}>
        <span style={{
          display: 'inline-block',
          padding: '4px 12px',
          backgroundColor: '#FEF3C7',
          color: '#92400E',
          borderRadius: '20px',
          fontSize: '0.85rem',
          fontWeight: '700',
          marginBottom: '10px'
        }}>
          🧾 Guía Contable y Modelos Tributarios
        </span>
        <h1 style={{ color: '#1A202C', margin: '0 0 0.5rem 0', fontSize: '2.2rem', fontFamily: 'var(--font-heading, "Quicksand", sans-serif)' }}>
          Fiscalidad, IVA y Cierre Trimestral
        </h1>
        <p style={{ color: '#4A5568', margin: 0, fontSize: '1.05rem', lineHeight: '1.6' }}>
          Cómo clasificar los cobros de Stripe entre <strong>actividades exentas</strong> (clases y talleres) y <strong>actividades con IVA</strong> (suscripciones y tienda) para entregar a tu gestoría sin errores.
        </p>
      </header>

      {/* BLOQUE 1: LA DISTINCIÓN FUNDAMENTAL */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.4rem', color: '#2D3748', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          ⚖️ 1. La Distinción Legal: ¿Por qué unos llevan IVA y otros no?
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          
          {/* Tarjeta Exentas */}
          <div style={{ backgroundColor: '#F0FDF4', border: '1.5px solid #BBF7D0', borderRadius: '14px', padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <span style={{ fontSize: '1.5rem' }}>🎓</span>
              <h3 style={{ margin: 0, color: '#166534', fontSize: '1.15rem' }}>Ingresos EXENTOS de IVA (0%)</h3>
            </div>
            <p style={{ fontSize: '0.88rem', color: '#15803D', fontWeight: '700', marginBottom: '12px' }}>
              Base Legal: Art. 20.Uno.9º Ley 37/1992 del IVA (Enseñanza presencial)
            </p>
            <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#374151', fontSize: '0.92rem', lineHeight: '1.6' }}>
              <li><strong>Clases Presenciales Regulares en EMPI:</strong> Matrículas anuales (25 €) y cuotas mensuales o trimestrales.</li>
              <li><strong>Talleres Familiares Puntuales:</strong> Entradas de sesiones de fin de semana (ej. 20 € en Pequeñas Sonrisas).</li>
            </ul>
            <div style={{ marginTop: '12px', padding: '8px 12px', backgroundColor: '#DCFCE7', borderRadius: '8px', fontSize: '0.85rem', color: '#14532D' }}>
              💡 <strong>Regla para la asesoría:</strong> El 100% de lo cobrado va directo a la Base Imponible Exenta. No se desglosa IVA.
            </div>
          </div>

          {/* Tarjeta Sujetas */}
          <div style={{ backgroundColor: '#FAF5FF', border: '1.5px solid #E9D8FD', borderRadius: '14px', padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <span style={{ fontSize: '1.5rem' }}>💻</span>
              <h3 style={{ margin: 0, color: '#6B21A8', fontSize: '1.15rem' }}>Ingresos SUJETOS a IVA (21%)</h3>
            </div>
            <p style={{ fontSize: '0.88rem', color: '#7E22CE', fontWeight: '700', marginBottom: '12px' }}>
              Base Legal: Prestación de servicios por vía electrónica y entrega de bienes
            </p>
            <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#374151', fontSize: '0.92rem', lineHeight: '1.6' }}>
              <li><strong>Suscripción Digital a la Comunidad:</strong> Cuotas mensuales (3,90 € / 5,90 €) y anuales (39 €). Al ser acceso a grabaciones sin docente en directo, Hacienda lo considera servicio electrónico.</li>
              <li><strong>Regalos de Navidad y Tienda:</strong> Instrumentos, materiales físicos y packs de estimulación.</li>
            </ul>
            <div style={{ marginTop: '12px', padding: '8px 12px', backgroundColor: '#F3E8FF', borderRadius: '8px', fontSize: '0.85rem', color: '#581C87' }}>
              💡 <strong>Regla para la asesoría:</strong> El precio cobrado es <strong>PVP con IVA incluido</strong>. Se desglosa dividiendo entre 1,21.
            </div>
          </div>

        </div>
      </section>

      {/* BLOQUE 2: CHULETARIO DE DESGLOSE DE PRECIOS */}
      <section style={{ marginBottom: '3rem', backgroundColor: '#F8FAFC', padding: '1.5rem', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
        <h2 style={{ fontSize: '1.3rem', color: '#2D3748', margin: '0 0 1rem 0' }}>
          🧮 2. Chuletario Rápido: Desglose de los Precios de la Tienda y Comunidad
        </h2>
        <p style={{ fontSize: '0.92rem', color: '#64748B', margin: '0 0 1rem 0' }}>
          Fórmulas exactas para desglosar el 21% de IVA de cada venta de la web:
        </p>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.92rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#EDF2F7', borderBottom: '2px solid #CBD5E1' }}>
                <th style={{ padding: '10px 14px', color: '#334155' }}>Producto / Servicio</th>
                <th style={{ padding: '10px 14px', color: '#334155' }}>PVP Cobrado (Stripe)</th>
                <th style={{ padding: '10px 14px', color: '#334155' }}>Base Imponible (Ingreso Real)</th>
                <th style={{ padding: '10px 14px', color: '#334155' }}>IVA Repercutido (21% a Hacienda)</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #E2E8F0', backgroundColor: '#FFFFFF' }}>
                <td style={{ padding: '10px 14px', fontWeight: 'bold' }}>Suscripción Mensual Fundadores</td>
                <td style={{ padding: '10px 14px', fontWeight: 'bold', color: '#1E293B' }}>3,90 €</td>
                <td style={{ padding: '10px 14px', color: '#166534', fontWeight: '600' }}>3,22 €</td>
                <td style={{ padding: '10px 14px', color: '#991B1B', fontWeight: '600' }}>0,68 €</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E2E8F0', backgroundColor: '#F8FAFC' }}>
                <td style={{ padding: '10px 14px', fontWeight: 'bold' }}>Suscripción Mensual Regular</td>
                <td style={{ padding: '10px 14px', fontWeight: 'bold', color: '#1E293B' }}>5,90 €</td>
                <td style={{ padding: '10px 14px', color: '#166534', fontWeight: '600' }}>4,88 €</td>
                <td style={{ padding: '10px 14px', color: '#991B1B', fontWeight: '600' }}>1,02 €</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E2E8F0', backgroundColor: '#FFFFFF' }}>
                <td style={{ padding: '10px 14px', fontWeight: 'bold' }}>Suscripción Anual Familiar</td>
                <td style={{ padding: '10px 14px', fontWeight: 'bold', color: '#1E293B' }}>39,00 €</td>
                <td style={{ padding: '10px 14px', color: '#166534', fontWeight: '600' }}>32,23 €</td>
                <td style={{ padding: '10px 14px', color: '#991B1B', fontWeight: '600' }}>6,77 €</td>
              </tr>
              <tr style={{ backgroundColor: '#F8FAFC' }}>
                <td style={{ padding: '10px 14px', fontWeight: 'bold' }}>Regalo de Navidad / Tienda (PVP libre)</td>
                <td style={{ padding: '10px 14px', fontWeight: 'bold', color: '#1E293B' }}>Total PVP</td>
                <td style={{ padding: '10px 14px', color: '#166534', fontWeight: '600' }}>Total / 1,21</td>
                <td style={{ padding: '10px 14px', color: '#991B1B', fontWeight: '600' }}>Total - Base Imponible</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* BLOQUE 3: PLANTILLA PARA LA ASESORÍA (COPY-PASTE) */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.3rem', color: '#2D3748', marginBottom: '1rem' }}>
          📋 3. Plantilla Lista para Copiar y Pegar al Gestor (Cierre 4T)
        </h2>
        <p style={{ fontSize: '0.92rem', color: '#64748B', marginBottom: '1rem' }}>
          Al finalizar diciembre, rellena esta plantilla con los totales de Stripe y envíasela por correo a tu asesoría:
        </p>

        <div style={{
          backgroundColor: '#1E293B',
          color: '#E2E8F0',
          padding: '1.5rem',
          borderRadius: '12px',
          fontFamily: 'monospace',
          fontSize: '0.88rem',
          lineHeight: '1.7',
          position: 'relative',
          overflowX: 'auto'
        }}>
          <div style={{ color: '#94A3B8', marginBottom: '12px', borderBottom: '1px solid #334155', paddingBottom: '6px' }}>
            // Asunto: Cierre de Ingresos 4º Trimestre 2026 - Javier Muñoz Sánchez (Musicabalú)
          </div>
          <div>Hola [Nombre del asesor],</div>
          <br />
          <div>Adjunto el resumen de cobros de Stripe correspondiente al 4º Trimestre (Octubre, Noviembre y Diciembre).</div>
          <div>Como acordamos, los ingresos se dividen en dos naturalezas tributarias:</div>
          <br />
          <div style={{ color: '#86EFAC' }}>=============================================================</div>
          <div style={{ color: '#86EFAC', fontWeight: 'bold' }}>1. ACTIVIDAD EDUCATIVA PRESENCIAL (EXENTA DE IVA - Art. 20.Uno.9º)</div>
          <div style={{ color: '#86EFAC' }}>=============================================================</div>
          <div>• Matrículas y cuotas mensuales de clases regulares en EMPI: _______ €</div>
          <div>• Entradas a Talleres Familiares puntuales (0 a 3 años):    _______ €</div>
          <div>-------------------------------------------------------------</div>
          <div style={{ fontWeight: 'bold' }}>TOTAL BASE EXENTA DE IVA A DECLARAR:                   _______ €</div>
          <br />
          <div style={{ color: '#FDE047' }}>=============================================================</div>
          <div style={{ color: '#FDE047', fontWeight: 'bold' }}>2. SERVICIOS DIGITALES Y TIENDA ONLINE (SUJETO A IVA GENERAL 21%)</div>
          <div style={{ color: '#FDE047' }}>=============================================================</div>
          <div>• Suscripciones a la Comunidad Digital (PVP IVA incluido):  _______ €</div>
          <div>• Ventas Tienda / Regalos de Navidad (PVP IVA incluido):   _______ €</div>
          <div>-------------------------------------------------------------</div>
          <div>TOTAL COBRADO EN STRIPE CON IVA INCLUIDO:                  _______ €</div>
          <div>↳ BASE IMPONIBLE (Total / 1,21):                           _______ €</div>
          <div>↳ CUOTA DE IVA REPERCUTIDO (21% a liquidar en Mod. 303):   _______ €</div>
          <br />
          <div>Quedo a vuestra disposición si necesitáis los informes en CSV de la pasarela.</div>
          <br />
          <div>Un saludo,</div>
          <div>Javier Muñoz</div>
        </div>
      </section>

      {/* BLOQUE 4: IMPACTO EN LOS MODELOS DE ENERO */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.3rem', color: '#2D3748', marginBottom: '1rem' }}>
          📑 4. ¿Qué cambia en tus Modelos Tributarios de Enero?
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          
          <div style={{ padding: '1.2rem', borderRadius: '12px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF' }}>
            <h3 style={{ color: '#2B6CB0', margin: '0 0 8px 0', fontSize: '1.05rem' }}>Modelo 130 (IRPF Autónomos)</h3>
            <p style={{ margin: 0, fontSize: '0.9rem', color: '#4A5568', lineHeight: '1.5' }}>
              Sin cambios conceptuales. Se computan <strong>todos los ingresos netos</strong> (Base exenta de clases + Base imponible de la tienda), se descuentan los gastos deducibles y se abona el pago fraccionado a cuenta de tu IRPF.
            </p>
          </div>

          <div style={{ padding: '1.2rem', borderRadius: '12px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF' }}>
            <h3 style={{ color: '#D97706', margin: '0 0 8px 0', fontSize: '1.05rem' }}>Modelo 303 (Liquidación de IVA)</h3>
            <p style={{ margin: 0, fontSize: '0.9rem', color: '#4A5568', lineHeight: '1.5' }}>
              En el 3T no declaraste IVA porque todo era educación exenta. En el 4T, liquidas el IVA repercutido de suscripciones y regalos, y <strong>podrás deducir el IVA soportado</strong> de las compras de material de tienda, herramientas de software y envases.
            </p>
          </div>

        </div>
      </section>

      {/* BLOQUE 5: AVISO CENSAL RECOMENDADO */}
      <div style={{ backgroundColor: '#EFF6FF', borderLeft: '6px solid #3B82F6', padding: '1.2rem 1.5rem', borderRadius: '0 12px 12px 0' }}>
        <h4 style={{ margin: '0 0 6px 0', color: '#1E40AF', fontSize: '1rem' }}>
          💡 Aviso preventivo para tu asesoría (Modelo 036 / Epígrafes IAE):
        </h4>
        <p style={{ margin: 0, fontSize: '0.92rem', color: '#1E3A8A', lineHeight: '1.6' }}>
          Consúltales si en tu alta inicial te dieron de alta exclusivamente en el <em>Epígrafe de Enseñanza (826 o 933.9)</em> o si conviene presentar una comunicación censal (Modelo 036/037) para añadir un epígrafe complementario de <em>Comercio al por menor / Servicios por internet</em>. Esto asegura que la presentación del Modelo 303 en enero cuadre milimétricamente con tu censo en Hacienda.
        </p>
      </div>

    </div>
  );
}
