import { ApolloClient, InMemoryCache } from "@apollo/client";
import { getEnv } from "./environment";

const endpoint = getEnv().graphqlUri;

export const client = new ApolloClient({
  uri: endpoint,
  cache: new InMemoryCache(),
});
