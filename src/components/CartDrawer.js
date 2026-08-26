"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isCartOpen) return null;

  const handleCheckout = async () => {
    setIsProcessing(true);
    try {
      const res = await fetch("/api/cart-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cart }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else if (data.error) {
        alert(data.error);
        setIsProcessing(false);
      }
    } catch (error) {
      console.error(error);
      alert("Error al conectar con la pasarela de pago.");
      setIsProcessing(false);
    }
  };

  const hasPhysicalItems = cart.some(item => item.type === 'printful_merch' || item.type === 'physical_kit');

  return (
    <>
      <div 
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          zIndex: 999,
          backdropFilter: "blur(2px)"
        }}
        onClick={() => setIsCartOpen(false)}
      />
      
      <div style={{
        position: "fixed",
        top: 0, right: 0, bottom: 0,
        width: "100%",
        maxWidth: "400px",
        backgroundColor: "white",
        zIndex: 1000,
        boxShadow: "-4px 0 15px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
        animation: "slideInRight 0.3s ease forwards"
      }}>
        {/* Header */}
        <div style={{ padding: "20px", borderBottom: "1px solid var(--color-border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ fontSize: "1.2rem", margin: 0, color: "var(--color-dark)" }}>Tu Carrito ({cartCount})</h2>
          <button 
            onClick={() => setIsCartOpen(false)}
            style={{ background: "none", border: "none", fontSize: "1.5rem", cursor: "pointer", color: "var(--color-text-light)" }}
          >
            ✖
          </button>
        </div>

        {/* Lista de productos */}
        <div style={{ flex: 1, overflowY: "auto", padding: "20px" }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: "center", marginTop: "50px", color: "var(--color-text-light)" }}>
              <div style={{ fontSize: "3rem", marginBottom: "20px" }}>🛒</div>
              <p>Tu carrito está vacío.</p>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="btn btn-cyan" 
                style={{ marginTop: "20px" }}
              >
                Seguir comprando
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {cart.map((item) => (
                <div key={item.itemKey} style={{ display: "flex", gap: "15px", borderBottom: "1px solid var(--color-border)", paddingBottom: "15px" }}>
                  <div style={{ width: "80px", height: "80px", backgroundColor: "var(--color-bg-alt)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", position: "relative" }}>
                    {item.imageUrl ? (
                      <Image src={item.imageUrl.split(',')[0].trim()} alt={item.name} fill style={{ objectFit: "cover" }} />
                    ) : (
                      <span style={{ fontSize: "2rem" }}>{item.emoji}</span>
                    )}
                  </div>
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <h4 style={{ margin: 0, fontSize: "0.95rem", color: "var(--color-dark)" }}>{item.name}</h4>
                      {Object.entries(item.metadata).map(([k, v]) => (
                        <div key={k} style={{ fontSize: "0.8rem", color: "var(--color-text-light)" }}>{k}: {v}</div>
                      ))}
                    </div>
                    
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "10px" }}>
                      {/* Control de Cantidad */}
                      <div style={{ display: "flex", alignItems: "center", border: "1px solid var(--color-border)", borderRadius: "4px", overflow: "hidden" }}>
                        <button onClick={() => updateQuantity(item.itemKey, -1)} style={{ padding: "5px 10px", background: "var(--color-bg-alt)", border: "none", cursor: "pointer" }}>-</button>
                        <span style={{ padding: "5px 10px", fontSize: "0.9rem" }}>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.itemKey, 1)} style={{ padding: "5px 10px", background: "var(--color-bg-alt)", border: "none", cursor: "pointer" }}>+</button>
                      </div>
                      
                      <div style={{ fontWeight: "bold", color: "var(--color-dark)" }}>
                        {((item.price * item.quantity) / 100).toFixed(2)} €
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.itemKey)}
                    style={{ background: "none", border: "none", color: "red", cursor: "pointer", fontSize: "1.2rem", padding: "0 5px", alignSelf: "flex-start" }}
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer del Carrito */}
        {cart.length > 0 && (
          <div style={{ padding: "20px", borderTop: "1px solid var(--color-border)", backgroundColor: "var(--color-bg-alt)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px", fontSize: "1.1rem", fontWeight: "bold" }}>
              <span>Subtotal:</span>
              <span>{(cartTotal / 100).toFixed(2)} €</span>
            </div>
            
            {hasPhysicalItems && (
              <div style={{ fontSize: "0.85rem", color: "var(--color-text-light)", marginBottom: "15px", backgroundColor: "white", padding: "10px", borderRadius: "8px", border: "1px solid var(--color-border)" }}>
                {cartTotal >= 5500 ? (
                  <>🎉 <strong>¡Enhorabuena!</strong> Has desbloqueado el envío <strong>GRATIS</strong> (Solo a España).</>
                ) : (
                  <>🚚 <strong>Envío Gratis a partir de 55€</strong><br/>Añade <strong>{((5500 - cartTotal) / 100).toFixed(2).replace('.', ',')} €</strong> más para no pagar gastos de envío (4,90€).</>
                )}
              </div>
            )}
            
            <button 
              onClick={handleCheckout}
              disabled={isProcessing}
              className="btn btn-dark" 
              style={{ width: "100%", padding: "15px", fontSize: "1.1rem" }}
            >
              {isProcessing ? "Procesando..." : "Finalizar Compra"}
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </>
  );
}
