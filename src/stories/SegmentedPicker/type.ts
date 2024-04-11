export interface SegmentedPickerProps {
  options: SegmentedProps[];
  setSelectedPeriod: (value: string) => void;
}

export interface SegmentedProps {
  label: string;
  value: string;
}
