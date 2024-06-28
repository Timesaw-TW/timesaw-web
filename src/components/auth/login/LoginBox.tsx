"use client";

import { merge } from "@/libs/tailwind";
import { FC, useEffect, useMemo, useState } from "react";
import RegisterPanel from "./RegisterPanel";
import ThirdPartyPanel from "./ThirdPartyPanel";
import LoginPanel from "./LoginPanel";
import Caption from "@/stories/Typography/Caption";
import Button from "@/stories/Button";
import { SegmentedPicker } from "@/stories/SegmentedPicker";
import { useRouter, useSearchParams } from "next/navigation";
import ContentFooter from "./ContentFooter";

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

  useEffect(() => {
    setTab(getPageType(searchParams.get("type")));
  }, [searchParams]);

  const changeTab = (tab: PageType) => {
    replace(`/login?type=${tab}`);
  };

  const segments = useMemo<{ label: string; value: PageType }[]>(
    () => [
      { label: "註冊", value: "register" },
      { label: "登入", value: "login" },
    ],
    []
  );

  return (
    <div className={merge("h-full w-full", "flex flex-col gap-6", className)}>
      <SegmentedPicker
        value={tab}
        segments={segments}
        onSelect={(value) => changeTab(value)}
      />
      <div>
        {tab === "register" && (
          <RegisterPanel onSuccess={() => changeTab("login")} />
        )}
        {tab === "login" && (
          <LoginPanel
            onSuccess={() => {
              push("/splash");
              setTimeout(() => {
                replace("/");
              }, 3000);
            }}
          />
        )}
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
              onClick={() => changeTab(tab === "login" ? "register" : "login")}
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
