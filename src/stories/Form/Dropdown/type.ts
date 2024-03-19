import { ReactNode } from "react";
import { ClassValue } from "clsx";

export interface SelectOption<T> {
  label: string;
  value: T;
}

export interface DropdownProps<T> {
  searchValue?: string;
  label?: string | ReactNode;
  onChange?: (value: SelectOption<T>) => void;
  options: SelectOption<T>[];
  className?: ClassValue;
  allowCreate?: boolean;
  onCreateClick?: (value: string) => void;
  selected?: T[];
}
