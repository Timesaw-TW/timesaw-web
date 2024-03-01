import clsx from "clsx";
import { FC } from "react";
import { TextProps } from "../type";

interface Props extends TextProps {}

const Headline: FC<Props> = ({ children, className, bold }) => {
  return (
    <span
      className={clsx(
        `font-main text-lg`,
        bold ? "font-bold" : "font-semibold",
        className
      )}
    >
      {children}
    </span>
  );
};

export default Headline;
