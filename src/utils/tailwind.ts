import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const merge = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
