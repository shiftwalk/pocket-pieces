const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STORE_FRONT_ACCESS_TOKEN
const collection = 'frontpage'

async function callShopify(query) {
  const fetchUrl = `https://${domain}/api/2023-04/graphql.json`;

  const fetchOptions = {
    endpoint: fetchUrl,
    method: "POST",
    headers: {
      "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  };

  try {
    const data = await fetch(fetchUrl, fetchOptions).then((response) =>
      response.json(),
    );
    return data;
  } catch (error) {
    throw new Error("Could not fetch products!");
  }
}

export async function getAllProducts() {
  const query =
    `{
      products (first: 100) {
        edges {
          node {
            id
            availableForSale
            handle
            title
            description
            metaTitle: metafield(
              key:"meta_title",
              namespace:"custom"
            ) {
              value
            }
            images(first: 20) {
              edges {
                node {
                  id
                  originalSrc
                  height
                  width     
                  altText             
                }
              }
            }
            collections(first:5) {
              edges {
                node {
                  title
                  handle
                }
              }
            }
            variants(first: 1) {
              edges {
                node {
                  price {
                    amount
                  }
                }
              }
            }
          }
        }
      }
    }`
  ;

  const response = await callShopify(query);

  const allProducts = response.data?.products.edges
    ? response.data.products.edges
    : [];

  return allProducts;
}

export async function getAllProductsRelated() {
  const query =
    `{
      products (first: 100) {
        edges {
          node {
            id
            availableForSale
            handle
            title
            description
            metaTitle: metafield(
              key:"meta_title",
              namespace:"custom"
            ) {
              value
            }
            images(first: 20) {
              edges {
                node {
                  id
                  originalSrc
                  height
                  width     
                  altText             
                }
              }
            }
            collections(first:5) {
              edges {
                node {
                  title
                  handle
                }
              }
            }
            variants(first: 1) {
              edges {
                node {
                  price {
                    amount
                  }
                }
              }
            }
          }
        }
      }
    }`
  ;

  const response = await callShopify(query);

  const allProductsRelated = response.data?.products.edges
    ? response.data.products.edges
    : [];

  return allProductsRelated;
}

export async function getAllCollections() {
  const query =
    `{
      collections(first: 50) {
        edges {
          node {
            title
            handle              
          }
        }
      }
    }`
  ;

  const response = await callShopify(query);

  const allCollections = response.data?.collections.edges
    ? response.data.collections.edges
    : [];

  return allCollections;
}

export async function getAllProductsInCollection(handle) {
  const query =
    `{
      collection(handle: "${handle}") {
        products (first: 100) {
          edges {
            node {
              id
              availableForSale
              handle
              title
              description
              metaTitle: metafield(
                key:"meta_title",
                namespace:"custom"
              ) {
                value
              }
              quote: metafield(
                key:"quote",
                namespace:"custom"
              ) {
                value
              }
              images(first: 20) {
                edges {
                  node {
                    id
                    originalSrc
                    height
                    width     
                    altText             
                  }
                }
              }
              collections(first:5) {
                edges {
                  node {
                    title
                    handle
                  }
                }
              }
              variants(first: 1) {
                edges {
                  node {
                    barcode
                    price {
                      amount
                    }
                  }
                }
              }
            }
          }
        }
      }
    }`
  ;

  const response = await callShopify(query);

  const allProducts = response.data?.collection.products.edges
    ? response.data.collection.products.edges
    : [];

  return allProducts;
}


export async function getProductSlugs() {
  const query =
    `{
      products(first: 50) {
        edges {
          node {
            handle              
          }
        }
      }
    }`
  ;

  const response = await callShopify(query);

  const slugs = response.data.products.edges
    ? response.data.products.edges
    : [];

  return slugs;
}

export async function getCollectionSlugs() {
  const query =
    `{
      collections(first: 50) {
        edges {
          node {
            handle              
          }
        }
      }
    }`
  ;

  const response = await callShopify(query);

  const slugs = response.data.collections.edges
    ? response.data.collections.edges
    : [];

  return slugs;
}

export async function getProduct(handle) {
  const query =
    `{
      product(handle: "${handle}") {
        id
        title
        handle
        availableForSale
        description
        descriptionHtml
        metaTitle: metafield(
          key:"meta_title",
          namespace:"custom"
        ) {
          value
        }
        quote: metafield(
          key:"quote",
          namespace:"custom"
        ) {
          value
        }
        images(first: 20) {
          edges {
            node {
              id
              originalSrc
              height
              width     
              altText             
            }
          }
        }
        collections(first:5) {
          edges {
            node {
              title
              handle
            }
          }
        }
        variants(first: 20) {
          edges {
            node {
              barcode
              id
              availableForSale
              title
              price {
                amount
              }             
            }
          }
        }
      }
    }`
  ;

  const response = await callShopify(query);

  const product = response.data.product
    ? response.data.product
    : [];

  return product;
}

export async function getCollection(handle) {
  const query =
    `{
      collection(handle: "${handle}") {
        id
        title
        handle
      }
    }`
  ;

  const response = await callShopify(query);

  const product = response.data.collection
    ? response.data.collection
    : [];

  return product;
}

export async function createCheckout(id, quantity) {
  const query =
    `mutation 
      {
        checkoutCreate(input: {
          lineItems: [{ variantId: "${id}", quantity: 1 }]
        }) {
          checkout {
             id
             webUrl
             lineItems(first: 50) {
               edges {
                 node {
                   id
                   title
                   quantity
                 }
               }
             }
          }
        }
      }      
    `
  ;

  const response = await callShopify(query);

  const checkout = response.data.checkoutCreate.checkout
    ? response.data.checkoutCreate.checkout
    : [];

  return checkout;
}

export async function updateCheckout(id, lineItems) {  
  const formattedLineItems = lineItems.map(item => {
    return `{
      variantId: "${item.variantId}",
      quantity: 1
    }`
  })

  const query =
    `mutation 
      {
        checkoutLineItemsReplace(lineItems: [${formattedLineItems}], checkoutId: "${id}") {
          checkout {
             id
             webUrl
             lineItems(first: 50) {
               edges {
                 node {
                   id
                   title
                   quantity
                 }
               }
             }
          }
        }
      }      
    `
  ;

  const response = await callShopify(query);

  const checkout = response.data.checkoutLineItemsReplace.checkout
    ? response.data.checkoutLineItemsReplace.checkout
    : [];

  return checkout;
}

export function saveLocalData(cart, checkoutId, checkoutUrl) {
  localStorage.setItem(process.env.NEXT_PUBLIC_LOCAL_STORAGE_NAME, JSON.stringify([cart, checkoutId, checkoutUrl]))
}

function getLocalData() {
  return JSON.parse(localStorage.getItem(process.env.NEXT_PUBLIC_LOCAL_STORAGE_NAME))
}

export function setLocalData(setCart, setCheckoutId, setCheckoutUrl) {
  const localData = getLocalData()

  if (localData) {
    if (Array.isArray(localData[0])) {
      setCart([...localData[0]])
    }
    else {
      setCart([localData[0]])
    }
    setCheckoutId(localData[1])
    setCheckoutUrl(localData[2])
  }
}

export async function createShopifyCheckout(newItem) {
  const data = await createCheckout( newItem['variantId'], newItem['variantQuantity'])  
  return data
}

export async function updateShopifyCheckout(updatedCart, checkoutId) {
  const lineItems = updatedCart.map(item => {
    return {
      variantId: item['variantId'],
      quantity: 1
    }
  })
  await updateCheckout(checkoutId, lineItems)
}

export function getCartSubTotal(cart) {
  if (cart.length === 0) {
    return 0
  }
  else {
    let totalPrice = 0
    cart.forEach(item => totalPrice += parseInt(1) * parseFloat(item.variantPrice))
    return Math.round(totalPrice * 100) / 100
  }
}