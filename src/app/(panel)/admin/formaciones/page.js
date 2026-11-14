import Link from 'next/link';
import React from 'react';

export const metadata = {
  title: 'Formaciones · Centro de Mando | Admin Musicabalú',
};

export default function FormacionesHubAdminPage() {
  return (
    <div style={{ maxWidth: '1150px', margin: '0 auto', padding: '30px 20px 80px' }}>
      {/* Botón Volver */}
      <div style={{ marginBottom: '20px' }}>
        <Link
          href="/admin"
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
          ← Volver al Panel de Control
        </Link>
      </div>

      {/* Cabecera Principal */}
      <header style={{ marginBottom: '36px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: '#faf5ff',
          color: '#7e22ce',
          fontWeight: '800',
          fontSize: '0.85rem',
          padding: '5px 14px',
          borderRadius: '999px',
          marginBottom: '12px',
          border: '1.5px solid #e9d8fd'
        }}>
          <span>🎓</span>
          <span>Área Estratégica de Formaciones Musicabalú</span>
        </div>
        <h1 style={{ fontSize: '2.4rem', fontWeight: '900', color: '#0f172a', margin: '0 0 10px 0', fontFamily: 'var(--font-heading)' }}>
          Formaciones
        </h1>
        <p style={{ color: '#475569', fontSize: '1.1rem', lineHeight: '1.6', margin: 0, maxWidth: '900px' }}>
          Gestión integral de la línea formativa presencial y digital de Musicabalú: proyectos piloto en escuelas infantiles, programas académicos de conservatorio y catálogo de propuestas para expansión territorial.
        </p>
      </header>

      {/* LAS 3 SECCIONES PRINCIPALES */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '24px',
        marginBottom: '40px'
      }}>

        {/* 1. ATERRIZAJE EN EMPI */}
        <div style={{
          backgroundColor: 'white',
          border: '2px solid #FED65E',
          borderRadius: '18px',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: '0 8px 24px rgba(254, 214, 94, 0.15)',
          transition: 'transform 0.2s'
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{
                backgroundColor: '#fef3c7',
                color: '#92400e',
                fontSize: '0.78rem',
                fontWeight: '800',
                padding: '4px 12px',
                borderRadius: '999px',
                border: '1px solid #fde68a'
              }}>
                CENTRO PILOTO EN MARCHA
              </span>
              <span style={{ fontSize: '1.6rem' }}>🚀</span>
            </div>
            <h2 style={{ fontSize: '1.4rem', color: '#0f172a', margin: '0 0 10px 0', fontWeight: '800' }}>
              Aterrizaje en EMPI
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#64748b', lineHeight: '1.5', margin: '0 0 16px 0' }}>
              Centro de mando unificado para implantar Musicabalú en la Escuela Infantil EMPI: acuerdo marco, circular oficial para familias, cartel A4 con código QR y guía de rutinas de aula.
            </p>
            <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '0.85rem', color: '#334155', lineHeight: '1.6' }}>
              <li>Acuerdo de formación y cesión de espacios.</li>
              <li>Editor de circular y textos para redes sociales.</li>
              <li>Cartel A4 imprimible con código QR y cupón <code>EMPI2026</code>.</li>
              <li>Guía pedagógica de rutinas de aula para educadoras.</li>
            </ul>
          </div>
          <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #f1f5f9' }}>
            <Link
              href="/admin/aterrizaje-empi"
              style={{
                display: 'block',
                textAlign: 'center',
                backgroundColor: '#fed65e',
                color: '#451a03',
                padding: '12px 18px',
                borderRadius: '12px',
                fontWeight: '800',
                fontSize: '0.92rem',
                textDecoration: 'none'
              }}
            >
              Abrir Aterrizaje en EMPI →
            </Link>
          </div>
        </div>

        {/* 2. PROGRAMAS PARA CONSERVATORIOS */}
        <div style={{
          backgroundColor: 'white',
          border: '2px solid #805ad5',
          borderRadius: '18px',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: '0 8px 24px rgba(128, 90, 213, 0.12)',
          transition: 'transform 0.2s'
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{
                backgroundColor: '#faf5ff',
                color: '#6b21a8',
                fontSize: '0.78rem',
                fontWeight: '800',
                padding: '4px 12px',
                borderRadius: '999px',
                border: '1px solid #e9d8fd'
              }}>
                NIVEL SUPERIOR / PRO
              </span>
              <span style={{ fontSize: '1.6rem' }}>🏛️</span>
            </div>
            <h2 style={{ fontSize: '1.4rem', color: '#0f172a', margin: '0 0 10px 0', fontWeight: '800' }}>
              Programas para Conservatorios
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#64748b', lineHeight: '1.5', margin: '0 0 16px 0' }}>
              Propuesta formativa de rigor académico para Conservatorios Superiores de Música y estudiantes de Pedagogía Musical.
            </p>
            <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '0.85rem', color: '#334155', lineHeight: '1.6' }}>
              <li><strong>Curso Superior:</strong> MLT de Gordon y Audiation en Primera Infancia.</li>
              <li>Temario en 4 módulos: Neurociencia, Modalidad, Laban y Curva de Sesión.</li>
              <li>Dossier técnico para alumnado de conservatorio.</li>
              <li>Propuesta formal lista para enviar al CSM Murcia.</li>
            </ul>
          </div>
          <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #f1f5f9' }}>
            <Link
              href="/admin/formaciones/conservatorios"
              style={{
                display: 'block',
                textAlign: 'center',
                backgroundColor: '#805ad5',
                color: 'white',
                padding: '12px 18px',
                borderRadius: '12px',
                fontWeight: '800',
                fontSize: '0.92rem',
                textDecoration: 'none'
              }}
            >
              Ver Programas para Conservatorios →
            </Link>
          </div>
        </div>

        {/* 3. PROPUESTAS DE FORMACIONES */}
        <div style={{
          backgroundColor: 'white',
          border: '2px solid #00B2E3',
          borderRadius: '18px',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: '0 8px 24px rgba(0, 178, 227, 0.12)',
          transition: 'transform 0.2s'
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{
                backgroundColor: '#e0f2fe',
                color: '#0369a1',
                fontSize: '0.78rem',
                fontWeight: '800',
                padding: '4px 12px',
                borderRadius: '999px',
                border: '1px solid #bae6fd'
              }}>
                NUEVA ESTRATEGIA B2B + B2C
              </span>
              <span style={{ fontSize: '1.6rem' }}>📑</span>
            </div>
            <h2 style={{ fontSize: '1.4rem', color: '#0f172a', margin: '0 0 10px 0', fontWeight: '800' }}>
              Propuestas de Formaciones
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#64748b', lineHeight: '1.5', margin: '0 0 16px 0' }}>
              Modelos de negociación para centros educativos: privados, públicos (CPR), con cesión de espacio o FUNDAE, y la transición a Centro Colaborador oficial.
            </p>
            <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '0.85rem', color: '#334155', lineHeight: '1.6' }}>
              <li>Resolución de FUNDAE y fórmula "Espacio por plazas".</li>
              <li>Análisis honesto del CPR: pros, contras y tarifas.</li>
              <li>Negociación de la Licencia de Centro Colaborador.</li>
              <li>Campaña con descuento limitado para familias (B2C).</li>
            </ul>
          </div>
          <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #f1f5f9' }}>
            <Link
              href="/admin/formaciones/propuestas"
              style={{
                display: 'block',
                textAlign: 'center',
                backgroundColor: 'var(--color-cyan, #00B2E3)',
                color: 'white',
                padding: '12px 18px',
                borderRadius: '12px',
                fontWeight: '800',
                fontSize: '0.92rem',
                textDecoration: 'none'
              }}
            >
              Abrir Propuestas de Formaciones →
            </Link>
          </div>
        </div>

      </div>

      {/* ARQUITECTURA TÉCNICA MULTI-CURSO */}
      <section style={{
        backgroundColor: '#f8fafc',
        border: '1.5px solid #e2e8f0',
        borderRadius: '16px',
        padding: '24px 28px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <span style={{ fontSize: '1.3rem' }}>🧭</span>
          <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#0f172a', fontWeight: '800' }}>
            Visión Técnica: Arquitectura de Formaciones en Musicabalú
          </h3>
        </div>
        <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: '1.6', margin: '0 0 14px 0' }}>
          La plataforma online (<code>/formaciones/plataforma</code>) está diseñada de forma modular:
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
          <div style={{ backgroundColor: 'white', padding: '12px 16px', borderRadius: '10px', border: '1px solid #cbd5e1' }}>
            <strong style={{ color: 'var(--color-cyan, #00B2E3)', fontSize: '0.88rem', display: 'block', marginBottom: '2px' }}>🎵 Núcleo Compartido</strong>
            <span style={{ fontSize: '0.82rem', color: '#64748b' }}>Biblioteca transversal de canciones y recitados comunes a todos los perfiles.</span>
          </div>
          <div style={{ backgroundColor: 'white', padding: '12px 16px', borderRadius: '10px', border: '1px solid #cbd5e1' }}>
            <strong style={{ color: 'var(--color-pink, #F4436C)', fontSize: '0.88rem', display: 'block', marginBottom: '2px' }}>📚 Apuntes por Colectivo</strong>
            <span style={{ fontSize: '0.82rem', color: '#64748b' }}>Presentaciones de Google Slides y guías de aula diferenciadas según el curso activo.</span>
          </div>
          <div style={{ backgroundColor: 'white', padding: '12px 16px', borderRadius: '10px', border: '1px solid #cbd5e1' }}>
            <strong style={{ color: '#805ad5', fontSize: '0.88rem', display: 'block', marginBottom: '2px' }}>🔐 Acceso Individual</strong>
            <span style={{ fontSize: '0.82rem', color: '#64748b' }}>Cada educadora o alumno matriculado accede con su cuenta sin ver cursos no adquiridos.</span>
          </div>
        </div>
      </section>

    </div>
  );
}
