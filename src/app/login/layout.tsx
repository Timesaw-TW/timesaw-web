import { FC, ReactNode } from "react";
import { merge } from "@/libs/tailwind";
import Tim from "@/components/design/Tim";
import { IconLogoText } from "@/stories/Icons";

interface Props {
  children: ReactNode;
}

const LoginLayout: FC<Props> = ({ children }) => {
  return (
    <div className="flex h-full items-end justify-center overflow-x-hidden bg-soda-20">
      <div className={merge("relative h-full", "w-full lg:w-[42.5rem]")}>
        <IconLogoText
          className={merge(
            "absolute fill-soda-40",
            "-right-2 bottom-[calc(70%+8rem)] h-[3.25rem] w-[17.5rem]",
            "sm:bottom-[calc(75%+5.5rem)] sm:h-[5.25rem] sm:w-[27rem]",
            "lg:-right-0 lg:bottom-[calc(75%+5rem)] lg:w-[27.5rem]"
          )}
        />
        <Tim
          className={merge(
            "absolute fill-soda-60",
            "-left-4 bottom-[calc(70%-(11.125rem/3))] h-[11.125rem] w-[10.125rem]",
            "sm:bottom-[calc(75%-(13.5rem/3))] sm:left-4 sm:h-[13.5rem] sm:w-[12.25rem]",
            "lg:w-[12.5rem]"
          )}
        />
        <div
          className={merge(
            "flex items-start justify-center",
            "absolute w-full",
            "top-[30%] sm:top-[25%]",
            "rounded-t-2xl bg-white sm:rounded-2xl",
            "border-l-2 border-r-2 border-t-2 border-soda-100 sm:border-2"
          )}
        >
          <div className="relative z-[1] flex w-full justify-center">
            <div
              className={merge(
                "w-full sm:w-[30rem] lg:w-[22.5rem]",
                "px-4 lg:px-0",
                "sx:py-10 py-6"
              )}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginLayout;
