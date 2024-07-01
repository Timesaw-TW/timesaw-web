"use client";

import { merge } from "@/libs/tailwind";
import { FC, useMemo, useState } from "react";
import RegisterPanel from "./RegisterPanel";
import ThirdPartyPanel from "./ThirdPartyPanel";
import LoginPanel from "./LoginPanel";
import Caption from "@/stories/Typography/Caption";
import Button from "@/stories/Button";
import { SegmentedPicker } from "@/stories/SegmentedPicker";
import { useRouter, useSearchParams } from "next/navigation";
import ContentFooter from "./ContentFooter";
import { User } from "@/gql-requests/user/user";
import useModal from "@/hooks/useModal";
import Headline from "@/stories/Typography/Headline";
import SubHeadline from "@/stories/Typography/SubHeadline";

export type PageType = "register" | "login";

function getPageType(type: string | null): PageType {
  if (type) {
    return ["register", "login"].includes(type)
      ? (type as PageType)
      : "register";
  }
  return "register";
}

interface Props {
  className?: string;
}

const LoginBox: FC<Props> = ({ className }) => {
  const { replace, push } = useRouter();
  const searchParams = useSearchParams();
  const [tab, setTab] = useState<PageType>(
    getPageType(searchParams.get("type"))
  );
  const { setModal, closeModal } = useModal();

  const segments = useMemo<{ label: string; value: PageType }[]>(
    () => [
      { label: "註冊", value: "register" },
      { label: "登入", value: "login" },
    ],
    []
  );

  const onRegisterSuccess = () => {
    replace("/login/verify");
  };

  const onLoginSuccess = (user: User) => {
    if (!user.emailVerified) {
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

    push("/splash");
    setTimeout(() => {
      replace("/");
    }, 3000);
  };

  return (
    <div className={merge("h-full w-full", "flex flex-col gap-6", className)}>
      <SegmentedPicker
        value={tab}
        segments={segments}
        onSelect={(value) => setTab(value)}
      />
      <div>
        {tab === "register" && <RegisterPanel onSuccess={onRegisterSuccess} />}
        {tab === "login" && <LoginPanel onSuccess={onLoginSuccess} />}
        <div
          className={merge(
            "flex items-center",
            tab === "register" ? "justify-end" : "justify-between"
          )}
        >
          {tab === "login" && (
            <Button className="h-8 w-[4.875rem] bg-transparent px-3 py-2">
              <Caption className="text-soda-100" bold>
                忘記密碼?
              </Caption>
            </Button>
          )}
          <div className="flex items-center">
            <Caption>
              {tab === "register" ? "已有帳號?" : "還沒有帳號?"}
            </Caption>
            <Button
              role="switch"
              className="h-8 w-12 bg-transparent px-3 py-2"
              onClick={() => setTab(tab === "login" ? "register" : "login")}
            >
              <Caption className="text-soda-100" bold>
                {tab === "register" ? "登入" : "註冊"}
              </Caption>
            </Button>
          </div>
        </div>
      </div>
      <ThirdPartyPanel />
      <ContentFooter className="flex justify-center" />
    </div>
  );
};

export default LoginBox;
