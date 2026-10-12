"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ producto }) {
  const [hovered, setHovered] = useState(false);

  // Parse images if it's a comma-separated string
  const images = producto.emoji ? producto.emoji.split(',').map(s => s.trim()) : [];
  const hasImages = images.length > 0 && images[0].includes('/');
  const mainImage = images[0];
  const hoverImage = images.length > 1 ? images[1] : mainImage;

  const isMensual = producto.id === 'sub_mensual';
  const isAnual = producto.id === 'sub_anual';
  const isSub = producto.isSubscription;
  const alreadySubscribed = producto.hasFullAccess && isSub;

  const targetUrl = alreadySubscribed ? "/comunidad/canciones" : `/tienda/${producto.id}`;

  return (
    <Link href={targetUrl} style={{ textDecoration: 'none' }}>
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "24px",
          padding: "32px",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
          transform: hovered ? "translateY(-6px)" : "translateY(0)",
          border: alreadySubscribed 
            ? "2px solid #86efac" 
            : isMensual 
              ? "2px solid var(--color-cyan, #00B2E3)" 
              : "1.5px solid var(--color-border, #e2e8f0)",
          boxShadow: hovered
            ? "0 16px 40px rgba(0,0,0,0.1)"
            : "0 8px 24px rgba(0,0,0,0.04)",
          position: "relative"
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Etiqueta de tipo / estado */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          {alreadySubscribed ? (
            <span style={{
              padding: "6px 14px",
              borderRadius: "20px",
              backgroundColor: "#dcfce7",
              color: "#15803d",
              fontSize: "0.85rem",
              fontWeight: "bold",
            }}>
              ✅ Incluido en tu cuenta
            </span>
          ) : isMensual ? (
            <span style={{
              padding: "6px 14px",
              borderRadius: "20px",
              backgroundColor: "rgba(0, 178, 227, 0.12)",
              color: "var(--color-cyan, #00B2E3)",
              fontSize: "0.85rem",
              fontWeight: "bold",
            }}>
              🎉 Oferta Fundadores
            </span>
          ) : isAnual ? (
            <span style={{
              padding: "6px 14px",
              borderRadius: "20px",
              backgroundColor: "#fef3c7",
              color: "#b45309",
              fontSize: "0.85rem",
              fontWeight: "bold",
            }}>
              ⭐ Máximo Ahorro (Anual)
            </span>
          ) : (
            <span style={{
              padding: "6px 14px",
              borderRadius: "20px",
              backgroundColor: `${producto.color}22`,
              color: producto.color,
              fontSize: "0.85rem",
              fontWeight: "bold",
            }}>
              {producto.type}
            </span>
          )}

          <span style={{ fontSize: "1.8rem" }}>
            {producto.emoji}
          </span>
        </div>

        <h2 style={{ fontSize: "1.5rem", color: "var(--color-dark)", marginBottom: "12px", fontFamily: "var(--font-heading)", fontWeight: "800" }}>
          {producto.name}
        </h2>
        
        <p style={{
          color: "var(--color-text-light)",
          fontSize: "0.95rem",
          flex: 1,
          marginBottom: "24px",
          lineHeight: "1.6",
        }}>
          {producto.description}
        </p>

        {/* Sección de Precio */}
        <div style={{ borderTop: "1px solid var(--color-border, #e2e8f0)", paddingTop: "20px", marginTop: "auto" }}>
          {alreadySubscribed ? (
            <div>
              <span style={{ fontSize: "1.3rem", fontWeight: "bold", color: "#16a34a" }}>
                Acceso Activo e Ilimitado
              </span>
              <span style={{ display: "block", fontSize: "0.85rem", color: "var(--color-text-light)", marginTop: "4px" }}>
                Disfruta de todas las canciones y píldoras
              </span>
            </div>
          ) : isMensual ? (
            <div>
              <div style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
                <span style={{ fontSize: "1.2rem", color: "#94a3b8", textDecoration: "line-through" }}>5,90 €</span>
                <span style={{ fontSize: "2.3rem", fontWeight: "bold", color: "var(--color-dark)" }}>3,90 €</span>
                <span style={{ fontSize: "1rem", color: "var(--color-text-light)" }}>/ mes</span>
              </div>
              <span style={{ display: "block", fontSize: "0.85rem", color: "var(--color-cyan, #00B2E3)", fontWeight: "bold", marginTop: "4px" }}>
                Precio congelado de por vida
              </span>
            </div>
          ) : isAnual ? (
            <div>
              <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                <span style={{ fontSize: "2.3rem", fontWeight: "bold", color: "var(--color-dark)" }}>39,00 €</span>
                <span style={{ fontSize: "1rem", color: "var(--color-text-light)" }}>/ año</span>
              </div>
              <span style={{ display: "block", fontSize: "0.85rem", color: "#16a34a", fontWeight: "bold", marginTop: "4px" }}>
                Equivale a 3,25 €/mes (Ahorras 2 meses)
              </span>
            </div>
          ) : (
            <div style={{ fontSize: "2rem", fontWeight: "bold", color: "var(--color-dark)" }}>
              {producto.price}
            </div>
          )}

          {/* Botón CTA dentro de la tarjeta */}
          <div style={{ marginTop: "18px" }}>
            <span
              className={`btn ${
                alreadySubscribed ? "btn-outline" :
                isMensual ? "btn-cyan" : "btn-dark"
              }`}
              style={{
                width: "100%",
                padding: "12px",
                display: "block",
                textAlign: "center",
                fontWeight: "bold",
                borderRadius: "30px",
                fontSize: "1rem"
              }}
            >
              {alreadySubscribed ? "Ir a la Biblioteca 🎵" : "Ver detalles y suscribirme →"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
