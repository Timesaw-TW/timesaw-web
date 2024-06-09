"use client";

import { useState } from "react";
import { TimeButtonProps } from "./type";
import Caption from "../Typography/Caption";
import { merge } from "@/libs/tailwind";

const TimeButton = <T,>({
  className,
  value,
  onChange,
  options,
}: TimeButtonProps<T>) => {
  const [selectedTimeIndex, setSelectedTimeIndex] = useState<number>(
    value !== undefined ? options.map((x) => x.value).indexOf(value) : 0
  );

  const onTimeClick = (time: T, index: number) => {
    setSelectedTimeIndex(index);
    onChange?.(time);
  };

  return (
    <div
      className={merge(
        "h-[40px] w-[320px]",
        "overflow-hidden",
        "flex items-center justify-center",
        "rounded-md bg-soda-20",
        className
      )}
    >
      {options.map((period, index) => (
        <button
          type="button"
          key={`${period.value}-${index}`}
          data-testid={`time-btn-${period.value}`}
          className="relative h-full w-full flex-1"
          onClick={() => onTimeClick(period.value, index)}
        >
          {index === selectedTimeIndex && index > 0 && (
            <div className="absolute z-[1] h-full w-[50%] bg-soda-40" />
          )}
          <div
            className={merge(
              "relative z-[2] h-full w-full",
              "flex items-center justify-center",
              index === selectedTimeIndex && "rounded-lg bg-soda-80",
              index < selectedTimeIndex && "bg-soda-40"
            )}
          >
            {typeof period.label === "string" ? (
              <Caption bold={index === selectedTimeIndex}>
                {period.label}
              </Caption>
            ) : (
              period.label
            )}
          </div>
        </button>
      ))}
    </div>
  );
};

export default TimeButton;
