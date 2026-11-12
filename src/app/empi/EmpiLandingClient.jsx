"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function EmpiLandingClient({ product, hasFullAccess }) {
  const { addToCart } = useCart();
  const [copiedCoupon, setCopiedCoupon] = useState(false);

  const handleCopyCoupon = () => {
    navigator.clipboard.writeText("EMPI2026");
    setCopiedCoupon(true);
    setTimeout(() => setCopiedCoupon(false), 2500);
  };

  const handleSubscribe = () => {
    // Añadimos el producto de suscripción al carrito con la nota del cupón
    addToCart(product, 1, { cupon_aplicado: "EMPI2026" });
  };

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 20px 80px" }}>
      {/* 1. Cabecera Co-Branding */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px 24px",
          backgroundColor: "#f8fafc",
          borderRadius: "20px",
          border: "1.5px solid #e2e8f0",
          marginBottom: "36px",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Image
            src="/logo_texto_corazon.png"
            alt="Musicabalú"
            width={160}
            height={40}
            style={{ objectFit: "contain" }}
            priority
          />
          <span style={{ fontSize: "1.4rem", color: "#cbd5e1", fontWeight: "300" }}>✕</span>
          <Image
            src="/empi-logo-cuadrado-naranja.png"
            alt="Escuela Infantil EMPI"
            width={90}
            height={45}
            style={{ objectFit: "contain" }}
          />
        </div>

        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            backgroundColor: "#fef3c7",
            color: "#92400e",
            padding: "6px 16px",
            borderRadius: "999px",
            fontSize: "0.85rem",
            fontWeight: "800",
            border: "1px solid #fde68a",
          }}
        >
          <span>⭐</span>
          <span>Centro Pionero en Innovación Pedagógica Musical</span>
        </div>
      </div>

      {/* Banner si ya está suscrito */}
      {hasFullAccess && (
        <div
          style={{
            backgroundColor: "#f0fdf4",
            border: "2px solid #86efac",
            borderRadius: "20px",
            padding: "24px 30px",
            textAlign: "center",
            marginBottom: "40px",
            boxShadow: "0 4px 20px rgba(34, 197, 94, 0.12)",
          }}
        >
          <span style={{ fontSize: "2.4rem", display: "block", marginBottom: "8px" }}>🎉</span>
          <h2
            style={{
              color: "#166534",
              fontSize: "1.35rem",
              fontWeight: "800",
              marginBottom: "6px",
              fontFamily: "var(--font-heading)",
            }}
          >
            ¡Ya tienes acceso activo a la Comunidad Musicabalú!
          </h2>
          <p style={{ color: "#15803d", fontSize: "0.98rem", lineHeight: "1.5", margin: "0 0 18px" }}>
            Tu cuenta ya cuenta con acceso libre e ilimitado a todas nuestras canciones, recitados pedagógicos y píldoras en vídeo.
          </p>
          <Link
            href="/comunidad/canciones"
            className="btn btn-cyan"
            style={{ padding: "10px 26px", fontWeight: "700", textDecoration: "none", display: "inline-block" }}
          >
            Ir a mi Biblioteca de Canciones 🎵
          </Link>
        </div>
      )}

      {/* 2. Hero Section */}
      <div style={{ textAlign: "center", marginBottom: "44px" }}>
        <h1
          style={{
            fontSize: "clamp(2rem, 4.5vw, 2.9rem)",
            fontWeight: "900",
            color: "#0f172a",
            margin: "0 auto 16px",
            lineHeight: "1.2",
            maxWidth: "880px",
            fontFamily: "var(--font-heading)",
          }}
        >
          ¿Qué canciones canta tu peque en{" "}
          <span style={{ color: "#f4436c", textDecoration: "none" }}>EMPI</span>?
        </h1>
        <p
          style={{
            fontSize: "clamp(1.05rem, 2vw, 1.25rem)",
            color: "#475569",
            lineHeight: "1.6",
            maxWidth: "740px",
            margin: "0 auto",
            fontWeight: "500",
          }}
        >
          Lleva la música viva de su aula al salón de tu casa. Melodías ricas en modos y ritmos (MLT de Edwin Gordon),
          juegos corporales y calma para compartir en familia. <strong>100% libre de pantallas</strong>.
        </p>
      </div>

      {/* 3. Tarjeta de Oferta Exclusiva EMPI */}
      <div
        style={{
          background: "linear-gradient(145deg, #ffffff 0%, #f0f9ff 100%)",
          border: "3.5px solid #00b2e3",
          borderRadius: "28px",
          padding: "clamp(24px, 4vw, 40px)",
          boxShadow: "0 12px 35px rgba(0, 178, 227, 0.15)",
          marginBottom: "50px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "36px",
          alignItems: "center",
        }}
      >
        <div>
          <div
            style={{
              display: "inline-block",
              background: "#f4436c",
              color: "#ffffff",
              fontSize: "0.85rem",
              fontWeight: "800",
              letterSpacing: "0.6px",
              padding: "6px 18px",
              borderRadius: "20px",
              marginBottom: "14px",
            }}
          >
            ⭐ VENTAJA EXCLUSIVA COMUNIDAD EMPI ⭐
          </div>
          <h2
            style={{
              fontSize: "clamp(1.5rem, 2.8vw, 2rem)",
              fontWeight: "900",
              color: "#0f172a",
              margin: "0 0 10px 0",
              fontFamily: "var(--font-heading)",
            }}
          >
            Acceso ilimitado a la comunidad MúsicaBalu durante un año
          </h2>
          <p style={{ color: "#475569", fontSize: "1rem", lineHeight: "1.55", margin: "0 0 18px" }}>
            Todas las canciones, recitados rítmicos, juegos y píldoras pedagógicas en vídeo para cantar y disfrutar juntos desde cualquier dispositivo.
          </p>

          <div style={{ display: "flex", alignItems: "baseline", gap: "16px", marginBottom: "8px" }}>
            <span style={{ fontSize: "1.4rem", color: "#94a3b8", textDecoration: "line-through", fontWeight: "600" }}>
              39 €/año
            </span>
            <span style={{ color: "#cbd5e1", fontSize: "1.2rem" }}>➔</span>
            <span style={{ fontSize: "2.8rem", fontWeight: "900", color: "#00b2e3", lineHeight: 1 }}>
              29 € <small style={{ fontSize: "1.1rem", fontWeight: "700", color: "#64748b" }}>/ año</small>
            </span>
          </div>
          <p style={{ color: "#64748b", fontSize: "0.92rem", margin: "0 0 18px" }}>
            Menos de 2,45 € al mes · Tarifa bonificada congelada para familias de EMPI
          </p>

          {/* Cupón */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "12px",
              backgroundColor: "#fef9e7",
              border: "2px solid #fed65e",
              padding: "8px 16px",
              borderRadius: "14px",
              marginBottom: "12px",
              flexWrap: "wrap",
            }}
          >
            <span style={{ fontSize: "0.9rem", color: "#854d0e", fontWeight: "600" }}>Cupón exclusivo:</span>
            <span
              style={{
                backgroundColor: "#fed65e",
                color: "#451a03",
                fontFamily: "monospace",
                fontWeight: "900",
                fontSize: "1.15rem",
                padding: "3px 12px",
                borderRadius: "8px",
                letterSpacing: "1px",
              }}
            >
              EMPI2026
            </span>
            <button
              onClick={handleCopyCoupon}
              style={{
                background: "#ffffff",
                border: "1px solid #d97706",
                color: "#92400e",
                padding: "4px 10px",
                borderRadius: "6px",
                fontSize: "0.8rem",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              {copiedCoupon ? "✓ ¡Copiado!" : "Copiar"}
            </button>
          </div>

          <p style={{ fontSize: "0.85rem", color: "#64748b", margin: 0 }}>
            ✨ Promoción de inicio de curso activa hasta el <strong>31 de diciembre</strong>.
          </p>
        </div>

        {/* Botón y llamada a la acción */}
        <div style={{ textAlign: "center" }}>
          <button
            onClick={handleSubscribe}
            className="btn btn-cyan"
            style={{
              width: "100%",
              maxWidth: "360px",
              padding: "18px 28px",
              fontSize: "1.25rem",
              fontWeight: "900",
              borderRadius: "999px",
              background: "linear-gradient(135deg, #00B2E3 0%, #008eb5 100%)",
              color: "#ffffff",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 8px 24px rgba(0, 178, 227, 0.35)",
              transition: "transform 0.15s ease",
            }}
          >
            Suscribirme con tarifa EMPI (29 €) →
          </button>
          <p style={{ fontSize: "0.82rem", color: "#94a3b8", marginTop: "12px", lineHeight: "1.4" }}>
            🔒 Pago seguro con Stripe · Cancela cuando quieras en 1 clic
          </p>
        </div>
      </div>

      {/* 4. Los Tres Pilares Pedagógicos */}
      <div style={{ marginBottom: "56px" }}>
        <h2
          style={{
            fontSize: "1.6rem",
            fontWeight: "800",
            color: "#0f172a",
            textAlign: "center",
            marginBottom: "28px",
            fontFamily: "var(--font-heading)",
          }}
        >
          ¿Por qué llevar MúsicaBalu al hogar?
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "22px",
          }}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              border: "3px solid #f4436c",
              borderRadius: "22px",
              padding: "26px",
              boxShadow: "0 6px 20px rgba(0,0,0,0.04)",
              textAlign: "center",
            }}
          >
            <span style={{ fontSize: "2.8rem", display: "block", marginBottom: "10px" }}>🎵</span>
            <h3
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "1.2rem",
                fontWeight: "800",
                color: "#0f172a",
                marginBottom: "8px",
              }}
            >
              Las canciones de su aula
            </h3>
            <p style={{ fontSize: "0.92rem", lineHeight: "1.55", color: "#475569", margin: 0 }}>
              Melodías ricas en modos y métricas (MLT de Edwin Gordon) que tu hijo ya reconoce y disfruta cada mañana en clase con su educadora.
            </p>
          </div>

          <div
            style={{
              backgroundColor: "#ffffff",
              border: "3px solid #00b2e3",
              borderRadius: "22px",
              padding: "26px",
              boxShadow: "0 6px 20px rgba(0,0,0,0.04)",
              textAlign: "center",
            }}
          >
            <span style={{ fontSize: "2.8rem", display: "block", marginBottom: "10px" }}>💡</span>
            <h3
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "1.2rem",
                fontWeight: "800",
                color: "#0f172a",
                marginBottom: "8px",
              }}
            >
              Píldoras y juegos en familia
            </h3>
            <p style={{ fontSize: "0.92rem", lineHeight: "1.55", color: "#475569", margin: 0 }}>
              Consejos, dinámicas prácticas y vídeos explicativos para transformar el despertar, el juego, la recogida de juguetes y el descanso nocturno.
            </p>
          </div>

          <div
            style={{
              backgroundColor: "#ffffff",
              border: "3px solid #aadb1e",
              borderRadius: "22px",
              padding: "26px",
              boxShadow: "0 6px 20px rgba(0,0,0,0.04)",
              textAlign: "center",
            }}
          >
            <span style={{ fontSize: "2.8rem", display: "block", marginBottom: "10px" }}>🚫📱</span>
            <h3
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "1.2rem",
                fontWeight: "800",
                color: "#0f172a",
                marginBottom: "8px",
              }}
            >
              Cero sobreestimulación
            </h3>
            <p style={{ fontSize: "0.92rem", lineHeight: "1.55", color: "#475569", margin: 0 }}>
              Diseñado exclusivamente para el oído y el movimiento natural. Sin pantallas que alteren la atención, la mirada ni el descanso de tu peque.
            </p>
          </div>
        </div>
      </div>

      {/* 5. Preguntas Frecuentes */}
      <div style={{ maxWidth: "800px", margin: "0 auto 50px" }}>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "800",
            color: "#0f172a",
            textAlign: "center",
            marginBottom: "26px",
            fontFamily: "var(--font-heading)",
          }}
        >
          Preguntas Frecuentes
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div style={{ backgroundColor: "#f8fafc", borderRadius: "14px", padding: "18px 22px", border: "1px solid #e2e8f0" }}>
            <h3 style={{ fontSize: "1rem", fontWeight: "800", color: "#0f172a", margin: "0 0 6px" }}>
              ¿Cómo accedo a los contenidos tras suscribirme?
            </h3>
            <p style={{ margin: 0, fontSize: "0.9rem", color: "#475569", lineHeight: "1.5" }}>
              Al completar la suscripción, tu cuenta se activa automáticamente. Podrás acceder desde tu móvil, tablet u ordenador iniciando sesión en musicabalu.com.
            </p>
          </div>

          <div style={{ backgroundColor: "#f8fafc", borderRadius: "14px", padding: "18px 22px", border: "1px solid #e2e8f0" }}>
            <h3 style={{ fontSize: "1rem", fontWeight: "800", color: "#0f172a", margin: "0 0 6px" }}>
              ¿Necesito tener conocimientos musicales?
            </h3>
            <p style={{ margin: 0, fontSize: "0.9rem", color: "#475569", lineHeight: "1.5" }}>
              Para nada. Todos los recursos están diseñados para madres y padres sin formación musical previa. Cada canción incluye guías prácticas y juegos sencillos para disfrutar juntos de forma natural.
            </p>
          </div>

          <div style={{ backgroundColor: "#f8fafc", borderRadius: "14px", padding: "18px 22px", border: "1px solid #e2e8f0" }}>
            <h3 style={{ fontSize: "1rem", fontWeight: "800", color: "#0f172a", margin: "0 0 6px" }}>
              ¿Tiene renovación automática o permanencia?
            </h3>
            <p style={{ margin: 0, fontSize: "0.9rem", color: "#475569", lineHeight: "1.5" }}>
              No hay ninguna permanencia. La suscripción se gestiona a través de la pasarela segura Stripe y puedes cancelar la renovación en cualquier momento con un solo clic desde tu panel de usuario.
            </p>
          </div>
        </div>
      </div>

      {/* 7. Llamada Final */}
      <div
        style={{
          backgroundColor: "#fdf2f4",
          border: "2px solid #fbcfe8",
          borderRadius: "24px",
          padding: "36px 24px",
          textAlign: "center",
        }}
      >
        <h3
          style={{
            fontSize: "1.4rem",
            fontWeight: "800",
            color: "#9d174d",
            margin: "0 0 10px",
            fontFamily: "var(--font-heading)",
          }}
        >
          ¿Tienes alguna duda o necesitas ayuda?
        </h3>
        <p style={{ color: "#475569", fontSize: "0.95rem", margin: "0 0 20px" }}>
          Escríbenos con total confianza y te ayudaremos encantados.
        </p>
        <a
          href="mailto:hola@musicabalu.com?subject=Consulta%20Familia%20EMPI"
          className="btn btn-primary"
          style={{
            padding: "12px 28px",
            fontSize: "0.95rem",
            fontWeight: "800",
            borderRadius: "30px",
            textDecoration: "none",
            display: "inline-block",
          }}
        >
          Escribir a hola@musicabalu.com ✉️
        </a>
      </div>
    </div>
  );
}
