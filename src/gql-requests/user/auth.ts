import { gql, useMutation } from "@apollo/client";
import useJWT from "@/hooks/useJWT";

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

export type EmailVerifyPayload = {
  token: string;
};

const GQL_EMAIL_VERIFY = gql(`
  mutation VerifyEmail($token: String!) {
    verifyEmail(token: $token)
  }
`);

export const useEmailVerify = () => {
  const { token } = useJWT();

  return useMutation<{ verifyEmail: boolean }, EmailVerifyPayload>(
    GQL_EMAIL_VERIFY,
    {
      context: { headers: { authorization: `Bearer ${token}` } },
    }
  );
};

const GQL_RESEND_VERIFICATION_EMAIL = gql(`
  mutation ResendVerificationEmail {
    resendVerificationEmail
  }
`);

export const useResendVerificationEmail = () => {
  const { token } = useJWT();
  return useMutation<{ resendVerificationEmail: boolean }>(
    GQL_RESEND_VERIFICATION_EMAIL,
    {
      context: { headers: { authorization: `Bearer ${token}` } },
    }
  );
};
