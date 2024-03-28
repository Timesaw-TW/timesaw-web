export interface TimeButtonProps {
  timePeriods: Periods[];
  clickEvent: (time: string) => void;
}

export interface Periods {
  time: string;
  value: string;
}
