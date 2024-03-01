import clsx from "clsx";
import { FC } from "react";
import { TextProps } from "../type";

interface Props extends TextProps {}

const Text: FC<Props> = ({ children, className, bold }) => {
  return (
    <span
      className={clsx(
        `font-main text-base`,
        bold ? "font-semibold" : "font-normal",
        className
      )}
    >
      {children}
    </span>
  );
};

export default Text;
