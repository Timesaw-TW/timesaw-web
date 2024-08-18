import { FC } from "react";
import { Dayjs } from "dayjs";
import { merge } from "@/libs/tailwind";
import Footnote from "@/stories/Typography/Footnote";
import CalendarPickerWeek from "./CalendarPickerWeek";
import { CalendarType, getWeekDays } from "@/libs/calendar";
import CalendarPickerMonth from "./CalendarPickerMonth";

interface Props {
  type: CalendarType;
  value: Dayjs;
  searchDate: Dayjs;
  onChange: (date: Dayjs) => unknown;
  className?: string;
  onMonthChange?: (type: "previous" | "next") => unknown;
}

const CalendarPickerPanel: FC<Props> = ({
  type,
  onChange,
  value,
  searchDate,
  className,
  onMonthChange,
}) => {
  // TODO: Change to cookie setting
  const weekDays = getWeekDays(0);

  const onDateChange = (date: Dayjs) => {
    if (
      date.year() > searchDate.year() ||
      (date.year() === searchDate.year() && date.month() > searchDate.month())
    ) {
      onMonthChange?.("next");
    } else if (
      date.year() < searchDate.year() ||
      (date.year() === searchDate.year() && date.month() < searchDate.month())
    ) {
      onMonthChange?.("previous");
    } else {
      onChange(date);
    }
  };

  return (
    <div className={merge("px-4 sm:px-12 lg:px-[4.5rem]", "py-4", className)}>
      <table
        className={merge(
          "w-full",
          type === "month" && "flex flex-col gap-[0.625rem]"
        )}
      >
        <thead>
          <tr className="flex justify-between py-2 text-center">
            {weekDays.map((option) => (
              <th
                key={option}
                className="flex h-[1.125rem] w-8 items-center justify-center"
              >
                <Footnote bold className="text-secondary">
                  {option}
                </Footnote>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {(type === "day" || type === "week") && (
            <CalendarPickerWeek
              value={value}
              searchDate={searchDate}
              onChange={onChange}
            />
          )}
          {type === "month" && (
            <CalendarPickerMonth
              value={value}
              searchDate={searchDate}
              onChange={onDateChange}
            />
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CalendarPickerPanel;
