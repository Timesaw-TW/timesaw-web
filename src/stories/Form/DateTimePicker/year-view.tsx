import clsx from "clsx";
import { Dayjs } from "dayjs";
import { FC } from "react";
import Text from "@/stories/Text/Text";

interface Props {
  value: Dayjs;
  year: number;
  min?: Dayjs;
  max?: Dayjs;
  onChange?: (year: number) => void;
}

const DateTimePickerYearView: FC<Props> = ({
  value,
  year: searchYear,
  onChange,
  max,
  min,
}) => {
  const startYear = Math.floor(searchYear / 10) * 10 + 1;
  const years = Array.from({ length: 12 }, (_, index) => startYear + index);

  return (
    <ul className={clsx("grid grid-cols-4 gap-[10px] ")}>
      {years.map((year, index) => {
        const isOutOfMax = max && year > max.year();
        const isOutOfMin = min && year < min.year();
        const isDisable = isOutOfMax || isOutOfMin;

        return (
          <li
            key={`year-view-${year}`}
            className={clsx(
              "rounded px-3 py-2",
              "flex items-center justify-center",
              isDisable ? "text-neutral-divider" : "cursor-pointer",
              !isDisable && value.year() === year && "bg-primary-40",
              !isDisable && index <= 9 && "hover:bg-primary-40",
              index > 9 && "text-neutral-divider"
            )}
            onClick={() => {
              if (!isDisable) {
                onChange?.(year);
              }
            }}
          >
            <Text>{year}</Text>
          </li>
        );
      })}
    </ul>
  );
};

export default DateTimePickerYearView;