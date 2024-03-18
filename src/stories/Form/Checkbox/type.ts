import { InputHTMLAttributes, ReactNode } from "react";

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  name: string;
  checked: boolean;
  children: string | ReactNode;
  withIcon?: boolean;
  withFocus?: boolean;
}
