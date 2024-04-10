import { FunctionComponent, useEffect, useState } from "react";
import { TimeButtonProps } from "./type";
import { Button } from "../Button";
import Text from "../Text/Text";
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
      "rounded-lg w-16 gap-[10px] h-14",
      isActive ? "bg-primary-100" : isPast ? "bg-primary-60" : "bg-primary-40"
    );
  };
  const getBackGroundClass = (index: number) => {
    const isFirst = index === 0;
    const isLast = index === timePeriods.length - 1;
    if (selectedTimeIndex === index) {
      return isFirst
        ? "rounded-lg bg-primary-100"
        : "rounded-r-lg bg-primary-60";
    }

    return isFirst
      ? "rounded-l-lg bg-primary-60"
      : isLast
        ? "rounded-r-lg bg-primary-60"
        : "bg-primary-60";
  };

  const convertMinutesToFormattedTime = (time: number) => {
    const formattedTime = time / 60;

    if (formattedTime < 1) {
      return time <= 15 ? `${time} ` : `${time} 分鐘`;
    }
    return `${formattedTime} 小時`;
  };

  return (
    <div
      className={clsx(
        `flex items-center justify-center gap-0 rounded-lg bg-primary-40 px-0 py-0`
      )}
    >
      {timePeriods.map((period, index) => (
        <div
          key={`${period}_${index}`}
          className={clsx(`${getBackGroundClass(index)}`)}
        >
          <Button
            theme="primary"
            className={getButtonClass(index)}
            onClick={() => clickHandler(period, index)}
          >
            <Text>{convertMinutesToFormattedTime(period)}</Text>
          </Button>
        </div>
      ))}
    </div>
  );
};

export default TimeButton;
