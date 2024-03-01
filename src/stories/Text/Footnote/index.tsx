import clsx from "clsx";
import { FC } from "react";
import { TextProps } from "../type";

interface Props extends TextProps {}

const Footnote: FC<Props> = ({ children, className, bold }) => {
  return (
    <span
      className={clsx(
        `font-main text-sm`,
        bold ? "font-semibold" : "font-normal",
        className
      )}
    >
      {children}
    </span>
  );
};

export default Footnote;
