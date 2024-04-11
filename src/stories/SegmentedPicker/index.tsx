import { FunctionComponent, useEffect, useState } from "react";
import { SegmentedPickerProps } from "./type";
import { Button } from "../Button";
import Text from "../Text/Text";
import clsx from "clsx";

const SegmentedPicker: FunctionComponent<SegmentedPickerProps> = ({
  setSelectedPeriod,
  options,
}: SegmentedPickerProps) => {
  const [selectedTimeIndex, setSelectedTimeIndex] = useState<number>(0);

  const clickHandler = (event: string, index: number) => {
    setSelectedTimeIndex(index);
    setSelectedPeriod(event);
  };

  return (
    <div
      className={clsx(
        `flex h-[37px] w-full items-center justify-center gap-0 rounded-lg bg-primary-40`
      )}
    >
      {options.map((option, index) => (
        <div
          key={`${option.value}-${index}`}
          className={clsx(`w-29 flex h-[37px] items-center 
          gap-0 border-l-[1px]  bg-primary-40 px-1 py-1.5
         `)}
        >
          <Button
            theme="primary"
            level={20}
            className={clsx(`h-6 w-28 rounded-lg bg-primary-20 shadow-md`)}
          >
            <Text>{option.label}</Text>
          </Button>
        </div>
      ))}
    </div>
  );
};

export default SegmentedPicker;
