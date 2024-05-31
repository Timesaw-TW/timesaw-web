export interface SegmentedPickerProps {
  className?: string;
  segments: string[];
  onSelect: (segment: string) => void;
}
