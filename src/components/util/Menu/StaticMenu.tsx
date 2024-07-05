import { merge } from "@/libs/tailwind";
import Menu from "./Menu";

const StaticMenu = () => {
  return (
    <div
      className={merge(
        "h-full w-[16rem] rounded-[1.75rem] bg-soda-20 p-6",
        "hidden lg:block"
      )}
    >
      <Menu />
    </div>
  );
};

export default StaticMenu;
