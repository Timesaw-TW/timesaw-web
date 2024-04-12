import clsx from "clsx";
import dayjs, { Dayjs } from "dayjs";
import { FC } from "react";
import Text from "@/stories/Text/Text";

interface Props {
  value: Dayjs;
  year: number;
  onChange?: (year: number, month: number) => void;
  max?: Dayjs;
  min?: Dayjs;
}

const DateTimePickerMonthView: FC<Props> = ({
  value,
  year,
  onChange,
  max,
  min,
}) => {
  return (
    <ul className={clsx("grid grid-cols-4 gap-[10px] ")}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((month) => {
        const isOutOfMax =
          max &&
          (max.year() < year ||
            (max.year() === year && month > max.month() + 1));
        const isOutOfMin =
          min &&
          (min.year() > year ||
            (min.year() === year && month < min.month() + 1));

        const isDisable = isOutOfMax || isOutOfMin;

        const monthText = dayjs(`2024/${month}/01`).format("MMM");
        return (
          <li
            key={`month-view-${month}`}
            className={clsx(
              "rounded px-3 py-2",
              "flex items-center justify-center",
              isDisable
                ? "text-neutral-divider"
                : "cursor-pointer hover:bg-primary-40",
              !isDisable &&
                value.year() === year &&
                value.month() + 1 === month &&
                "bg-primary-40"
            )}
            onClick={() => {
              if (!isDisable) {
                onChange?.(year, month);
              }
            }}
          >
            <Text>{monthText}</Text>
          </li>
        );
      })}
    </ul>
  );
};

export default DateTimePickerMonthView;
