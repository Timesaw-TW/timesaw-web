import { FC } from "react";
import { TextProps } from "../type";
import { merge } from "@/libs/tailwind";

interface Props extends TextProps {}

const Title: FC<Props> = ({ children, className, bold, element = "h1" }) => {
  const Element = element as keyof JSX.IntrinsicElements;

  return (
    <Element
      className={merge(
        `font-main text-xl lg:text-3xl`,
        bold ? "font-semibold" : "font-normal",
        className
      )}
    >
      {children}
    </Element>
  );
};

export default Title;
