import { ReactNode } from "react";

export interface TimeButtonProps {
  timePeriods: Periods[];
  onTimeSelect: (time: number) => void;
}

export interface Periods {
  label: string | ReactNode;
  value: number;
}
