import { FC } from "react";
import { TextProps } from "../type";
import { merge } from "@/libs/tailwind";

interface Props extends TextProps {}

const Caption: FC<Props> = ({
  children,
  className,
  bold,
  element = "span",
}) => {
  const Element = element as keyof JSX.IntrinsicElements;

  return (
    <Element
      className={merge(
        `font-main text-xs`,
        bold ? "font-medium" : "font-normal",
        className
      )}
    >
      {children}
    </Element>
  );
};

export default Caption;
