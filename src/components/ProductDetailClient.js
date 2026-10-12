"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function ProductDetailClient({ product }) {
  const { addToCart } = useCart();
  const images = product.imageUrl ? product.imageUrl.split(",").map(s => s.trim()) : [];
  const hasImages = images.length > 0 && images[0].includes("/");

  const isMensual = product.id === 'sub_mensual';
  const isAnual = product.id === 'sub_anual';
  const isSub = product.type === "subscription";
  const alreadySubscribed = product.hasFullAccess && isSub;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "50px", alignItems: "start" }}>
      {/* Columna Izquierda: Imagen / Emoji */}
      <div>
        <div style={{ 
          width: "100%", 
          height: "360px", 
          backgroundColor: isMensual ? "rgba(0, 178, 227, 0.08)" : "#fef3c7", 
          borderRadius: "24px",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "8rem",
          boxShadow: "0 8px 30px rgba(0,0,0,0.05)",
          border: isMensual ? "2px solid rgba(0, 178, 227, 0.2)" : "2px solid rgba(245, 158, 11, 0.2)"
        }}>
          {hasImages ? (
            <Image 
              src={images[0]} 
              alt={product.name} 
              fill 
              style={{ objectFit: "cover" }} 
              sizes="(max-width: 768px) 100vw, 500px"
            />
          ) : (
            product.imageUrl || "✨"
          )}
        </div>
      </div>

      {/* Columna Derecha: Información y Compra */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        {/* Badge */}
        <div style={{ marginBottom: "15px" }}>
          {alreadySubscribed ? (
            <span style={{
              padding: "6px 14px",
              borderRadius: "20px",
              backgroundColor: "#dcfce7",
              color: "#15803d",
              fontSize: "0.85rem",
              fontWeight: "bold",
            }}>
              ✅ Ya tienes acceso activo
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
              🎉 Oferta Especial Familias Fundadoras
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
              ⭐ Máximo Ahorro (2 meses gratis)
            </span>
          ) : (
            <span style={{
              padding: "6px 14px",
              borderRadius: "20px",
              backgroundColor: "var(--color-bg-alt)",
              color: "var(--color-dark)",
              fontSize: "0.85rem",
              fontWeight: "bold",
            }}>
              Suscripción Digital
            </span>
          )}
        </div>

        <h1 style={{ fontSize: "2.2rem", color: "var(--color-dark)", marginBottom: "15px", fontFamily: "var(--font-heading)", fontWeight: "800" }}>
          {product.name}
        </h1>

        {/* Sección de Precio */}
        <div style={{ marginBottom: "25px" }}>
          {isMensual ? (
            <div>
              <div style={{ display: "flex", alignItems: "baseline", gap: "12px" }}>
                <span style={{ fontSize: "1.4rem", color: "#94a3b8", textDecoration: "line-through" }}>5,90 €</span>
                <span style={{ fontSize: "2.8rem", fontWeight: "bold", color: "var(--color-dark)" }}>3,90 €</span>
                <span style={{ fontSize: "1.2rem", color: "var(--color-text-light)" }}>/ mes</span>
              </div>
              <p style={{ margin: "6px 0 0", color: "var(--color-cyan, #00B2E3)", fontWeight: "bold", fontSize: "0.95rem" }}>
                🔒 Precio congelado para siempre mientras mantengas la suscripción.
              </p>
            </div>
          ) : isAnual ? (
            <div>
              <div style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
                <span style={{ fontSize: "2.8rem", fontWeight: "bold", color: "var(--color-dark)" }}>39,00 €</span>
                <span style={{ fontSize: "1.2rem", color: "var(--color-text-light)" }}>/ año</span>
              </div>
              <p style={{ margin: "6px 0 0", color: "#16a34a", fontWeight: "bold", fontSize: "0.95rem" }}>
                ✨ Equivale a 3,25 €/mes (Ahorras más de 2 meses enteros).
              </p>
            </div>
          ) : (
            <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "var(--color-dark)" }}>
              {product.formattedPrice}
            </div>
          )}
        </div>

        {/* Botón de Compra o Estado de Acceso */}
        {alreadySubscribed ? (
          <div style={{
            backgroundColor: "#f0fdf4",
            border: "2px solid #86efac",
            borderRadius: "18px",
            padding: "24px",
            textAlign: "center",
            marginBottom: "25px"
          }}>
            <p style={{ color: "#166534", fontWeight: "800", fontSize: "1.15rem", margin: "0 0 8px", fontFamily: "var(--font-heading)" }}>
              ✅ Ya tienes acceso completo a la Comunidad Musicabalú
            </p>
            <p style={{ color: "#15803d", fontSize: "0.95rem", lineHeight: "1.5", margin: "0 0 18px" }}>
              Tu cuenta ya tiene todas las canciones, recitados y píldoras incluidas con tus clases presenciales o tu suscripción activa.
            </p>
            <Link 
              href="/comunidad/canciones" 
              className="btn btn-cyan" 
              style={{ padding: "12px 28px", fontWeight: "bold", textDecoration: "none", display: "inline-block", borderRadius: "30px" }}
            >
              Ir a mis canciones 🎵
            </Link>
          </div>
        ) : (
          <div style={{ marginBottom: "25px" }}>
            <button 
              onClick={() => addToCart(product, 1, {})}
              className="btn btn-cyan"
              style={{ width: "100%", padding: "16px", fontSize: "1.25rem", fontWeight: "800", borderRadius: "30px", boxShadow: "0 4px 18px rgba(0, 178, 227, 0.3)" }}
            >
              Suscribirme ahora ✨
            </button>
            <p style={{ textAlign: "center", color: "var(--color-text-light)", fontSize: "0.85rem", marginTop: "10px" }}>
              Pago 100% seguro con Stripe · Cancela cuando quieras en 1 clic
            </p>
          </div>
        )}

        {/* Descripción detallada */}
        <div style={{ 
          backgroundColor: "white", 
          borderRadius: "18px", 
          padding: "24px", 
          border: "1.5px solid var(--color-border, #e2e8f0)",
          marginBottom: "25px" 
        }}>
          <h3 style={{ fontSize: "1.15rem", color: "var(--color-dark)", marginBottom: "12px", fontFamily: "var(--font-heading)", fontWeight: "700" }}>
            ¿Qué incluye la suscripción?
          </h3>
          <ul style={{ margin: "0 0 16px", paddingLeft: "20px", color: "var(--color-text)", fontSize: "0.98rem", lineHeight: "1.7" }}>
            <li><strong>Repertorio completo:</strong> Más de 30 canciones y recitados en diversos modos y métricas.</li>
            <li><strong>Píldoras en vídeo:</strong> Explicaciones pedagógicas y consejos prácticos para jugar en casa.</li>
            <li><strong>Goteo semanal continuo:</strong> Cada semana incorporamos nuevos contenidos.</li>
            <li><strong>Acceso multidispositivo:</strong> Desde el móvil, tablet o cualquier ordenador en cualquier momento.</li>
          </ul>
          <p style={{ color: "var(--color-text-light)", fontSize: "0.95rem", lineHeight: "1.6", margin: 0, whiteSpace: "pre-wrap" }}>
            {product.description}
          </p>
        </div>

        <div style={{
          padding: "16px",
          backgroundColor: "var(--color-bg-alt)",
          borderRadius: "12px",
          fontSize: "0.88rem",
          color: "var(--color-text-light)",
          textAlign: "center"
        }}>
          ¿Tienes alguna duda sobre la suscripción? Escríbenos con total confianza a <a href="mailto:hola@musicabalu.com" style={{ textDecoration: "underline", color: "var(--color-dark)", fontWeight: "bold" }}>hola@musicabalu.com</a>
        </div>
      </div>
    </div>
  );
}
