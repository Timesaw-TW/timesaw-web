import {
  registerApolloClient,
  ApolloClient,
  InMemoryCache,
} from "@apollo/experimental-nextjs-app-support";
import { getEnv } from "./environment";
import { HttpLink } from "@apollo/client";

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: `${getEnv().baseUri}/api/graphql`,
    }),
  });
});
