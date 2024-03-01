import clsx from "clsx";
import { FC } from "react";
import { TextProps } from "../type";

interface Props extends TextProps {}

const Caption: FC<Props> = ({ children, className, bold }) => {
  return (
    <span
      className={clsx(
        `font-main text-xs`,
        bold ? "font-medium" : "font-normal",
        className
      )}
    >
      {children}
    </span>
  );
};

export default Caption;
