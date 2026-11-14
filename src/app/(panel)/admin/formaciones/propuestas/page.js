import Link from 'next/link';
import React from 'react';

export const metadata = {
  title: 'Propuestas de Formaciones · Centros y Escuelas Infantiles | Admin Musicabalú',
};

export default function PropuestasFormacionesAdminPage() {
  return (
    <div style={{ maxWidth: '1150px', margin: '0 auto', padding: '30px 20px 80px' }}>
      {/* Botón Volver */}
      <div style={{ marginBottom: '20px' }}>
        <Link
          href="/admin/formaciones"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            color: 'var(--color-cyan, #00B2E3)',
            fontWeight: '700',
            textDecoration: 'none',
            fontSize: '0.95rem',
          }}
        >
          ← Volver a Formaciones
        </Link>
      </div>

      {/* Cabecera Principal */}
      <header style={{ marginBottom: '36px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: '#eff6ff',
          color: '#1d4ed8',
          fontWeight: '800',
          fontSize: '0.85rem',
          padding: '5px 14px',
          borderRadius: '999px',
          marginBottom: '12px',
          border: '1.5px solid #bfdbfe'
        }}>
          <span>📑</span>
          <span>Estrategia de Expansión Territorial B2B + B2C</span>
        </div>
        <h1 style={{ fontSize: '2.4rem', fontWeight: '900', color: '#0f172a', margin: '0 0 10px 0', fontFamily: 'var(--font-heading)' }}>
          Propuestas de Formaciones en Centros
        </h1>
        <p style={{ color: '#475569', fontSize: '1.1rem', lineHeight: '1.6', margin: 0, maxWidth: '900px' }}>
          Marco estratégico, modelos de negociación y resolución operativa para impartir formaciones presenciales de Musicabalú en escuelas infantiles, colegios y centros educativos de diferentes ciudades.
        </p>
      </header>

      {/* 1. VISIÓN: EL MOTOR DE EXPANSIÓN */}
      <section style={{
        backgroundColor: '#f8fafc',
        border: '2px solid #e2e8f0',
        borderRadius: '18px',
        padding: '24px 28px',
        marginBottom: '32px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
          <span style={{ fontSize: '1.6rem' }}>🎯</span>
          <h2 style={{ fontSize: '1.35rem', color: '#0f172a', margin: 0, fontWeight: '800' }}>
            La Gran Jugada: La Formación como Caballo de Troya
          </h2>
        </div>
        <p style={{ color: '#334155', fontSize: '1rem', lineHeight: '1.7', margin: '0 0 16px 0' }}>
          La formación presencial de 8 horas (inspirada en la experiencia validada en febrero de 2026 y en el acuerdo marco de EMPI) 
          <strong> no es solo una venta de horas docentes</strong>. Es la palanca que permite:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          <div style={{ backgroundColor: 'white', padding: '16px 18px', borderRadius: '14px', border: '1.5px solid #cbd5e1' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0284c7', fontWeight: '800', marginBottom: '6px' }}>
              <span>🏫</span>
              <span>1. Alianza con el Centro (B2B)</span>
            </div>
            <p style={{ margin: 0, fontSize: '0.9rem', color: '#64748b', lineHeight: '1.5' }}>
              Capacitamos a las educadoras en la MLT de Gordon, dotándolas de rutinas vivas sin pantallas y convirtiendo el centro en un <strong>Centro Colaborador Musicabalú</strong>.
            </p>
          </div>

          <div style={{ backgroundColor: 'white', padding: '16px 18px', borderRadius: '14px', border: '1.5px solid #cbd5e1' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#d97706', fontWeight: '800', marginBottom: '6px' }}>
              <span>🏡</span>
              <span>2. Entrada a las Familias (B2C)</span>
            </div>
            <p style={{ margin: 0, fontSize: '0.9rem', color: '#64748b', lineHeight: '1.5' }}>
              El centro recomienda oficialmente Musicabalú con circular y cartel A4 con QR. Las familias se suscriben a la comunidad para escuchar en casa las mismas canciones que sus peques cantan en la escuela.
            </p>
          </div>

          <div style={{ backgroundColor: 'white', padding: '16px 18px', borderRadius: '14px', border: '1.5px solid #cbd5e1' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#16a34a', fontWeight: '800', marginBottom: '6px' }}>
              <span>🔄</span>
              <span>3. Ingresos Recurrentes y Escalabilidad</span>
            </div>
            <p style={{ margin: 0, fontSize: '0.9rem', color: '#64748b', lineHeight: '1.5' }}>
              Cobro de la formación (cashflow inmediato) + suscripción anual de familias (ingresos pasivos recurrentes) + cuota de renovación de licencia del centro en cursos sucesivos.
            </p>
          </div>
        </div>
      </section>

      {/* 2. RESOLUCIÓN DE DUDAS ESTRATÉGICAS CLAVE */}
      <h2 style={{ fontSize: '1.6rem', color: '#0f172a', marginBottom: '18px', fontWeight: '800' }}>
        Resolución de Dudas Clave: Financiación, FUNDAE, CPR y Licencias
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
        
        {/* DUDA 1: FUNDAE VS CESIÓN DE ESPACIO */}
        <article style={{
          backgroundColor: 'white',
          border: '1.5px solid #e2e8f0',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <span style={{ backgroundColor: '#fef3c7', padding: '6px 10px', borderRadius: '8px', fontSize: '1.2rem' }}>💶</span>
            <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#1e293b', fontWeight: '800' }}>
              1. ¿Cómo funciona FUNDAE y qué pasa con el alquiler del espacio?
            </h3>
          </div>
          <div style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.7' }}>
            <p style={{ margin: '0 0 10px 0' }}>
              <strong>El principio legal de FUNDAE:</strong> Todas las empresas con trabajadores en régimen general acumulan un crédito formativo anual ante la Seguridad Social. Si no lo gastan antes del 31 de diciembre, se pierde. 
              La escuela abona la factura de la formación a Musicabalú y, en el mes siguiente, su gestoría <strong>descuenta ese mismo importe de los seguros sociales (TC1)</strong>. Por tanto, el coste neto para el centro es <strong>0 €</strong>.
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '14px', marginTop: '12px' }}>
              <div style={{ backgroundColor: '#f8fafc', padding: '14px 16px', borderRadius: '10px', borderLeft: '4px solid #00B2E3' }}>
                <strong style={{ color: '#0f172a', display: 'block', marginBottom: '4px' }}>Caso A: Formación In-Company (Exclusiva para su equipo)</strong>
                <span>El centro te paga tu presupuesto íntegro (ej. 900 € - 1.200 €) y se lo bonifica por FUNDAE. <em>Tú no pagas alquiler</em> porque estás formando a sus propias empleadas en sus instalaciones.</span>
              </div>
              <div style={{ backgroundColor: '#f8fafc', padding: '14px 16px', borderRadius: '10px', borderLeft: '4px solid #10B981' }}>
                <strong style={{ color: '#0f172a', display: 'block', marginBottom: '4px' }}>Caso B: Formación Abierta ("Espacio a cambio de plazas")</strong>
                <span>Si vendes plazas a educadores externos o familias (ej. 10 plazas a 100 € = 1.000 € brutos), a la escuela anfitriona <strong>le regalas 2 o 3 plazas para sus educadoras a cambio de la cesión del aula</strong> de psicomotricidad un sábado. <em>Cero alquiler y cero burocracia</em>. Si además quieren bonificar por FUNDAE a otras 2 educadoras de su centro, solo se factura y bonifica la cuota de esas plazas adicionales.</span>
              </div>
            </div>
          </div>
        </article>

        {/* DUDA 2: CENTROS PÚBLICOS Y EL CPR */}
        <article style={{
          backgroundColor: 'white',
          border: '1.5px solid #e2e8f0',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <span style={{ backgroundColor: '#fee2e2', padding: '6px 10px', borderRadius: '8px', fontSize: '1.2rem' }}>🏛️</span>
            <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#1e293b', fontWeight: '800' }}>
              2. ¿Nos interesa ofrecerlo en centros públicos a través del CPR?
            </h3>
          </div>
          <div style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.7' }}>
            <p style={{ margin: '0 0 10px 0' }}>
              <strong>La realidad económica del CPR (Centro de Profesores y Recursos):</strong> Las tarifas de ponente en el CPR están tabuladas por la administración pública (rondan entre <strong>35 € y 50 € brutos/hora</strong>). Una formación de 8 horas genera unos 300 € - 400 € brutos y suele tardar meses en pagarse por la lentitud de la intervención general. <strong>Económicamente no es un canal rentable por hora de trabajo directo.</strong>
            </p>
            <div style={{ backgroundColor: '#fffbeb', border: '1px solid #fde68a', borderRadius: '10px', padding: '14px 16px', marginTop: '10px' }}>
              <strong style={{ color: '#92400e', display: 'block', marginBottom: '4px' }}>¿Cuándo SÍ nos interesa el CPR?</strong>
              <ul style={{ margin: 0, paddingLeft: '20px', color: '#78350f', fontSize: '0.9rem' }}>
                <li><strong>Autoridad y Homologación:</strong> Los cursos CPR otorgan créditos oficiales reconocidos por el Ministerio de Educación para sexenios y oposiciones. Esto valida académicamente la metodología Musicabalú.</li>
                <li><strong>Prospección masiva de contactos:</strong> En un curso de CPR tienes a 20 o 25 maestras de diferentes colegios públicos de la comarca. Al enamorarse de la metodología, ellas mismas proponen a sus directores y AMPAs contratar talleres familiares Musicabalú o adquirir materiales.</li>
              </ul>
            </div>
          </div>
        </article>

        {/* DUDA 3: LICENCIA DE CENTRO Y NEGOCIACIÓN */}
        <article style={{
          backgroundColor: 'white',
          border: '1.5px solid #e2e8f0',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <span style={{ backgroundColor: '#f3e8ff', padding: '6px 10px', borderRadius: '8px', fontSize: '1.2rem' }}>🔐</span>
            <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#1e293b', fontWeight: '800' }}>
              3. ¿Cómo negociamos la Licencia de Centro? ¿Se regala?
            </h3>
          </div>
          <div style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.7' }}>
            <p style={{ margin: '0 0 10px 0' }}>
              <strong>Respuesta contundente: NO se regala.</strong> La formación presencial es el disparador, pero la <strong>Licencia de Centro Colaborador</strong> es nuestro activo B2B recurrente.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '14px', marginTop: '12px' }}>
              <div style={{ backgroundColor: '#f8fafc', padding: '14px 16px', borderRadius: '10px', borderLeft: '4px solid #805AD5' }}>
                <strong style={{ color: '#0f172a', display: 'block', marginBottom: '4px' }}>Estrategia del Primer Año (Pack Impulso)</strong>
                <span>Para facilitar el cierre inicial, se incluye el <strong>Año 1 de Licencia de Centro</strong> dentro del pack de la formación presencial. El centro percibe un valor gigantesco (formación + sello + guía de rutinas + accesos docentes).</span>
              </div>
              <div style={{ backgroundColor: '#f8fafc', padding: '14px 16px', borderRadius: '10px', borderLeft: '4px solid #F4436C' }}>
                <strong style={{ color: '#0f172a', display: 'block', marginBottom: '4px' }}>Renovación Anual Recurrente (Año 2 en adelante)</strong>
                <span>A partir del segundo curso, la escuela abona una <strong>cuota anual de mantenimiento de centro colaborador</strong> (ej. 150 € - 250 € / año) para mantener el distintivo oficial, la actualización del repertorio de aula y el descuento preferente para las nuevas familias que entran cada septiembre.</span>
              </div>
            </div>
          </div>
        </article>

        {/* DUDA 4: DESCUENTO LIMITADO PARA FAMILIAS */}
        <article style={{
          backgroundColor: 'white',
          border: '1.5px solid #e2e8f0',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <span style={{ backgroundColor: '#dcfce7', padding: '6px 10px', borderRadius: '8px', fontSize: '1.2rem' }}>🎁</span>
            <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#1e293b', fontWeight: '800' }}>
              4. ¿Cómo articular la ventaja para las familias del centro?
            </h3>
          </div>
          <div style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.7' }}>
            <p style={{ margin: '0 0 10px 0' }}>
              El descuento a familias es una pieza maestra de psicología de ventas donde <strong>todos ganan</strong>:
            </p>
            <ul style={{ margin: 0, paddingLeft: '20px', color: '#334155', fontSize: '0.92rem' }}>
              <li><strong>Para la escuela:</strong> Se posiciona ante sus familias como un centro innovador que les regala un beneficio exclusivo con Musicabalú.</li>
              <li><strong>Para las familias:</strong> Acceden a la plataforma anual por <strong>29 €/año en vez de 39 €</strong> (con cupón exclusivo y fecha límite, ej. hasta fin de trimestre).</li>
              <li><strong>Para Musicabalú:</strong> Captamos decenas de clientes finales con <em>coste de adquisición cero</em>, gracias a la recomendación de su tutora de confianza.</li>
            </ul>
          </div>
        </article>

      </div>

      {/* 3. CATÁLOGO DE MODALIDADES DE PROPUESTAS */}
      <h2 style={{ fontSize: '1.6rem', color: '#0f172a', marginBottom: '18px', fontWeight: '800' }}>
        Las 4 Modalidades de Propuestas para Centros
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '22px', marginBottom: '40px' }}>

        {/* MODALIDAD 1: MODELO EMPI (COMPLETO) */}
        <div style={{
          backgroundColor: 'white',
          border: '2px solid #FED65E',
          borderRadius: '16px',
          padding: '22px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: '0 8px 20px rgba(254, 214, 94, 0.15)'
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ backgroundColor: '#fef3c7', color: '#92400e', fontSize: '0.75rem', fontWeight: '800', padding: '4px 10px', borderRadius: '999px' }}>
                ⭐ RECOMENDADO / COMPLETO
              </span>
              <span style={{ fontSize: '1.2rem' }}>🚀</span>
            </div>
            <h3 style={{ fontSize: '1.3rem', color: '#0f172a', margin: '0 0 8px 0', fontWeight: '800' }}>
              Modalidad 1: Centro Colaborador Oficial (Modelo EMPI)
            </h3>
            <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: '1.5', margin: '0 0 14px 0' }}>
              La alianza integral para escuelas que quieren implantar el entorno Musicabalú de forma transversal en el aula y hacia sus familias.
            </p>
            <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '0.85rem', color: '#334155', lineHeight: '1.6' }}>
              <li><strong>Formación presencial (8h):</strong> Intensivo práctico en su centro (bonificable FUNDAE o cesión de espacio).</li>
              <li><strong>Licencia de Centro:</strong> Acceso ilimitado para todo el equipo docente a la plataforma y biblioteca de audios.</li>
              <li><strong>Guía de Rutinas de Aula:</strong> Canciones para bienvenida, recogida, calma y patio.</li>
              <li><strong>Distintivo Oficial:</strong> Cartel «Centro con Entorno Musicabalú».</li>
              <li><strong>Campaña Familias:</strong> Circular WhatsApp + Cartel A4 con QR y cupón exclusivo (29 €/año).</li>
            </ul>
          </div>
          <div style={{ marginTop: '18px', paddingTop: '14px', borderTop: '1px solid #f1f5f9' }}>
            <Link
              href="/admin/aterrizaje-empi"
              style={{
                display: 'block',
                textAlign: 'center',
                backgroundColor: '#fed65e',
                color: '#451a03',
                padding: '10px 16px',
                borderRadius: '10px',
                fontWeight: '800',
                fontSize: '0.88rem',
                textDecoration: 'none'
              }}
            >
              Ver Ejemplo Real en EMPI →
            </Link>
          </div>
        </div>

        {/* MODALIDAD 2: FORMACIÓN ABIERTA ESPACIO X PLAZAS */}
        <div style={{
          backgroundColor: 'white',
          border: '2px solid #00B2E3',
          borderRadius: '16px',
          padding: '22px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: '0 8px 20px rgba(0, 178, 227, 0.1)'
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ backgroundColor: '#e0f2fe', color: '#0369a1', fontSize: '0.75rem', fontWeight: '800', padding: '4px 10px', borderRadius: '999px' }}>
                EXPANSIÓN TERRITORIAL
              </span>
              <span style={{ fontSize: '1.2rem' }}>📍</span>
            </div>
            <h3 style={{ fontSize: '1.3rem', color: '#0f172a', margin: '0 0 8px 0', fontWeight: '800' }}>
              Modalidad 2: Formación Abierta ("Espacio por Plazas")
            </h3>
            <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: '1.5', margin: '0 0 14px 0' }}>
              Ideal para abrir nuevas ciudades (Alicante, Almería, Murcia, etc.) en escuelas infantiles con salas diáfanas amplias.
            </p>
            <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '0.85rem', color: '#334155', lineHeight: '1.6' }}>
              <li><strong>Acuerdo con la escuela:</strong> Cede su aula de psicomotricidad un sábado (8 horas).</li>
              <li><strong>Contraprestación al centro:</strong> 2 a 3 plazas 100% gratuitas para sus educadoras (valoradas en 300 €).</li>
              <li><strong>Convocatoria abierta:</strong> Venta de 10-15 plazas a educadores externos, maestros y familias de la zona (80 € - 100 €/plaza).</li>
              <li><strong>Coste de alquiler:</strong> 0 € fijos.</li>
              <li><strong>Riesgo:</strong> Cero para Musicabalú y beneficio formativo para el centro.</li>
            </ul>
          </div>
          <div style={{ marginTop: '18px', paddingTop: '14px', borderTop: '1px solid #f1f5f9' }}>
            <div style={{ textAlign: 'center', color: '#0284c7', fontWeight: '700', fontSize: '0.85rem' }}>
              Genera 1.000 € - 1.500 € netos por fin de semana
            </div>
          </div>
        </div>

        {/* MODALIDAD 3: FORMACIÓN CLAUSTRO PUNTUAL (SIN LICENCIA) */}
        <div style={{
          backgroundColor: 'white',
          border: '1.5px solid #cbd5e1',
          borderRadius: '16px',
          padding: '22px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ backgroundColor: '#f1f5f9', color: '#475569', fontSize: '0.75rem', fontWeight: '800', padding: '4px 10px', borderRadius: '999px' }}>
                FORMACIÓN STANDALONE
              </span>
              <span style={{ fontSize: '1.2rem' }}>🎓</span>
            </div>
            <h3 style={{ fontSize: '1.3rem', color: '#0f172a', margin: '0 0 8px 0', fontWeight: '800' }}>
              Modalidad 3: Formación Claustro Puntual (Sin Licencia)
            </h3>
            <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: '1.5', margin: '0 0 14px 0' }}>
              Para centros que desean formar a su personal pero no quieren comprometerse con una vinculación anual ni con sus familias.
            </p>
            <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '0.85rem', color: '#334155', lineHeight: '1.6' }}>
              <li><strong>Servicio docente puro:</strong> Formación intensiva de 8 horas impartida por Javi Muñoz.</li>
              <li><strong>Acceso individual:</strong> Cada educadora asistente recibe acceso al panel de formaciones durante 1 año.</li>
              <li><strong>Sin licencia de centro:</strong> No incluye el sello de Centro Colaborador ni campañas para familias.</li>
              <li><strong>Precio cerrado:</strong> 800 € - 1.200 € (según aforo y desplazamiento), 100% bonificable por FUNDAE.</li>
            </ul>
          </div>
          <div style={{ marginTop: '18px', paddingTop: '14px', borderTop: '1px solid #f1f5f9' }}>
            <div style={{ textAlign: 'center', color: '#64748b', fontWeight: '700', fontSize: '0.85rem' }}>
              Tarifa estándar de consultoría docente
            </div>
          </div>
        </div>

        {/* MODALIDAD 4: INSTITUCIONAL / CPR / PÚBLICA */}
        <div style={{
          backgroundColor: 'white',
          border: '1.5px solid #cbd5e1',
          borderRadius: '16px',
          padding: '22px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ backgroundColor: '#ede9fe', color: '#6b21a8', fontSize: '0.75rem', fontWeight: '800', padding: '4px 10px', borderRadius: '999px' }}>
                INSTITUCIONAL
              </span>
              <span style={{ fontSize: '1.2rem' }}>🏛️</span>
            </div>
            <h3 style={{ fontSize: '1.3rem', color: '#0f172a', margin: '0 0 8px 0', fontWeight: '800' }}>
              Modalidad 4: Centros Públicos / Convocatoria CPR
            </h3>
            <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: '1.5', margin: '0 0 14px 0' }}>
              Para centros de profesorado (CPR Murcia, CEFIRE Comunidad Valenciana, CEP Andalucía) y colegios públicos.
            </p>
            <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '0.85rem', color: '#334155', lineHeight: '1.6' }}>
              <li><strong>Formato oficial:</strong> Convocatoria de formación permanente del profesorado (créditos oficiales homologados).</li>
              <li><strong>Remuneración oficial:</strong> Tarifa por hora según tabla oficial de la comunidad autónoma.</li>
              <li><strong>Objetivo estratégico:</strong> Validación y semillero de contactos con maestras de infantil de la pública para posteriores talleres y venta de libros sonoros.</li>
            </ul>
          </div>
          <div style={{ marginTop: '18px', paddingTop: '14px', borderTop: '1px solid #f1f5f9' }}>
            <div style={{ textAlign: 'center', color: '#805ad5', fontWeight: '700', fontSize: '0.85rem' }}>
              Homologación oficial y prestigio docente
            </div>
          </div>
        </div>

      </div>

      {/* 4. PROTOCOLO OPERATIVO DE NEGOCIACIÓN PASO A PASO */}
      <section style={{
        backgroundColor: 'white',
        border: '1.5px solid #e2e8f0',
        borderRadius: '18px',
        padding: '28px',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <span style={{ fontSize: '1.6rem' }}>📞</span>
          <h2 style={{ fontSize: '1.35rem', color: '#0f172a', margin: 0, fontWeight: '800' }}>
            Protocolo de Negociación: Cómo Cerrar una Nueva Escuela
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
          <div style={{ backgroundColor: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <span style={{ backgroundColor: '#00b2e3', color: 'white', fontSize: '0.75rem', fontWeight: '800', padding: '2px 8px', borderRadius: '6px' }}>PASO 1</span>
            <h4 style={{ margin: '8px 0 4px', fontSize: '1rem', color: '#0f172a' }}>Llamada Filtro (45 seg)</h4>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b', lineHeight: '1.4' }}>
              Llamar por la mañana (10:30-12:30). Conseguir el nombre y email directo de la dirección o coordinación pedagógica.
            </p>
          </div>

          <div style={{ backgroundColor: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <span style={{ backgroundColor: '#00b2e3', color: 'white', fontSize: '0.75rem', fontWeight: '800', padding: '2px 8px', borderRadius: '6px' }}>PASO 2</span>
            <h4 style={{ margin: '8px 0 4px', fontSize: '1rem', color: '#0f172a' }}>Email de Propuesta Adaptada</h4>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b', lineHeight: '1.4' }}>
              Enviar la propuesta de Música y Movimiento 0-3 (sin pantallas) destacando la opción de bonificación FUNDAE o el acuerdo de cesión de espacio.
            </p>
          </div>

          <div style={{ backgroundColor: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <span style={{ backgroundColor: '#00b2e3', color: 'white', fontSize: '0.75rem', fontWeight: '800', padding: '2px 8px', borderRadius: '6px' }}>PASO 3</span>
            <h4 style={{ margin: '8px 0 4px', fontSize: '1rem', color: '#0f172a' }}>Llamada de 10 min o Café</h4>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b', lineHeight: '1.4' }}>
              Seguimiento a los 4 días para resolver dudas, revisar el aforo de su aula diáfana y fijar la fecha del sábado en el calendario.
            </p>
          </div>

          <div style={{ backgroundColor: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <span style={{ backgroundColor: '#10b981', color: 'white', fontSize: '0.75rem', fontWeight: '800', padding: '2px 8px', borderRadius: '6px' }}>PASO 4</span>
            <h4 style={{ margin: '8px 0 4px', fontSize: '1rem', color: '#0f172a' }}>Activación y Entrega</h4>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b', lineHeight: '1.4' }}>
              Impartir la formación, dar de alta los accesos de las educadoras y activar la circular de familias con su cartel A4 de bienvenida.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
