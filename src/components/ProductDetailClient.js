"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

export default function ProductDetailClient({ product }) {
  const { addToCart } = useCart();
  const images = product.imageUrl ? product.imageUrl.split(",").map(s => s.trim()) : [];
  const hasImages = images.length > 0 && images[0].includes("/");
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  
  // Variantes disponibles hardcodeadas según el producto
  const isCamiseta = product.name.includes("Camiseta");
  const isBody = product.name.includes("Body");

  const availableColors = isCamiseta ? ["Blanca", "Rosa"] : [];
  const availableSizes = isCamiseta 
    ? ["6-12m", "12-18m", "18-24m"] 
    : isBody 
      ? ["3-6m", "6-12m", "12-18m"] 
      : [];

  const [selectedColor, setSelectedColor] = useState(availableColors.length > 0 ? "" : null);
  const [selectedSize, setSelectedSize] = useState(availableSizes.length > 0 ? "" : null);

  const isCheckoutDisabled = 
    (availableColors.length > 0 && !selectedColor) || 
    (availableSizes.length > 0 && !selectedSize);

  const customMetadata = {};
  if (selectedColor) customMetadata.Color = selectedColor;
  if (selectedSize) customMetadata.Talla = selectedSize;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "50px" }}>
      {/* Columna Izquierda: Galería */}
      <div>
        <div style={{ 
          width: "100%", 
          height: "400px", 
          backgroundColor: "var(--color-bg-alt)", 
          borderRadius: "16px",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "8rem"
        }}>
          {hasImages ? (
            <Image 
              src={images[currentImageIndex]} 
              alt={product.name} 
              fill 
              style={{ objectFit: "cover" }} 
              sizes="(max-width: 768px) 100vw, 500px"
            />
          ) : (
            product.imageUrl
          )}
        </div>
        
        {/* Miniaturas */}
        {hasImages && images.length > 1 && (
          <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
            {images.map((img, i) => (
              <div 
                key={i} 
                onClick={() => setCurrentImageIndex(i)}
                style={{ 
                  width: "80px", 
                  height: "80px", 
                  position: "relative", 
                  borderRadius: "8px", 
                  overflow: "hidden",
                  cursor: "pointer",
                  border: currentImageIndex === i ? "3px solid var(--color-pink)" : "3px solid transparent",
                  transition: "border 0.2s"
                }}
              >
                <Image src={img} alt={`Vista ${i+1}`} fill style={{ objectFit: "cover" }} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Columna Derecha: Info y Compra */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h1 style={{ fontSize: "2.2rem", color: "var(--color-dark)", marginBottom: "15px" }}>
          {product.name}
        </h1>
        <p style={{ color: "var(--color-text-light)", fontSize: "1.1rem", lineHeight: "1.6", marginBottom: "30px", whiteSpace: "pre-wrap" }}>
          {product.description}
        </p>

        <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "var(--color-dark)", marginBottom: "30px" }}>
          {product.formattedPrice}
        </div>

        {/* Variantes */}
        {availableColors.length > 0 && (
          <div style={{ marginBottom: "20px" }}>
            <strong style={{ display: "block", marginBottom: "10px", color: "var(--color-dark)" }}>Color:</strong>
            <div style={{ display: "flex", gap: "10px" }}>
              {availableColors.map(color => (
                <button 
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "8px",
                    border: selectedColor === color ? "2px solid var(--color-pink)" : "1px solid var(--color-border)",
                    backgroundColor: selectedColor === color ? "var(--color-pink)" : "white",
                    color: selectedColor === color ? "white" : "var(--color-dark)",
                    cursor: "pointer",
                    fontWeight: "bold",
                    transition: "all 0.2s"
                  }}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
        )}

        {availableSizes.length > 0 && (
          <div style={{ marginBottom: "30px" }}>
            <strong style={{ display: "block", marginBottom: "10px", color: "var(--color-dark)" }}>Talla:</strong>
            <div style={{ display: "flex", gap: "10px" }}>
              {availableSizes.map(size => (
                <button 
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "8px",
                    border: selectedSize === size ? "2px solid var(--color-cyan)" : "1px solid var(--color-border)",
                    backgroundColor: selectedSize === size ? "var(--color-cyan)" : "white",
                    color: selectedSize === size ? "white" : "var(--color-dark)",
                    cursor: "pointer",
                    fontWeight: "bold",
                    transition: "all 0.2s"
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        <button 
          onClick={() => addToCart(product, 1, customMetadata)}
          disabled={isCheckoutDisabled}
          className={`btn ${
            product.type === "printful_merch" || product.type === "physical_kit" ? "btn-pink" :
            product.type === "digital" || product.type === "subscription" ? "btn-cyan" :
            "btn-dark"
          }`}
          style={{ width: "100%", padding: "15px", fontSize: "1.2rem", fontWeight: "bold" }}
        >
          Añadir al Carrito 🛒
        </button>
        {isCheckoutDisabled && (
          <p style={{ color: "red", fontSize: "0.85rem", marginTop: "10px" }}>
            * Por favor, selecciona las opciones arriba antes de comprar.
          </p>
        )}

        {/* Botón de Guía de Tallas */}
        {(isCamiseta || isBody) && (
          <div style={{ marginTop: "30px" }}>
            <button 
              onClick={() => setShowSizeGuide(!showSizeGuide)}
              style={{
                background: "none",
                border: "none",
                color: "var(--color-dark)",
                textDecoration: "underline",
                cursor: "pointer",
                fontSize: "1rem",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "0"
              }}
            >
              📏 {showSizeGuide ? "Ocultar guía de tallas" : "Ver guía de tallas"}
            </button>
            
            {showSizeGuide && (
              <div style={{ 
                marginTop: "15px", 
                padding: "20px", 
                backgroundColor: "var(--color-bg-alt)", 
                borderRadius: "12px",
                fontSize: "0.9rem",
                color: "var(--color-dark)"
              }}>
                <p style={{ marginBottom: "15px" }}>
                  Las medidas pueden variar hasta 2.5 cm. Te recomendamos medir una prenda que ya tengas en casa y compararla.
                </p>
                
                <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "20px", textAlign: "left" }}>
                  <thead>
                    <tr style={{ borderBottom: "2px solid var(--color-border)" }}>
                      <th style={{ padding: "8px" }}>Talla</th>
                      <th style={{ padding: "8px" }}>Largo (A)</th>
                      {isBody && <th style={{ padding: "8px" }}>Ancho (B)</th>}
                      <th style={{ padding: "8px" }}>Peso aprox.</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isCamiseta ? (
                      <>
                        <tr style={{ borderBottom: "1px solid var(--color-border)" }}><td style={{ padding: "8px" }}>6-12m</td><td style={{ padding: "8px" }}>31 cm</td><td style={{ padding: "8px" }}>7.2 - 10 kg</td></tr>
                        <tr style={{ borderBottom: "1px solid var(--color-border)" }}><td style={{ padding: "8px" }}>12-18m</td><td style={{ padding: "8px" }}>33.7 cm</td><td style={{ padding: "8px" }}>10 - 12 kg</td></tr>
                        <tr style={{ borderBottom: "1px solid var(--color-border)" }}><td style={{ padding: "8px" }}>18-24m</td><td style={{ padding: "8px" }}>36.2 cm</td><td style={{ padding: "8px" }}>12 - 13.6 kg</td></tr>
                      </>
                    ) : (
                      <>
                        <tr style={{ borderBottom: "1px solid var(--color-border)" }}><td style={{ padding: "8px" }}>3-6m</td><td style={{ padding: "8px" }}>45 cm</td><td style={{ padding: "8px" }}>23.8 cm</td><td style={{ padding: "8px" }}>5.4 - 7.2 kg</td></tr>
                        <tr style={{ borderBottom: "1px solid var(--color-border)" }}><td style={{ padding: "8px" }}>6-12m</td><td style={{ padding: "8px" }}>48.6 cm</td><td style={{ padding: "8px" }}>25 cm</td><td style={{ padding: "8px" }}>7.2 - 10 kg</td></tr>
                        <tr style={{ borderBottom: "1px solid var(--color-border)" }}><td style={{ padding: "8px" }}>12-18m</td><td style={{ padding: "8px" }}>51.4 cm</td><td style={{ padding: "8px" }}>26.4 cm</td><td style={{ padding: "8px" }}>10 - 12 kg</td></tr>
                      </>
                    )}
                  </tbody>
                </table>
                
                <div style={{ position: "relative", width: "100%", height: "250px", marginTop: "15px" }}>
                  <Image 
                    src={isCamiseta ? "/imagenes/merchandising/midete_cam.png" : "/imagenes/merchandising/midete_body.png"} 
                    alt="Cómo medir" 
                    fill 
                    style={{ objectFit: "contain" }} 
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Aviso de envíos a España */}
        {(product.type === "printful_merch" || product.type === "physical_kit") && (
          <div style={{
            marginTop: "20px",
            backgroundColor: "rgba(0, 178, 227, 0.1)",
            border: "1px solid rgba(0, 178, 227, 0.3)",
            borderRadius: "12px",
            padding: "16px",
            display: "flex",
            gap: "12px",
            alignItems: "flex-start"
          }}>
            <span style={{ fontSize: "1.2rem" }}>🌍</span>
            <div>
              <strong style={{ display: "block", color: "var(--color-dark)", marginBottom: "4px", fontSize: "0.95rem" }}>
                Solo envíos a España
              </strong>
              <span style={{ color: "var(--color-text-light)", fontSize: "0.85rem", lineHeight: "1.5", display: "block" }}>
                Actualmente, los productos físicos de nuestra tienda solo están disponibles para envíos dentro de España.
              </span>
            </div>
          </div>
        )}

        {/* Política de devoluciones condicional */}
        {product.isClothing && (
          <div style={{
            marginTop: "40px",
            backgroundColor: "rgba(239, 68, 68, 0.05)",
            border: "1px solid rgba(239, 68, 68, 0.2)",
            borderRadius: "12px",
            padding: "16px",
            display: "flex",
            gap: "12px",
            alignItems: "flex-start"
          }}>
            <span style={{ fontSize: "1.2rem" }}>⚠️</span>
            <div>
              <strong style={{ display: "block", color: "var(--color-dark)", marginBottom: "4px", fontSize: "0.95rem" }}>
                Política de Devoluciones
              </strong>
              <span style={{ color: "var(--color-text-light)", fontSize: "0.85rem", lineHeight: "1.5", display: "block" }}>
                Esta prenda se fabrica exclusivamente bajo demanda con mucho cariño para ti. Por motivos ecológicos, <strong>no podemos aceptar devoluciones por error de talla</strong>. Asegúrate de elegir bien.
              </span>
            </div>
          </div>
        )}

        <div style={{
          marginTop: "20px",
          padding: "15px",
          backgroundColor: "var(--color-bg-alt)",
          borderRadius: "8px",
          fontSize: "0.9rem",
          color: "var(--color-text-light)",
          textAlign: "center"
        }}>
          ¿Te surge cualquier pregunta sobre este producto? No dudes en escribirnos a <a href="mailto:musicabalu@gmail.com" style={{ textDecoration: "underline", color: "var(--color-dark)" }}>musicabalu@gmail.com</a>
        </div>
      </div>
    </div>
  );
}
