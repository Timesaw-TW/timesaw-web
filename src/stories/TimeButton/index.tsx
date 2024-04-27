import React, { FunctionComponent, ReactNode, useState } from "react"; // 引入 React
import { TimeButtonProps } from "./type";
import { Button } from "../Button";
import Text from "../Typography/Text";
import clsx from "clsx";

const TimeButton: FunctionComponent<TimeButtonProps> = ({
  timePeriods,
  onTimeSelect,
}: TimeButtonProps) => {
  const [selectedTimeIndex, setSelectedTimeIndex] = useState<number>(0);

  const clickHandler = (time: number, index: number) => {
    setSelectedTimeIndex(index);
    onTimeSelect(time);
  };

  const getButtonClass = (index: number) => {
    const isActive = selectedTimeIndex === index;
    const isPast = selectedTimeIndex > index;

    return clsx(
      "rounded-lg w-16 gap-[10px] h-[54px]",
      isActive ? "bg-soda-100" : isPast ? "bg-soda-60" : "bg-soda-40"
    );
  };
  const getBackGroundClass = (index: number) => {
    const isFirst = index === 0;
    const isLast = index === timePeriods.length - 1;
    if (selectedTimeIndex === index) {
      return isFirst ? "rounded-lg bg-soda-100" : "rounded-r-lg bg-soda-60";
    }

    return isFirst
      ? "rounded-l-lg bg-soda-60"
      : isLast
        ? "rounded-r-lg bg-soda-60"
        : "bg-soda-60";
  };

  const formatTimeLabel = (label: string | ReactNode) => {
    if (typeof label !== "string") {
      return label;
    }

    const regex = /\d+/g;
    const match = label.match(regex);
    if (match === null) {
      return label;
    }

    const unit = label?.toString().includes("分鐘") ? "分鐘" : "小時";
    return `${match[0]} ${unit}`;
  };

  return (
    <div
      className={clsx(
        "flex items-center justify-center gap-0 rounded-lg bg-soda-40"
      )}
    >
      {timePeriods.map((period, index) => (
        <div
          key={`${period}_${index}`}
          className={clsx(`${getBackGroundClass(index)}`)}
        >
          <Button
            data-testid={`button-${period.value}`}
            className={getButtonClass(index)}
            onClick={() => clickHandler(period.value, index)}
          >
            <Text>{formatTimeLabel(period.label)}</Text>
          </Button>
        </div>
      ))}
    </div>
  );
};

export default TimeButton;
