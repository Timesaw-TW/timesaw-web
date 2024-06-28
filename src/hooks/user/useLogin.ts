import { LoginPayload } from "@/gql-requests/user/auth";
import { useLogin as useLoginGQL } from "@/gql-requests/user/auth";
import { User, useMe as useMeGQL } from "@/gql-requests/user/user";
import useUser from "./useUser";
import useJWT from "../useJWT";

const useLogin = () => {
  const { setToken, removeToken } = useJWT();
  const { setUser, removeUser } = useUser();
  const [loginFn] = useLoginGQL();
  const [me] = useMeGQL();

  const login = async ({
    email,
    password,
  }: LoginPayload): Promise<User | undefined> => {
    const tokenRes = await loginFn({
      variables: {
        email,
        password,
      },
    });

    if (tokenRes.data && tokenRes.data.login) {
      const token = tokenRes.data.login;
      const userRes = await me({
        context: { headers: { authorization: `Bearer ${token}` } },
      });

      if (userRes.data && userRes.data.me) {
        const user = userRes.data.me;
        setToken(token);
        setUser(user);
        return user;
      }
    }
  };

  const logout = () => {
    removeToken();
    removeUser();
  };

  return { login, logout };
};

export default useLogin;
