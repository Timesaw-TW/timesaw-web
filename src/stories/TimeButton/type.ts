import { ReactNode } from "react";

export interface TimeButtonProps<T> {
  className?: string;
  value?: T;
  onChange?: (time: T) => void;
  options: Periods<T>[];
}

export interface Periods<T> {
  label: string | ReactNode;
  value: T;
}
