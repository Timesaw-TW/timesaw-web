import { ClassValue } from "clsx";
import { ReactNode } from "react";

export interface ErrorMessageProps {
  message?: string | ReactNode;
  element?: ReactNode;
  className?: ClassValue;
}
