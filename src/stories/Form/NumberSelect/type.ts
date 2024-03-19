import { ClassValue } from "clsx";
import { InputHTMLAttributes } from "react";

export interface NumberSelectProps
  extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  name: string;
  min?: number;
  max?: number;
  dropdown?: {
    className?: ClassValue;
  };
}
