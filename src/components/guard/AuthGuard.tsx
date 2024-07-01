"use client";

import { FC, ReactNode, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import useJWT from "@/hooks/useJWT";
import useModal from "@/hooks/useModal";
import useLogin from "@/hooks/user/useLogin";
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
  const { token } = useJWT();
  const { setModal, closeModal } = useModal();
  const { fetchUser } = useLogin();

  const [render, setRender] = useState<boolean>(false);

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
      if (isSystemPage || isWhiteListRoute) return;
      if (isVerifyPage || !isLoginRoute) {
        replace("/login");
      }
    }

    fetchUser()
      .then(({ data }) => {
        if (data?.me) {
          if (isSystemPage || isWhiteListRoute) return;

          if (!data.me.emailVerified && !isVerifyPage) {
            setModal({
              content: (
                <div className="flex flex-col gap-1">
                  <Headline bold>尚未驗證信箱</Headline>
                  <SubHeadline>
                    信箱尚未驗證。請於註冊信箱中查看驗證碼，並輸入信件中的 6
                    碼驗證碼以完成註冊。
                  </SubHeadline>
                </div>
              ),
              footer: (
                <div className="flex justify-end gap-4">
                  <Button
                    className="w-[5.5rem] bg-soda-80"
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
    token,
    closeModal,
    fetchUser,
    isLoginRoute,
    isSystemPage,
    isVerifyPage,
    isWhiteListRoute,
    render,
    replace,
    setModal,
  ]);

  return render ? <>{children}</> : <></>;
};

export default AuthGuard;
