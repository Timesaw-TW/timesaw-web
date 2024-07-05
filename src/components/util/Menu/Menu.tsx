"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";
import {
  IconArchiveBoxOutline,
  IconCogEightOutline,
  IconHomeOutline,
  IconRocketLaunchOutline,
  IconTagOutline,
  IconXMark,
} from "@/stories/Icons";
import SubHeadline from "@/stories/Typography/SubHeadline";

interface Props {
  onClosed?: () => void;
}

const Menu: FC<Props> = ({ onClosed }) => {
  const { push } = useRouter();

  const redirect = (path: string) => {
    push(path);
    onClosed?.();
  };

  return (
    <ul className="flex flex-col gap-4">
      {onClosed && (
        <li>
          <button className="w-full gap-2 p-3" onClick={onClosed}>
            <IconXMark />
          </button>
        </li>
      )}
      <li>
        <button
          className="flex w-full items-center gap-2"
          onClick={() => redirect("/")}
        >
          <div className="p-3">
            <IconHomeOutline />
          </div>
          <SubHeadline bold>首頁</SubHeadline>
        </button>
      </li>
      <li>
        <button className="flex w-full items-center gap-2">
          <div className="p-3">
            <IconTagOutline />
          </div>
          <SubHeadline bold>類別標籤</SubHeadline>
        </button>
      </li>
      <li>
        <button className="flex w-full items-center gap-2">
          <div className="p-3">
            <IconArchiveBoxOutline />
          </div>
          <SubHeadline bold>雜亂箱</SubHeadline>
        </button>
      </li>
      <li>
        <button className="flex w-full items-center gap-2">
          <div className="p-3">
            <IconRocketLaunchOutline />
          </div>
          <SubHeadline bold>儀表板</SubHeadline>
        </button>
      </li>
      <li>
        <button className="flex w-full items-center gap-2">
          <div className="p-3">
            <IconCogEightOutline />
          </div>
          <SubHeadline bold>設定</SubHeadline>
        </button>
      </li>
    </ul>
  );
};

export default Menu;
