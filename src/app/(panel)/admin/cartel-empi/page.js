/* eslint-disable @next/next/no-img-element */
'use client';

import React from 'react';
import Link from 'next/link';

export default function CartelEmpiPage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="cartel-page-container">
      {/* Barra de herramientas en pantalla (se oculta al imprimir) */}
      <div className="no-print toolbar">
        <div>
          <Link href="/admin/proyectos" className="back-link">
            ← Volver al Laboratorio de Proyectos
          </Link>
          <h1 className="toolbar-title">Cartel A4 Entrada EMPI (Con Código QR)</h1>
          <p className="toolbar-desc">
            Diseñado para colocar en peana o plastificado en la recepción y zona de carritos de EMPI.
          </p>
        </div>
        <div className="toolbar-actions">
          <button onClick={handlePrint} className="print-btn">
            🖨️ Imprimir Cartel A4 (o Guardar PDF)
          </button>
        </div>
      </div>

      {/* Contenedor del Cartel A4 */}
      <div className="cartel-wrapper">
        <div id="cartel-a4-printable" className="cartel-sheet">
          {/* Cabecera / Co-branding */}
          <div className="cartel-header">
            <div className="cobranding-badge">
              <span className="badge-school">ESCUELA INFANTIL EMPI</span>
              <span className="badge-sep">✕</span>
              <span className="badge-brand">MUSICABALÚ</span>
            </div>
            <p className="partnership-text">Alianza pedagógica por el desarrollo musical en la primera infancia</p>
          </div>

          {/* Gran Titular Gancho */}
          <div className="hero-section">
            <h2 className="hero-title">
              ¿Qué canciones canta tu peque en la asamblea de <span className="highlight-empi">EMPI</span>?
            </h2>
            <p className="hero-subtitle">
              Lleva la música viva de su aula al salón de casa. Estimulación temprana de 0 a 3 años <strong>100% libre de pantallas</strong>.
            </p>
          </div>

          {/* 3 Pilares Pedagógicos */}
          <div className="pillars-grid">
            <div className="pillar-card pillar-pink">
              <div className="pillar-icon">🎵</div>
              <h3 className="pillar-title">Las canciones de su aula</h3>
              <p className="pillar-text">
                Melodías ricas en modos y ritmos (MLT de E. Gordon) que tu hijo ya reconoce y disfruta cada mañana con su seño.
              </p>
            </div>

            <div className="pillar-card pillar-cyan">
              <div className="pillar-icon">🧸</div>
              <h3 className="pillar-title">Vínculo, juego y calma</h3>
              <p className="pillar-text">
                Sesiones en audio con juegos de regazo, balanceos y nanas para transformar el despertar, el baño y el sueño.
              </p>
            </div>

            <div className="pillar-card pillar-green">
              <div className="pillar-icon">🚫📱</div>
              <h3 className="pillar-title">Cero sobreestimulación</h3>
              <p className="pillar-text">
                Diseñado exclusivamente para el oído y el movimiento natural. Sin pantallas que alteren su atención ni su descanso.
              </p>
            </div>
          </div>

          {/* Bloque Central de Escaneo QR + Oferta Exclusiva */}
          <div className="cta-container">
            <div className="qr-box">
              <img 
                src="/qr-empi.svg" 
                alt="Código QR Musicabalú EMPI" 
                className="qr-image"
              />
              <div className="qr-caption">
                <span className="camera-icon">📷</span>
                <strong>Apunta con la cámara de tu móvil</strong>
                <span className="qr-sub">Escucha muestras gratis al instante</span>
              </div>
            </div>

            <div className="offer-box">
              <div className="offer-tag">⭐ VENTAJA EXCLUSIVA COMUNIDAD EMPI ⭐</div>
              <p className="offer-headline">Acceso ilimitado a la plataforma</p>
              
              <div className="price-row">
                <span className="price-old">39 €/año</span>
                <span className="price-arrow">➔</span>
                <span className="price-new">29 € <small>/ año</small></span>
              </div>
              <p className="price-detail">Menos de 2,45 € al mes · Todo el repertorio y sesiones en audio</p>

              <div className="coupon-pill">
                <span>Cupón de descuento:</span>
                <span className="coupon-code">EMPI2026</span>
              </div>

              <p className="validity-note">
                ✨ Promoción exclusiva de inicio de curso activa hasta el <strong>31 de diciembre</strong>.
              </p>
            </div>
          </div>

          {/* Pie del Cartel */}
          <div className="cartel-footer">
            <div className="footer-brand">
              <img 
                src="/logo_texto_corazon.png" 
                alt="Musicabalú" 
                className="footer-logo"
              />
            </div>
            <div className="footer-info">
              <p className="footer-web">www.musicabalu.com/tienda</p>
              <p className="footer-author">Proyecto pedagógico dirigido por Javi Muñoz · Murcia</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        /* Reset y estilos generales de la página */
        .cartel-page-container {
          background-color: #f1f5f9;
          min-height: 100vh;
          padding: 2rem 1rem 4rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          font-family: var(--font-body), 'Montserrat', sans-serif;
        }

        .toolbar {
          width: 100%;
          max-width: 800px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: white;
          padding: 1.25rem 1.75rem;
          border-radius: 12px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
          margin-bottom: 2rem;
        }

        .back-link {
          color: #64748b;
          text-decoration: none;
          font-size: 0.85rem;
          font-weight: 600;
          display: inline-block;
          margin-bottom: 0.25rem;
        }
        .back-link:hover {
          color: #0f172a;
        }

        .toolbar-title {
          font-family: var(--font-heading), 'Quicksand', sans-serif;
          font-size: 1.25rem;
          color: #0f172a;
          margin: 0;
        }

        .toolbar-desc {
          font-size: 0.85rem;
          color: #64748b;
          margin: 0.2rem 0 0 0;
        }

        .print-btn {
          background: #f4436c;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 30px;
          font-weight: 700;
          font-size: 0.95rem;
          cursor: pointer;
          box-shadow: 0 4px 10px rgba(244, 67, 108, 0.3);
          transition: transform 0.15s ease, background 0.15s ease;
        }
        .print-btn:hover {
          background: #e0325b;
          transform: translateY(-1px);
        }

        /* Dimensiones fijas A4 (210mm x 297mm) */
        .cartel-wrapper {
          display: flex;
          justify-content: center;
          width: 100%;
        }

        .cartel-sheet {
          width: 210mm;
          min-height: 297mm;
          height: 297mm;
          background: #ffffff;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
          border-radius: 6px;
          padding: 14mm 16mm 12mm;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          color: #2c3333;
        }

        /* Cabecera */
        .cartel-header {
          text-align: center;
          border-bottom: 2px dashed #e2e8f0;
          padding-bottom: 3mm;
        }

        .cobranding-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #f8fafc;
          border: 1.5px solid #cbd5e1;
          padding: 4px 16px;
          border-radius: 20px;
        }

        .badge-school {
          font-weight: 800;
          font-size: 11pt;
          letter-spacing: 0.5px;
          color: #0284c7;
        }

        .badge-sep {
          color: #94a3b8;
          font-size: 9pt;
        }

        .badge-brand {
          font-weight: 800;
          font-size: 11pt;
          letter-spacing: 0.5px;
          color: #f4436c;
        }

        .partnership-text {
          font-size: 8.5pt;
          color: #64748b;
          margin: 4px 0 0;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        /* Hero */
        .hero-section {
          text-align: center;
          margin: 4mm 0 3mm;
        }

        .hero-title {
          font-family: var(--font-heading), 'Quicksand', sans-serif;
          font-size: 21pt;
          font-weight: 800;
          line-height: 1.2;
          color: #1e293b;
          margin: 0 0 6px 0;
        }

        .highlight-empi {
          color: #f4436c;
          text-decoration: underline wavy #fed65e;
          text-underline-offset: 4px;
        }

        .hero-subtitle {
          font-size: 11pt;
          line-height: 1.4;
          color: #475569;
          max-width: 90%;
          margin: 0 auto;
        }

        /* Pilares */
        .pillars-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 3.5mm;
          margin: 3mm 0;
        }

        .pillar-card {
          padding: 3.5mm;
          border-radius: 10px;
          text-align: center;
          border: 1px solid transparent;
        }

        .pillar-pink {
          background-color: #fdf2f4;
          border-color: #fbcfe8;
        }

        .pillar-cyan {
          background-color: #f0f9ff;
          border-color: #bae6fd;
        }

        .pillar-green {
          background-color: #f7fee7;
          border-color: #d9f99d;
        }

        .pillar-icon {
          font-size: 18pt;
          margin-bottom: 2px;
        }

        .pillar-title {
          font-family: var(--font-heading), 'Quicksand', sans-serif;
          font-size: 10.5pt;
          font-weight: 800;
          color: #1e293b;
          margin: 0 0 3px 0;
        }

        .pillar-text {
          font-size: 8.5pt;
          line-height: 1.35;
          color: #475569;
          margin: 0;
        }

        /* Bloque QR + Oferta */
        .cta-container {
          display: flex;
          align-items: center;
          gap: 5mm;
          background: #ffffff;
          border: 2.5px solid #00b2e3;
          border-radius: 14px;
          padding: 5mm 6mm;
          box-shadow: 0 4px 15px rgba(0, 178, 227, 0.08);
          margin: 3mm 0;
        }

        .qr-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex: 0 0 46mm;
        }

        .qr-image {
          width: 44mm;
          height: 44mm;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 2px;
          background: white;
        }

        .qr-caption {
          text-align: center;
          margin-top: 3px;
          display: flex;
          flex-direction: column;
          font-size: 7.5pt;
          color: #334155;
          line-height: 1.25;
        }

        .camera-icon {
          font-size: 9pt;
          display: none;
        }

        .qr-sub {
          color: #0284c7;
          font-weight: 600;
        }

        .offer-box {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .offer-tag {
          background: #f4436c;
          color: white;
          font-size: 8.5pt;
          font-weight: 800;
          letter-spacing: 0.5px;
          padding: 3px 10px;
          border-radius: 12px;
          margin-bottom: 3px;
        }

        .offer-headline {
          font-family: var(--font-heading), 'Quicksand', sans-serif;
          font-size: 12.5pt;
          font-weight: 800;
          color: #1e293b;
          margin: 2px 0 4px 0;
        }

        .price-row {
          display: flex;
          align-items: baseline;
          gap: 8px;
          margin: 2px 0;
        }

        .price-old {
          font-size: 12pt;
          color: #94a3b8;
          text-decoration: line-through;
          font-weight: 600;
        }

        .price-arrow {
          color: #cbd5e1;
          font-size: 11pt;
        }

        .price-new {
          font-size: 21pt;
          font-weight: 900;
          color: #00b2e3;
          line-height: 1;
        }

        .price-new small {
          font-size: 10pt;
          font-weight: 700;
          color: #64748b;
        }

        .price-detail {
          font-size: 8.5pt;
          color: #64748b;
          margin: 2px 0 6px 0;
        }

        .coupon-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #fef9e7;
          border: 1.5px solid #fed65e;
          padding: 4px 10px;
          border-radius: 8px;
          font-size: 8.5pt;
          color: #854d0e;
          font-weight: 600;
        }

        .coupon-code {
          background: #fed65e;
          color: #451a03;
          font-family: monospace;
          font-weight: 800;
          font-size: 10pt;
          padding: 2px 6px;
          border-radius: 4px;
          letter-spacing: 0.5px;
        }

        .validity-note {
          font-size: 7.8pt;
          color: #64748b;
          margin: 5px 0 0 0;
          line-height: 1.25;
        }

        /* Pie de página */
        .cartel-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 2px solid #f1f5f9;
          padding-top: 3mm;
          margin-top: 2mm;
        }

        .footer-logo {
          height: 11mm;
          width: auto;
          object-fit: contain;
        }

        .footer-info {
          text-align: right;
        }

        .footer-web {
          font-family: var(--font-heading), 'Quicksand', sans-serif;
          font-size: 10pt;
          font-weight: 800;
          color: #f4436c;
          margin: 0;
        }

        .footer-author {
          font-size: 7.5pt;
          color: #64748b;
          margin: 1px 0 0;
        }

        /* Reglas de impresión A4 exactas */
        @media print {
          body, html {
            background: white !important;
            padding: 0 !important;
            margin: 0 !important;
            width: 210mm !important;
            height: 297mm !important;
          }

          @page {
            size: A4 portrait;
            margin: 0;
          }

          .no-print {
            display: none !important;
          }

          .cartel-page-container {
            padding: 0 !important;
            background: white !important;
            min-height: auto !important;
          }

          .cartel-wrapper {
            margin: 0 !important;
            padding: 0 !important;
          }

          .cartel-sheet {
            width: 210mm !important;
            height: 297mm !important;
            min-height: 297mm !important;
            max-height: 297mm !important;
            box-shadow: none !important;
            border-radius: 0 !important;
            padding: 12mm 15mm 10mm !important;
            page-break-after: avoid !important;
            page-break-inside: avoid !important;
          }
        }
      `}</style>
    </div>
  );
}
