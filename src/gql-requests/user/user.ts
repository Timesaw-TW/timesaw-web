import { gql, useLazyQuery } from "@apollo/client";

const GQL_ME = gql(`
    query Me {
        me {
            id,
            email,
            name,
            emailVerified,
            createdAt
        }
    }
`);

export type User = {
  id: string;
  email: string;
  name?: string;
  emailVerified: boolean;
  createdAt?: string;
};

export const useMe = () => {
  return useLazyQuery<{ me: User }>(GQL_ME);
};
