"use client";

import { useCartStore } from "../hooks/use-cart";
import createApolloClient from "../gql/apolloClient";

// Create a singleton instance
let cartInstance: ReturnType<typeof useCartStore> | null = null;

export function createCartInstance(account?: any) {
  if (typeof window === "undefined") return null;

  const apolloClient = createApolloClient(fetch);
  const localStorage = navigator.cookieEnabled
    ? window.localStorage
    : undefined;

  return useCartStore(apolloClient, localStorage, false);
}

// Export a cart object that matches the original API
export const cart = {
  getCart: async () => {
    if (!cartInstance) {
      cartInstance = createCartInstance();
    }
    return cartInstance?.getCart() || null;
  },
  createCart: async (
    merchandiseId: string,
    url: string,
    title: string,
    subtitle: string,
    images: string
  ) => {
    if (!cartInstance) {
      cartInstance = createCartInstance();
    }
    return (
      cartInstance?.createCart(merchandiseId, url, title, subtitle, images) ||
      null
    );
  },
  cartLinesAdd: async (
    currentCartId: string,
    merchandiseId: string,
    title: string,
    subtitle: string,
    url: string,
    images: string
  ) => {
    if (!cartInstance) {
      cartInstance = createCartInstance();
    }
    return (
      cartInstance?.cartLinesAdd(
        currentCartId,
        merchandiseId,
        title,
        subtitle,
        url,
        images
      ) || null
    );
  },
  setQuantity: async (id: string, lines: any[]) => {
    if (!cartInstance) {
      cartInstance = createCartInstance();
    }
    return cartInstance?.setQuantity(id, lines) || null;
  },
  checkout: async (checkoutUrl: string, language?: any) => {
    if (!cartInstance) {
      cartInstance = createCartInstance();
    }
    return cartInstance?.checkout(checkoutUrl, language);
  },
};
