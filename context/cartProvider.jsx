import { createContext, useContext } from "react";
import { useCartStore } from "@/hooks/use-cart";
import client from "@/gql/apolloClient";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const apolloClient = client(fetch);
  const localStorage =
    typeof window !== "undefined" && navigator.cookieEnabled
      ? window.localStorage
      : undefined;

  const cartStore = useCartStore(apolloClient, localStorage, false);

  return (
    <CartContext.Provider value={cartStore}>{children}</CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
