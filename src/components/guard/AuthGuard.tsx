"use client";

import { FC, ReactNode, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import useJWT from "@/hooks/useJWT";
import { useMe } from "@/gql-requests/user/user";
import useUser from "@/hooks/user/useUser";

interface Props {
  children: ReactNode;
}

const WHITELIST: string[] = ["/system"];

const AuthGuard: FC<Props> = ({ children }) => {
  const { replace } = useRouter();
  const pathname = usePathname();
  const { token, removeToken } = useJWT();
  const { setUser } = useUser();

  const [render, setRender] = useState<boolean>(false);
  const [me] = useMe();

  const isLoginRoute = pathname.split("/").includes("login");
  const isWhiteListRoute = WHITELIST.includes(pathname);

  useEffect(() => {
    if (render) {
      return;
    }

    if (!token) {
      if (!isLoginRoute && !isWhiteListRoute) {
        replace("/login");
      }
      setRender(true);
      return;
    }

    me({
      context: { headers: { authorization: `Bearer ${token}` } },
    })
      .then((res) => {
        if (res.data?.me) {
          setUser(res.data.me);
          if (isLoginRoute) {
            replace("/");
          }
        } else {
          removeToken();
          if (!isLoginRoute && !isWhiteListRoute) {
            replace("/login");
          }
        }
      })
      .catch(() => {
        removeToken();
        if (!isLoginRoute && !isWhiteListRoute) {
          replace("/login");
        }
      })
      .finally(() => {
        setRender(true);
      });
  }, [
    render,
    token,
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
