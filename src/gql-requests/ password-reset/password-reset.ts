import { gql, useMutation } from "@apollo/client";

export type ResetPasswordProp = {
  email: string;
};

const GQL_SEND_RESET_PASSWORD_EMAIL = gql`
  mutation SendResetPasswordEmail($email: String!) {
    sendResetPasswordEmail(email: $email)
  }
`;

export const useSendResetPasswordEmail = () => {
  return useMutation<{ sendResetPasswordEmail: boolean }, ResetPasswordProp>(
    GQL_SEND_RESET_PASSWORD_EMAIL
  );
};

export type ResetPasswordPayload = {
  newPassword: string;
  token: string;
};

const GQL_RESET_PASSWORD = gql`
  mutation ResetPassword($token: String!, $newPassword: String!) {
    resetPassword(token: $token, newPassword: $newPassword)
  }
`;

export const useResetPassword = () => {
  return useMutation<{ resetPassword: boolean }, ResetPasswordPayload>(
    GQL_RESET_PASSWORD
  );
};
