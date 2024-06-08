export interface Segment<T> {
  label: string;
  value: T;
}

export interface SegmentedPickerProps<T> {
  className?: string;
  segments: Segment<T>[];
  value?: T;
  onSelect?: (selectedSegment: T) => void;
}
