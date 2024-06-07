import { FC } from "react";
import { TextProps } from "../type";
import { merge } from "@/libs/tailwind";

interface Props extends TextProps {}

const Headline: FC<Props> = ({
  children,
  className,
  bold,
  element = "span",
}) => {
  const Element = element as keyof JSX.IntrinsicElements;

  return (
    <Element
      className={merge(
        `font-main text-lg`,
        bold ? "font-bold" : "font-semibold",
        className
      )}
    >
      {children}
    </Element>
  );
};

export default Headline;
