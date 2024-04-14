import clsx from "clsx";
import { FC } from "react";
import { TextProps } from "../type";

interface Props extends TextProps {}

const Title: FC<Props> = ({ children, className, bold, element = "h1" }) => {
  const Element = element as keyof JSX.IntrinsicElements;

  return (
    <Element
      className={clsx(
        `font-main text-xl`,
        bold ? "font-semibold" : "font-normal",
        className
      )}
    >
      {children}
    </Element>
  );
};

export default Title;
