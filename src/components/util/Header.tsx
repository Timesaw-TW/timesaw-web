import { FC, ReactNode } from "react";
import { merge } from "@/libs/tailwind";
import { IconBarsThreeOutline } from "@/stories/Icons";
import Headline from "@/stories/Typography/Headline";
import useMenu from "@/hooks/useMenu";

interface Props {
  showNav?: boolean;
  children: string | ReactNode;
  className?: string;
  right?: ReactNode;
}

const Header: FC<Props> = ({ showNav = true, children, right, className }) => {
  const { opened, setOpened } = useMenu();

  return (
    <div
      className={merge(
        "flex items-center justify-between",
        "px-1 sm:px-9 lg:px-[4.5rem]",
        "sm:pt-2 lg:pt-4",
        className
      )}
    >
      <div className="flex items-center">
        {showNav && (
          <button
            type="button"
            className="p-3 lg:hidden"
            onClick={() => setOpened(!opened)}
          >
            <IconBarsThreeOutline />
          </button>
        )}
        <div className="px-2 py-3">
          {typeof children === "string" ? (
            <Headline bold>{children}</Headline>
          ) : (
            children
          )}
        </div>
      </div>
      {right}
    </div>
  );
};

export default Header;
