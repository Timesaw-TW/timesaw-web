"use client";

import Image from "next/image";
import { merge } from "@/libs/tailwind";
import Footnote from "@/stories/Typography/Footnote";

const ThirdPartyPanel = () => {
  return (
    <>
      <div className="relative flex justify-center">
        <div
          className={merge(
            "absolute bottom-[50%]",
            "h-[1px] w-full bg-caption"
          )}
        ></div>
        <Footnote
          className={merge("relative z-[1] px-1", "bg-white text-secondary")}
        >
          或使用社交帳號登入
        </Footnote>
      </div>
      <div className="flex justify-center gap-6">
        <button
          className={merge("h-10 w-10 p-2", "rounded border border-soda-100")}
        >
          <div className="relative h-6 w-6">
            <Image src="/images/line.png" alt="LINE" fill sizes="auto" />
          </div>
        </button>
        <button
          className={merge("h-10 w-10 p-2", "rounded border border-soda-100")}
        >
          <div className="relative h-6 w-6">
            <Image
              src="/images/facebook.png"
              alt="Facebook"
              fill
              sizes="auto"
            />
          </div>
        </button>
        <button
          className={merge("h-10 w-10 p-2", "rounded border border-soda-100")}
        >
          <div className="relative h-6 w-6">
            <Image src="/images/google.png" alt="Google" fill sizes="auto" />
          </div>
        </button>
      </div>
      <div className="flex justify-center">
        <Footnote>登入或註冊即代表同意</Footnote>
        <Footnote className="cursor-pointer text-soda-100 " element="a">
          <u>隱私權政策</u>
        </Footnote>
        <Footnote>和</Footnote>
        <Footnote className="cursor-pointer text-soda-100" element="a">
          <u>使用條款</u>
        </Footnote>
      </div>
    </>
  );
};

export default ThirdPartyPanel;
