"use client";

import { FC, ReactNode, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import useJWT from "@/hooks/useJWT";
import { useMe } from "@/gql-requests/user/user";
import useUser from "@/hooks/user/useUser";

interface Props {
  children: ReactNode;
}

const WHITELIST: string[] = ["/system", "/"];

const AuthGuard: FC<Props> = ({ children }) => {
  const { replace } = useRouter();
  const pathname = usePathname();
  const { token, removeToken } = useJWT();
  const { setUser } = useUser();

  const [render, setRender] = useState<boolean>(false);
  const [me] = useMe();

  const isLoginRoute = pathname.split("/").includes("login");
  const isVerifyPage = pathname === "/login/verify";
  const isSystemPage = pathname === "/system";
  const isWhiteListRoute = WHITELIST.includes(pathname);

  useEffect(() => {
    if (render) {
      return;
    }

    if (!token) {
      if (isVerifyPage || (!isLoginRoute && !isWhiteListRoute)) {
        replace("/login");
      }
      setRender(true);
      return;
    }

    function loginFailed() {
      removeToken();
      if (isSystemPage || isWhiteListRoute) return;
      if (isVerifyPage || !isLoginRoute) {
        replace("/login");
      }
    }

    me({
      context: { headers: { authorization: `Bearer ${token}` } },
    })
      .then(({ data }) => {
        if (data?.me) {
          setUser(data.me);

          if (isSystemPage || isWhiteListRoute) return;

          if (!data.me.emailVerified && !isVerifyPage) {
            replace("/login/verify");
            return;
          }

          if (data.me.emailVerified && isLoginRoute) {
            replace("/");
            return;
          }
        } else {
          loginFailed();
        }
      })
      .catch(() => {
        loginFailed();
      })
      .finally(() => {
        setRender(true);
      });
  }, [
    render,
    token,
    isSystemPage,
    isVerifyPage,
    isLoginRoute,
    isWhiteListRoute,
    replace,
    me,
    setUser,
    removeToken,
  ]);

  return render ? <>{children}</> : <></>;
};

export default AuthGuard;
