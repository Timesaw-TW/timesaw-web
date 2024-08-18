"use client";

import useMenu from "@/hooks/useMenu";
import { merge } from "@/libs/tailwind";
import Menu from "./Menu";

const SlideMenu = () => {
  const { opened, setOpened } = useMenu();

  return (
    <div
      role="menu"
      className={merge(
        "absolute left-0 top-0 z-[1000] h-full w-full bg-[#00000040]",
        !opened && "-translate-x-full transform",
        opened && "translate-x-0 transform",
        "lg:hidden"
      )}
    >
      <div
        className={merge(
          "h-full bg-soda-20",
          "transition-transform duration-500",
          !opened && "-translate-x-full transform",
          opened && "translate-x-0 transform",
          "w-full px-4 py-1",
          "sm:w-[20.25rem] sm:rounded-tr-[1.75rem] sm:px-9 sm:pb-6 sm:pt-2 sm:shadow-menu"
        )}
      >
        <Menu onClosed={() => setOpened(false)} />
      </div>
    </div>
  );
};

export default SlideMenu;
