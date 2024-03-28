import { FunctionComponent, useEffect, useState } from "react";
import { TimeButtonProps } from "./type";
import { Button } from "../Button";
import clsx from "clsx";

const TimeButton: FunctionComponent<TimeButtonProps> = ({
  timePeriods,
  clickEvent,
}: TimeButtonProps) => {
  const [buttonSelected, setButtonSelected] = useState<boolean[]>([]);
  useEffect(() => {
    setButtonSelected(timePeriods.map(() => false));
    console.log("buttonSelected", buttonSelected);
  }, [timePeriods]);
  const clickHandler = (time: string, index: number) => {
    setButtonSelected((prev) => {
      const newSelected = prev.map((_, i) => (i === index ? true : false));
      return newSelected;
    });
    console.log("buttonSelected", buttonSelected);

    clickEvent(time);
  };

  return (
    <div
      className={clsx(
        `flex h-14 max-w-[594px] items-center justify-center gap-0 rounded-lg bg-primary-40 px-0 py-0`
      )}
    >
      {timePeriods.map((period, index) => (
        <Button
          theme="primary"
          level={buttonSelected[index] ? 100 : 40}
          className={clsx(`rounded-lg,, h-14 w-16 gap-[10px]`)}
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
