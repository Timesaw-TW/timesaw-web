import clsx from "clsx";
import { FC } from "react";
import { TextProps } from "../type";

interface Props extends TextProps {}

const Caption: FC<Props> = ({
  children,
  className,
  bold,
  element = "caption",
}) => {
  const Element = element as keyof JSX.IntrinsicElements;

  return (
    <Element
      className={clsx(
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
