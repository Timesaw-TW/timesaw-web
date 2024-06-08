import { FC, ReactNode } from "react";
import { merge } from "@/libs/tailwind";
import Tim from "@/components/design/Tim";
import { IconLogoText } from "@/stories/Icons";

interface Props {
  children: ReactNode;
}

const LoginLayout: FC<Props> = ({ children }) => {
  return (
    <div className="flex h-full items-end justify-center bg-soda-20">
      <div className={merge("relative", "w-full sm:w-[42.5rem]")}>
        <IconLogoText
          className={merge(
            "absolute fill-soda-40",
            "-right-2 -top-[calc(3.25rem+8rem)] h-[3.25rem] w-[17.5rem]",
            "sm:-top-[calc(5.25rem+5.5rem)] sm:h-[5.25rem] sm:w-[27rem]",
            "lg:-right-0 lg:-top-[calc(5.25rem+5rem)] lg:w-[27.5rem]"
          )}
        />
        <Tim
          className={merge(
            "absolute fill-soda-60",
            "-left-4 -top-[calc(11.125rem/3)*2] h-[11.125rem] w-[10.125rem]",
            "sm:-top-[calc(13.5rem/3)*2] sm:left-4 sm:h-[13.5rem] sm:w-[12.25rem]",
            "lg:w-[12.5rem]"
          )}
        />
        <div
          className={merge(
            "flex items-center justify-center",
            "relative z-[1] h-[75vh]",
            "rounded-t-2xl  bg-white",
            "border-l-2 border-r-2 border-t-2 border-soda-100"
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default LoginLayout;
