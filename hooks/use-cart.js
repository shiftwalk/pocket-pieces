"use client";

import { useState, useCallback, useEffect } from "react";
import {
  SendCartLinesAddDocument,
  SendCartCreateDocument,
  GetCartDocument,
  SendCartLinesUpdateDocument,
} from "@/gql/shopifygen/codegen";

const cfg = {
  SHOPIFY_STORE: "pocketpieces",
};

export function useCartStore(client, localStorage, dataLayerEvents = false) {
  const [cart, setCart] = useState(null);

  // Initialize subscription to update local storage
  useEffect(() => {
    if (localStorage && cart?.lines?.edges) {
      localStorage.setItem(
        `${cfg.SHOPIFY_STORE}:cartItems`,
        JSON.stringify(cart.lines.edges)
      );
    }
  }, [cart, localStorage]);

  const initCartFromLocalStorage = useCallback(async () => {
    if (
      localStorage &&
      localStorage.getItem(`${cfg.SHOPIFY_STORE}:cartItems`)
    ) {
      const items = localStorage.getItem(`${cfg.SHOPIFY_STORE}:cartItems`);
      let cartItems = [];

      if (items) {
        cartItems = JSON.parse(items).map((item) => {
          const findUrl = item.node?.attributes?.find(
            (attribute) => attribute.key === "_url"
          );

          const itemTitle =
            item?.node?.attributes.find((attr) => attr.key === "_title")
              ?.value || item?.node?.merchandise?.title;
          const itemUrl = findUrl?.value || "cart";
          const canonicalUrl =
            item.node?.merchandise?.product?.onlineStoreUrl?.value;

          return {
            merchandiseId: item.node.merchandise.id,
            quantity: item.node.quantity,
            attributes: [
              {
                key: "_title",
                value: itemTitle,
              },
              {
                key: "_url",
                value: canonicalUrl ? canonicalUrl : itemUrl,
              },
            ],
          };
        });
      }

      try {
        const res = await client.mutate({
          mutation: SendCartCreateDocument,
          variables: {
            input: {
              lines: cartItems,
            },
          },
        });
        if (res?.data?.cartCreate?.cart) {
          const createdCart = res?.data?.cartCreate?.cart;
          if (localStorage) {
            localStorage.setItem(
              `${cfg.SHOPIFY_STORE}:cartId`,
              JSON.stringify(createdCart.id)
            );
          }
          setCart(createdCart);
          return createdCart;
        }
      } catch (error) {
        console.error(error);
        return null;
      }
    }
  }, [client, localStorage]);

  const createCart = useCallback(
    async (merchandiseId, title, subtitle, url, images) => {
      try {
        let attrs = [
          {
            key: "_title",
            value: title,
          },
          {
            key: "_url",
            value: url,
          },
          {
            key: "_subtitle",
            value: subtitle,
          },
        ];
        if (images) {
          attrs = [
            ...attrs,
            {
              key: "_images",
              value: images,
            },
          ];
        }

        const res = await client.mutate({
          mutation: SendCartCreateDocument,
          variables: {
            input: {
              lines: [
                {
                  merchandiseId: merchandiseId,
                  quantity: 1,
                  attributes: attrs,
                },
              ],
            },
          },
        });
        if (res?.errors) {
          console.error("GraphQL errors:", res.errors);
        }

        if (
          res?.data?.cartCreate?.userErrors &&
          res?.data?.cartCreate?.userErrors.length > 0
        ) {
          return res?.data?.cartCreate;
        } else if (res?.data?.cartCreate?.cart) {
          const createdCart = res?.data?.cartCreate?.cart;

          if (localStorage) {
            localStorage.setItem(
              `${cfg.SHOPIFY_STORE}:cartId`,
              JSON.stringify(createdCart.id)
            );
            localStorage.setItem(
              `${cfg.SHOPIFY_STORE}:checkoutUrl`,
              JSON.stringify(createdCart.checkoutUrl)
            );
          }
          setCart(createdCart);
          return createdCart;
        }
      } catch (error) {
        console.error(error);
        return null;
      }
    },
    [client, localStorage]
  );

  const cartLinesAdd = useCallback(
    async (currentCartId, merchandiseId, title, subtitle, url, images) => {
      try {
        let attrs = [
          {
            key: "_title",
            value: title,
          },
          {
            key: "_url",
            value: url,
          },
          {
            key: "_subtitle",
            value: subtitle,
          },
        ];
        if (images) {
          attrs = [
            ...attrs,
            {
              key: "_images",
              value: images,
            },
          ];
        }

        const res = await client.mutate({
          mutation: SendCartLinesAddDocument,
          variables: {
            cartId: currentCartId,
            lines: [
              {
                merchandiseId: merchandiseId,
                quantity: 1,
                attributes: attrs,
              },
            ],
          },
        });

        if (res?.errors) {
          console.error("GraphQL errors:", res.errors);
        }
        if (
          res?.data?.cartLinesAdd?.userErrors &&
          res?.data?.cartLinesAdd?.userErrors.length > 0
        ) {
          return res?.data?.cartLinesAdd;
        } else if (res?.data?.cartLinesAdd?.cart) {
          const updatedCart = res?.data?.cartLinesAdd?.cart;
          const addedItem = updatedCart?.lines?.edges.find(
            (item) => item.node.merchandise.id === merchandiseId
          );
          // if (dataLayerEvents && addedItem) {
          //   dataLayer.addToCart(
          //     updatedCart.cost?.subtotalAmount?.currencyCode,
          //     updatedCart.cost?.subtotalAmount?.amount,
          //     cartEdgesToItems(updatedCart.lines?.edges)
          //   );
          // }
          setCart(updatedCart);
          return updatedCart;
        }
      } catch {
        const reinitializedCart = await initCartFromLocalStorage();
        if (!merchandiseId || !reinitializedCart) return null;

        try {
          let attrs = [
            {
              key: "_title",
              value: title,
            },
            {
              key: "_url",
              value: url,
            },
            {
              key: "_subtitle",
              value: subtitle,
            },
          ];
          if (images) {
            attrs = [
              ...attrs,
              {
                key: "_images",
                value: images,
              },
            ];
          }

          const res = await client.mutate({
            mutation: SendCartLinesAddDocument,
            variables: {
              cartId: reinitializedCart.id,
              lines: [
                {
                  merchandiseId: merchandiseId,
                  quantity: 1,
                  attributes: attrs,
                },
              ],
            },
          });
          if (
            res?.data?.cartLinesAdd?.userErrors &&
            res?.data?.cartLinesAdd?.userErrors.length > 0
          ) {
            return res?.data?.cartLinesAdd;
          } else if (res?.data?.cartLinesAdd?.cart) {
            const updatedCart = res.data.cartLinesAdd.cart;
            setCart(updatedCart);
            return updatedCart;
          }
        } catch (err) {
          console.log("CartLinesAdd: Could not add product line:", err);
        }
        return null;
      }
    },
    [client, dataLayerEvents, initCartFromLocalStorage]
  );

  const getCart = useCallback(async () => {
    let cartId = "";
    if (localStorage) {
      const cartIdValue = localStorage.getItem(`${cfg.SHOPIFY_STORE}:cartId`);
      cartId = cartIdValue ? JSON.parse(cartIdValue) : "";
    }
    if (!cartId) return null;

    try {
      const response = await client.query({
        query: GetCartDocument,
        variables: {
          id: cartId,
        },
      });

      if (response?.data?.cart) {
        const cartData = response?.data?.cart;
        setCart(cartData);
        return cartData;
      } else {
        if (localStorage) {
          localStorage.setItem(`${cfg.SHOPIFY_STORE}:cartId`, "");
        }
        setCart(null);
        return null;
      }
    } catch {
      console.log("Cart invalid. Reinitialising");
      await initCartFromLocalStorage(countryCode);
      return null;
    }
  }, [client, localStorage, initCartFromLocalStorage]);

  const checkout = useCallback(async (checkoutUrl, language) => {
    const url = new URL(checkoutUrl);
    if (language) {
      url.searchParams.set("locale", language.toLowerCase());
    }
    window.location.assign(url.toString());
  }, []);

  const setQuantity = useCallback(
    async (id, lines) => {
      try {
        const res = await client.mutate({
          mutation: SendCartLinesUpdateDocument,
          variables: {
            cartId: id,
            lines: lines,
          },
        });
        if (res?.data?.cartLinesUpdate?.cart) {
          const currentCart = cart;
          const merchandiseId = lines[0].merchandiseId;
          const updatedItem = currentCart?.lines?.edges.find(
            (item) => item.node.merchandise.id === merchandiseId
          );
          const updatedCart = res?.data?.cartLinesUpdate?.cart;

          if (dataLayerEvents && updatedItem && currentCart) {
            if (updatedCart.totalQuantity > currentCart.totalQuantity) {
              dataLayer.addToCart(
                updatedCart?.cost?.subtotalAmount?.currencyCode,
                updatedCart?.cost?.subtotalAmount?.amount,
                cartEdgesToItems(updatedCart.lines?.edges)
              );
            } else {
              dataLayer.removeFromCart(
                updatedCart?.cost?.subtotalAmount?.currencyCode,
                updatedCart?.cost?.subtotalAmount?.amount,
                cartEdgesToItems(updatedCart.lines?.edges)
              );
            }
          }
          setCart(updatedCart);
          return updatedCart;
        }
      } catch {
        const data = await initCartFromLocalStorage(countryCode);
        if (!lines || !data) return null;

        try {
          const lineToUpdate = data?.lines?.edges?.find(
            (line) => line?.node?.merchandise.id === lines[0].merchandiseId
          );

          const res = await client.mutate({
            mutation: SendCartLinesUpdateDocument,
            variables: {
              cartId: data?.id,
              lines: [
                {
                  id: lineToUpdate?.node?.id,
                  merchandiseId: lines[0]?.merchandiseId,
                  quantity: lines[0]?.quantity,
                  attributes: [
                    {
                      key: "_url",
                      value: lines[0].attributes?.find(
                        (attr) => attr.key === "_url"
                      )?.value,
                    },
                  ],
                },
              ],
            },
          });
          if (res?.data?.cartLinesUpdate?.cart) {
            const currentCart = cart;
            const updatedCart = res?.data?.cartLinesUpdate?.cart;
            if (dataLayerEvents && lineToUpdate && currentCart) {
              if (updatedCart.totalQuantity > currentCart.totalQuantity) {
                dataLayer.addToCart(
                  updatedCart.cost?.subtotalAmount?.currencyCode,
                  updatedCart?.cost?.subtotalAmount?.amount,
                  cartEdgesToItems(updatedCart.lines?.edges)
                );
              } else {
                dataLayer.removeFromCart(
                  updatedCart.cost?.subtotalAmount?.currencyCode,
                  updatedCart.cost?.subtotalAmount?.amount,
                  cartEdgesToItems(updatedCart.lines?.edges)
                );
              }
            }
            setCart(updatedCart);
            return updatedCart;
          }
        } catch (err) {
          console.log("SetQuantity: Could not update product quantity:", err);
        }
        return null;
      }
    },
    [client, cart, dataLayerEvents, initCartFromLocalStorage]
  );

  return {
    cart,
    createCart,
    cartLinesAdd,
    getCart,
    checkout,
    setQuantity,
  };
}
