"use client";

import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem("musicabalu_cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Error parsing cart:", e);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("musicabalu_cart", JSON.stringify(cart));
    }
  }, [cart, isLoaded]);

  const addToCart = (product, quantity = 1, metadata = {}) => {
    setCart(prev => {
      // Create a unique key for the item based on ID and metadata
      const itemKey = `${product.id}-${JSON.stringify(metadata)}`;
      const existingItem = prev.find(item => item.itemKey === itemKey);

      if (existingItem) {
        return prev.map(item =>
          item.itemKey === itemKey
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity, metadata, itemKey }];
    });
    setIsCartOpen(true); // Abre el carrito automáticamente al añadir
  };

  const removeFromCart = (itemKey) => {
    setCart(prev => prev.filter(item => item.itemKey !== itemKey));
  };

  const updateQuantity = (itemKey, delta) => {
    setCart(prev => prev.map(item => {
      if (item.itemKey === itemKey) {
        const newQuantity = item.quantity + delta;
        return { ...item, quantity: Math.max(1, newQuantity) }; // Mínimo 1
      }
      return item;
    }));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{
      cart,
      isCartOpen,
      setIsCartOpen,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartCount,
      cartTotal,
      isLoaded
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
