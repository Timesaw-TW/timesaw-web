import { gql } from "@apollo/client";

export const GQL_SERVER_CHECK = gql(`query {
    healthCheck
  }`);
