import clsx from "clsx";
import { FC } from "react";
import { TextProps } from "../type";

interface Props extends TextProps {}

const Title: FC<Props> = ({ children, className, bold }) => {
  return (
    <span
      className={clsx(
        `font-main text-xl`,
        bold ? "font-semibold" : "font-normal",
        className
      )}
    >
      {children}
    </span>
  );
};

export default Title;
