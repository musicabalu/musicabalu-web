"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function CheckoutButton({ productId, customMetadata, btnClass = "btn btn-pink", disabled = false }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleBuy = async () => {
    if (!session) {
      router.push(`/login?callbackUrl=${encodeURIComponent(window.location.pathname)}`);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, customMetadata }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else if (data.error?.includes("Simulación")) {
        alert("¡Simulación exitosa! La pasarela de Stripe se activará al añadir las claves reales.");
      }
    } catch {
      // silencioso en dev
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleBuy}
      disabled={loading || disabled}
      className={`btn ${btnClass}`}
      style={{ width: "100%", opacity: (loading || disabled) ? 0.5 : 1, cursor: disabled ? "not-allowed" : "pointer" }}
    >
      {loading ? "Cargando..." : "Comprar Ahora"}
    </button>
  );
}
