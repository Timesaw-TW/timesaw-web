"use client";

import { FC, ReactNode, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import useJWT from "@/hooks/useJWT";
import { useMe } from "@/gql-requests/user/user";
import useUser from "@/hooks/user/useUser";
import useModal from "@/hooks/useModal";
import Headline from "@/stories/Typography/Headline";
import SubHeadline from "@/stories/Typography/SubHeadline";
import Button from "@/stories/Button";

interface Props {
  children: ReactNode;
}

const WHITELIST: string[] = ["/system", "/"];

const AuthGuard: FC<Props> = ({ children }) => {
  const { replace } = useRouter();
  const pathname = usePathname();
  const { token, removeToken } = useJWT();
  const { setUser } = useUser();
  const { setModal, closeModal } = useModal();

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
            setModal({
              content: (
                <div className="flex flex-col gap-1">
                  <Headline bold>尚未驗證信箱</Headline>
                  <SubHeadline>
                    請於填寫的信箱點選信件中的鏈接完成註冊
                  </SubHeadline>
                </div>
              ),
              footer: (
                <div className="flex justify-end gap-4">
                  <Button
                    className="w-[5.5rem]"
                    onClick={() => {
                      replace("/login/verify");
                      closeModal();
                    }}
                  >
                    <SubHeadline>確認</SubHeadline>
                  </Button>
                </div>
              ),
            });
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
    setModal,
    closeModal,
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
