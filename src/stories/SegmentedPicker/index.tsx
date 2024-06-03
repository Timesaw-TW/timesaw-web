import { useState } from "react";
import clsx from "clsx";
import Text from "../Typography/Text";
import { SegmentedPickerProps, Segment } from "./type";

export const SegmentedPicker = <T,>({
  className,
  segments,
  value,
  onSelect,
}: SegmentedPickerProps<T>) => {
  const [selectedSegment, setSelectedSegment] = useState<T>(
    segments.find((segment) => segment.value === value)?.value ||
      segments[0].value
  );

  const onSegmentClick = (segment: Segment<T>) => {
    setSelectedSegment(segment.value);
    onSelect?.(segment.value);
  };

  return (
    <div
      className={clsx(
        "flex items-center justify-between",
        "rounded-lg bg-soda-40 px-[2px]",
        "overflow-hidden",
        className
      )}
    >
      {segments.map((segment, index) => {
        const isSelected = segment.value === selectedSegment;
        return (
          <div
            className={clsx(
              "flex flex-1 items-center justify-center",
              "relative gap-1",
              !isSelected && "after: border-zinc-600",
              "after:absolute",
              "after:bottom-2",
              "after:left-[-8px]",
              "after:top-2",
              "after:w-[1px] after:border-x-[0.5px]",
              "after:content-['']"
            )}
            key={`${segment.value}-${index}`}
          >
            <button
              className={clsx(
                isSelected ? "bg-white shadow-xl " : "bg-transparent",
                "flex flex-1 items-center justify-center",
                "rounded-lg transition-colors duration-200",
                "z-10"
              )}
              onClick={() => onSegmentClick(segment)}
            >
              <Text className={clsx("h-9 w-20 p-1")} bold={isSelected}>
                {segment.label}
              </Text>
            </button>
          </div>
        );
      })}
    </div>
  );
};
