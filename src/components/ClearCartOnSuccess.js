"use client";

import { useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useSearchParams } from "next/navigation";

export default function ClearCartOnSuccess() {
  const { clearCart } = useCart();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("success") === "true") {
      clearCart();
    }
  }, [searchParams, clearCart]);

  return null;
}
