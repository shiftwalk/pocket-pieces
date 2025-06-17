import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloLink,
  concat,
  from,
  type DefaultOptions,
} from "@apollo/client/core/index.js";
import { onError } from "@apollo/client/link/error";

const cfg = {
  // @TODO - Make sure these are hidden...
  SHOPIFY_ENDPOINT: `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/2025-01/graphql.json`,
  SHOPIFY_ACCESS_TOKEN:
    process.env.NEXT_PUBLIC_SHOPIFY_STORE_FRONT_ACCESS_TOKEN,
};

type Headers = Record<string, string | undefined>;

const SHOPIFY_ENDPOINT = cfg.SHOPIFY_ENDPOINT;

const shopifyHttpLink = (fetchFn: typeof fetch) => {
  return createHttpLink({
    uri: SHOPIFY_ENDPOINT,
    fetch: fetchFn,
  });
};

const shopifyAuthMiddleware = new ApolloLink((operation, forward) => {
  const headers: Headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  headers["X-Shopify-Storefront-Access-Token"] = cfg.SHOPIFY_ACCESS_TOKEN;

  operation.setContext({ headers });
  return forward(operation);
});

const link = (fetchFn: typeof fetch) => {
  return concat(shopifyAuthMiddleware, shopifyHttpLink(fetchFn));
};

export enum GQLErrors {
  CMS_NOT_FOUND = "NotFound",
}

const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
  let opMsg = "";
  let ignores: GQLErrors[] = [];
  if (operation) {
    opMsg = `operation.name: '${operation?.operationName}'`;
    let variablesMsg = "";
    for (const key in operation.variables) {
      variablesMsg = `${variablesMsg} ${key}: ${operation.variables[key]},`;
    }
    opMsg = `${opMsg}, operation.vars:'${variablesMsg}'`;
    ignores = operation.getContext().suppressGQLErrs || [];
  }

  if (graphQLErrors && graphQLErrors.length > 0) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}. ${opMsg} `
      );
    });
  }

  if (networkError) {
    console.error(`[Network error]: ${networkError}. ${opMsg}`);
  }
});

/**
 * Apollo client configuration for SSR.
 * Disabling apollo cache for SSR requests.
 */
const ssrOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
};

const createApolloClient = (fetchFn: typeof fetch) => {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: from([errorLink, link(fetchFn)]),
    cache: new InMemoryCache(),
    defaultOptions: ssrOptions,
  });
};

export default createApolloClient;
