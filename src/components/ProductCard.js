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

  return (
    <Link href={`/tienda/${producto.id}`} style={{ textDecoration: 'none' }}>
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "20px",
          padding: "30px",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          transform: hovered ? "translateY(-6px)" : "translateY(0)",
          boxShadow: hovered
            ? "0 12px 40px rgba(0,0,0,0.12)"
            : "0 10px 15px -3px rgba(0,0,0,0.05)",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Etiqueta de tipo */}
        <div style={{
          alignSelf: "flex-start",
          padding: "5px 12px",
          borderRadius: "20px",
          backgroundColor: `${producto.color}22`,
          color: producto.color,
          fontSize: "0.8rem",
          fontWeight: "bold",
          marginBottom: "20px",
        }}>
          {producto.type}
        </div>

        {/* Contenedor de la imagen / emoji */}
        <div style={{
          width: "100%",
          height: "200px",
          backgroundColor: "var(--color-bg-alt)",
          borderRadius: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "5rem",
          marginBottom: "20px",
          position: "relative",
          overflow: "hidden"
        }}>
          {hasImages ? (
            <>
              <Image 
                src={hovered && images.length > 1 ? hoverImage : mainImage} 
                alt={producto.name} 
                fill 
                style={{ 
                  objectFit: "cover",
                  transition: "opacity 0.3s ease-in-out" 
                }} 
                sizes="(max-width: 768px) 100vw, 300px"
              />
            </>
          ) : (
            producto.emoji
          )}
        </div>

        <h2 style={{ fontSize: "1.4rem", color: "var(--color-dark)", marginBottom: "10px" }}>
          {producto.name}
        </h2>
        
        <p style={{
          color: "var(--color-text-light)",
          fontSize: "0.95rem",
          flex: 1,
          marginBottom: "20px",
          lineHeight: "1.6",
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden"
        }}>
          {producto.description.split('\n')[0]}
        </p>

        <div style={{ fontSize: "2rem", fontWeight: "bold", color: "var(--color-dark)" }}>
          {producto.price}
        </div>
      </div>
    </Link>
  );
}
