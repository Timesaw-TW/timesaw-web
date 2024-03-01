import { ClassValue } from "clsx";
import { ReactNode } from "react";

export type TextProps = {
  children: ReactNode;
  className?: ClassValue;
  bold?: boolean;
};
