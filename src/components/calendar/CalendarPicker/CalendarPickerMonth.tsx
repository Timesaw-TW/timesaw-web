"use client";

import { FC, useMemo } from "react";
import dayjs, { Dayjs } from "dayjs";
import SubHeadline from "@/stories/Typography/SubHeadline";
import { merge } from "@/libs/tailwind";

type DateOption = {
  date: Dayjs;
  isOutOfMon: boolean;
};

interface Props {
  value: Dayjs;
  searchDate: Dayjs;
  onChange: (date: Dayjs) => unknown;
  className?: string;
}
const CalendarPickerMonth: FC<Props> = ({
  value,
  searchDate,
  onChange,
  className,
}) => {
  const dateList = useMemo(() => {
    const result: DateOption[][] = [];
    const searchTarget = searchDate.startOf("month");

    const showPreMonDayCount = searchTarget.startOf("month").day();
    const showNextMonDayCount = 7 - searchTarget.endOf("month").day() - 1;
    const totalCount =
      showPreMonDayCount + searchTarget.daysInMonth() + showNextMonDayCount;
    let currentDate = searchTarget.subtract(showPreMonDayCount, "day");

    for (let week = 0; week < totalCount / 7; week++) {
      const weekData: DateOption[] = [];
      for (let day = 0; day < 7; day++) {
        weekData.push({
          date: currentDate.clone(),
          isOutOfMon:
            currentDate.year() !== searchTarget.year() ||
            currentDate.month() !== searchTarget.month(),
        });
        currentDate = currentDate.add(1, "day");
      }
      result.push(weekData);
    }

    return result;
  }, [searchDate]);

  return (
    <>
      {dateList.map((week, weekIndex) => (
        <tr
          key={`picker-week-${weekIndex}`}
          className={merge("flex justify-between py-2", className)}
        >
          {week.map((dateItem, dateIndex) => {
            return (
              <td
                key={`picker-week-${weekIndex}-${dateIndex}`}
                className={merge(
                  "flex h-8 w-8 cursor-pointer items-center justify-center",
                  dateItem.isOutOfMon
                    ? "text-caption"
                    : "hover:rounded-[50%] hover:bg-soda-40",
                  !dateItem.isOutOfMon &&
                    dateItem.date.isSame(value, "date") &&
                    "rounded-[50%] bg-soda-80"
                )}
                onClick={() => onChange(dateItem.date)}
              >
                <SubHeadline>{dateItem.date.date()}</SubHeadline>
              </td>
            );
          })}
        </tr>
      ))}
    </>
  );
};

export default CalendarPickerMonth;
