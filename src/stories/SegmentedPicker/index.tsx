import React, { useState } from "react";
import clsx from "clsx";
import { SegmentedPickerProps } from "./type";

export const SegmentedPicker: React.FC<SegmentedPickerProps> = ({
  className,
  segments,
  onSelect,
}) => {
  const [selectedSegment, setSelectedSegment] = useState(segments[0]);
  const onSegmentClick = (segment: string) => {
    setSelectedSegment(segment);
    onSelect(segment);
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
      {segments.map((segment) => (
        <div
          className={clsx(
            "flex flex-1 items-center justify-center",
            "relative gap-1",
            segment !== selectedSegment &&
              ` 
            after: 
            border-zinc-600
            after:absolute 
            after:bottom-2 
            after:left-[-8px] 
            after:top-2 
            after:w-[1px] after:border-x-[0.5px]
            after:content-['']`
          )}
          key={segment}
        >
          <button
            className={clsx(
              segment === selectedSegment
                ? "bg-white shadow-xl "
                : "bg-transparent",
              "flex flex-1 items-center justify-center",
              "rounded-lg transition-colors duration-200",
              "z-10"
            )}
            onClick={() => onSegmentClick(segment)}
          >
            <span
              className={clsx(
                "h-9 w-20 p-1",
                segment === selectedSegment ? "font-bold" : "font-normal"
              )}
            >
              {segment}
            </span>
          </button>
        </div>
      ))}
    </div>
  );
};
