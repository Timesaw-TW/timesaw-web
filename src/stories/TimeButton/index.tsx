import { FunctionComponent, useEffect, useState } from "react";
import { TimeButtonProps } from "./type";
import { Button } from "../Button";
import clsx from "clsx";

const TimeButton: FunctionComponent<TimeButtonProps> = ({
  timePeriods,
  clickEvent,
}: TimeButtonProps) => {
  const initialSelected = timePeriods.map(() => false);
  const [buttonSelected, setButtonSelected] =
    useState<boolean[]>(initialSelected);

  const clickHandler = (time: string, index: number) => {
    setButtonSelected((prev) => {
      const newSelected = prev.map((_, i) => (i === index ? true : false));
      return newSelected;
    });
    clickEvent(time);
  };

  return (
    <div
      className={clsx(
        `flex items-center justify-center gap-0 rounded-lg bg-primary-40 px-0 py-0`
      )}
    >
      {timePeriods.map((period, index) => (
        <Button
          theme="primary"
          level={buttonSelected[index] ? 100 : 40}
          className={clsx(`rounded-lg, h-10 w-16 gap-[10px]`)}
          key={`${period.value}_${index}`}
          onClick={() => clickHandler(period.value, index)}
        >
          {period.time}
        </Button>
      ))}
    </div>
  );
};

export default TimeButton;
