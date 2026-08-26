"use client";

import { SessionProvider } from "next-auth/react";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "./CartDrawer";
import ClearCartOnSuccess from "./ClearCartOnSuccess";
import { Suspense } from "react";

export default function Providers({ children }) {
  return (
    <SessionProvider>
      <CartProvider>
        {children}
        <CartDrawer />
        <Suspense fallback={null}>
          <ClearCartOnSuccess />
        </Suspense>
      </CartProvider>
    </SessionProvider>
  );
}
