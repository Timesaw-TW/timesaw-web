import { ChangeEvent, ReactNode } from "react";
import { ClassValue } from "clsx";
import { Dayjs } from "dayjs";

export type DateTimePickerMode = "date" | "month" | "year";

export interface TimeOption {
  hour: number;
  min: number;
  sec: number;
}

export interface DateTimePickerProps {
  id: string;
  name: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string | ReactNode;
  className?: ClassValue;
  max?: Dayjs;
  min?: Dayjs;
}
