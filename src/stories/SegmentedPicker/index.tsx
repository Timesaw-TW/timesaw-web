"use client";

import { useEffect, useState } from "react";
import { SegmentedPickerProps, Segment } from "./type";
import { merge } from "@/libs/tailwind";
import Caption from "../Typography/Caption";

export const SegmentedPicker = <T,>({
  className,
  segments,
  value,
  onSelect,
}: SegmentedPickerProps<T>) => {
  const [selectedSegment, setSelectedSegment] = useState<T>(
    segments.find((segment) => segment.value === value)?.value ??
      segments[0].value
  );

  useEffect(() => {
    if (value) {
      setSelectedSegment(value);
    }
  }, [value]);

  const onSegmentClick = (segment: Segment<T>) => {
    setSelectedSegment(segment.value);
    onSelect?.(segment.value);
  };

  return (
    <div
      className={merge(
        "h-8 w-[20.5rem]",
        "flex items-center justify-between",
        "rounded-lg bg-soda-20 p-[0.125rem]",
        "overflow-hidden",
        className
      )}
    >
      {segments.map((segment, index) => {
        const isSelected = segment.value === selectedSegment;
        const isLast = index === segments.length - 1;

        return (
          <button
            key={`${segment.value}-${index}`}
            onClick={() => onSegmentClick(segment)}
            className={merge(
              "relative",
              "h-full rounded-lg transition-colors duration-200",
              "flex flex-1 items-center justify-center",
              isSelected && "border-primary/4 border-[0.5px]",
              isSelected
                ? "bg-white shadow-segmentedPickerSelected"
                : "bg-transparent"
            )}
          >
            <Caption bold>{segment.label}</Caption>
            {!isLast && (
              <div
                className={merge(
                  "h-[60%] w-[0.5px] bg-caption",
                  "absolute right-0 top-[50%] -translate-y-[50%] "
                )}
              />
            )}
          </button>
        );
      })}
    </div>
  );
};
