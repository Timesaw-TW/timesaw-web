"use client";

import { getEnv } from "@/libs/environment";
import { HttpLink } from "@apollo/client";
import {
  ApolloNextAppProvider,
  ApolloClient,
  InMemoryCache,
} from "@apollo/experimental-nextjs-app-support";
import { FC, ReactNode } from "react";

function makeClient() {
  const httpLink = new HttpLink({
    uri: `${getEnv().baseUri}/api/graphql`,
    fetchOptions: { cache: "no-store" },
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink,
  });
}

interface Props {
  children: ReactNode;
}

const ApolloProvider: FC<Props> = ({ children }) => {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
};

export default ApolloProvider;
