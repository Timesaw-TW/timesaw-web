"use client";

import { merge } from "@/libs/tailwind";
import { FC, useMemo, useState } from "react";
import RegisterPanel from "./RegisterPanel";
import ThirdPartyPanel from "./ThirdPartyPanel";
import LoginPanel from "./LoginPanel";
import Caption from "@/stories/Typography/Caption";
import Button from "@/stories/Button";
import { SegmentedPicker } from "@/stories/SegmentedPicker";

interface Props {
  className?: string;
}

const LoginBox: FC<Props> = ({ className }) => {
  const [tab, setTab] = useState<"register" | "login">("register");

  const segments = useMemo(
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
        onSelect={() => setTab(tab === "login" ? "register" : "login")}
      />
      <div>
        {tab === "register" && <RegisterPanel />}
        {tab === "login" && <LoginPanel />}
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
              onClick={() => setTab(tab === "register" ? "login" : "register")}
            >
              <Caption className="text-soda-100" bold>
                {tab === "register" ? "登入" : "註冊"}
              </Caption>
            </Button>
          </div>
        </div>
      </div>
      <ThirdPartyPanel />
    </div>
  );
};

export default LoginBox;
