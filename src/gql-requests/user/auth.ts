import { gql, useMutation } from "@apollo/client";

export type LoginPayload = {
  email: string;
  password: string;
};

const GQL_REGISTER = gql(`
    mutation Register($email: String!, $password: String!) {
        register(email: $email, password: $password) 
    }
`);

export const useRegister = () => {
  return useMutation<{ register: string }, LoginPayload>(GQL_REGISTER);
};

const GQL_LOGIN = gql(`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) 
    }
`);

export const useLogin = () => {
  return useMutation<{ login: string }, LoginPayload>(GQL_LOGIN);
};
