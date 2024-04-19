"use client";

import { FC, useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import dayjs, { Dayjs } from "dayjs";
import objectSupport from "dayjs/plugin/objectSupport";
import Footnote from "@/stories/Typography/Footnote";
import SubHeadline from "@/stories/Typography/SubHeadline";
import Text from "@/stories/Typography/Text";
import TimeSelect from "./time-select";

dayjs.extend(objectSupport);

type DateOption = {
  date: Dayjs;
  enable: boolean;
  isOutOfMon: boolean;
};

interface Props {
  value: Dayjs;
  year?: number;
  month?: number;
  onChange?: (value: Dayjs) => void;
  onMonthChange?: (type: "next" | "previous") => void;
  max?: Dayjs;
  min?: Dayjs;
}

const DateTimePickerDateView: FC<Props> = ({
  value,
  year,
  month,
  onChange,
  onMonthChange,
  max,
  min,
}) => {
  const [searchYear, setSearchYear] = useState<number>(value.year());
  const [searchMonth, setSearchMonth] = useState<number>(value.month() + 1);

  useEffect(() => {
    if (value) {
      setSearchYear(value.year());
      setSearchMonth(value.month() + 1);
    }
  }, [value]);

  useEffect(() => {
    if (year && month) {
      setSearchYear(year);
      setSearchMonth(month);
    }
  }, [year, month]);

  const dayItems = useMemo(() => {
    const result: DateOption[][] = [];
    const searchTarget = dayjs({
      year: searchYear,
      month: searchMonth - 1,
      hour: value.hour(),
      minute: value.minute(),
    });

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
          enable:
            (!max || !(max && currentDate.isAfter(max, "day"))) &&
            (!min || !(min && currentDate.isBefore(min, "day"))),
          isOutOfMon:
            currentDate.year() !== searchYear ||
            currentDate.month() + 1 !== searchMonth,
        });
        currentDate = currentDate.add(1, "day");
      }
      result.push(weekData);
    }
    return result;
  }, [searchYear, searchMonth, max, min, value]);

  const onDateClick = ({ date, enable, isOutOfMon }: DateOption) => {
    if (!enable) {
      return;
    }

    if (isOutOfMon) {
      if (
        date.year() > searchYear ||
        (date.year() === searchYear && date.month() + 1 > searchMonth)
      ) {
        onMonthChange?.("next");
      } else if (
        date.year() < searchYear ||
        (date.year() === searchYear && date.month() + 1 < searchMonth)
      ) {
        onMonthChange?.("previous");
      }
      setSearchYear(date.year());
      setSearchMonth(date.month() + 1);
      return;
    }

    if (min && date.isBefore(min)) {
      onChange?.(min);
    } else if (max && date.isAfter(max)) {
      onChange?.(max);
    } else {
      onChange?.(date);
    }
  };

  return (
    <>
      <table className="w-full">
        <thead>
          <tr className="flex py-2">
            {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => (
              <th key={day} className="flex-1 text-center">
                <div className="flex h-8 w-8  items-center justify-center">
                  <Footnote className="text-secondary">{day}</Footnote>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dayItems.map((week, index) => {
            return (
              <tr
                key={`${searchYear}-${searchMonth}-week-${index + 1}`}
                className="flex py-2"
              >
                {week.map((item) => (
                  <td
                    key={`${item.date.year()}-${item.date.month() + 1}-${item.date.date()}`}
                    className={clsx(
                      "flex-1 text-center",
                      item.enable && "cursor-pointer",
                      (!item.enable || item.isOutOfMon) && "text-caption"
                    )}
                    onClick={() => onDateClick(item)}
                  >
                    <div
                      className={clsx(
                        "flex h-8 w-8 items-center justify-center",
                        item.enable &&
                          value &&
                          value.year() === searchYear &&
                          value.month() + 1 === searchMonth &&
                          value.isSame(item.date, "day") &&
                          "rounded-[50%] bg-soda-80",
                        item.enable &&
                          !item.isOutOfMon &&
                          "hover:rounded-[50%] hover:bg-soda-40"
                      )}
                    >
                      <SubHeadline>{item.date.date()}</SubHeadline>
                    </div>
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className={clsx("flex h-8 items-end justify-between")}>
        <SubHeadline bold>Time</SubHeadline>
        <div className="flex items-center gap-2">
          <TimeSelect
            type="hour"
            value={value}
            onChange={onChange}
            max={max}
            min={min}
          />
          <Text>:</Text>
          <TimeSelect
            type="minute"
            value={value}
            onChange={onChange}
            max={max}
            min={min}
          />
        </div>
      </div>
    </>
  );
};

export default DateTimePickerDateView;
