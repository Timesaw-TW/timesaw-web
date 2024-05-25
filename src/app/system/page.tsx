"use client";

import ThemeToggle from "@/components/util/ThemeToggle";
import { IconHomeSolid } from "@/stories/Icons";
import Text from "@/stories/Typography/Text";
import Title from "@/stories/Typography/Title";
import { merge } from "@/utils/tailwind";
import { useRouter } from "next/navigation";

export default function System() {
  const router = useRouter();

  return (
    <div className="">
      <div className="relative">
        <Title bold className="m-5 text-center" element="div">
          System Testing
        </Title>
        <button
          className={merge("h-6 w-6", "absolute right-5 top-0")}
          onClick={() => router.push("/")}
        >
          <IconHomeSolid
            className={merge("h-full w-full", "hover:text-secondary")}
          />
        </button>
      </div>
      <div
        className={merge("m-5 rounded-md p-5", "border-[2px] border-soda-100")}
      >
        <div className={merge("flex gap-3")}>
          <Text>Current Theme:</Text>
          <ThemeToggle className="rounded-md border border-secondary px-1" />
        </div>
      </div>
    </div>
  );
}
