import clsx from "clsx";
import { FC } from "react";
import { TextProps } from "../type";

interface Props extends TextProps {}

const Footnote: FC<Props> = ({
  children,
  className,
  bold,
  element = "span",
}) => {
  const Element = element as keyof JSX.IntrinsicElements;

  return (
    <Element
      className={clsx(
        `font-main text-sm`,
        bold ? "font-semibold" : "font-normal",
        className
      )}
    >
      {children}
    </Element>
  );
};

export default Footnote;
