"use client";

import { FC, useState } from "react";
import { ClassValue } from "clsx";
import { Dayjs } from "dayjs";
import DateTimePickerMenu from "./menu";
import DateTimePickerDateView from "./date-view";
import DateTimePickerMonthView from "./month-view";
import { DateTimePickerMode } from "./type";
import DateTimePickerYearView from "./year-view";
import { merge } from "@/libs/tailwind";

interface DateTimePickerModalProps {
  value: Dayjs;
  onChange?: (value: Dayjs) => void;
  min?: Dayjs;
  max?: Dayjs;
  className?: ClassValue;
}

const DateTimePickerModal: FC<DateTimePickerModalProps> = ({
  min,
  max,
  value,
  onChange,
  className,
}) => {
  const [mode, setMode] = useState<DateTimePickerMode>("date");
  const [searchYear, setSearchYear] = useState<number>(value.year());
  const [searchMonth, setSearchMonth] = useState<number>(value.month() + 1);

  const onMenuChange = ({
    mode,
    type,
  }: {
    mode: DateTimePickerMode;
    type: "next" | "previous";
  }) => {
    if (mode === "date") {
      onMonthChange(type);
    } else if (mode === "month") {
      onYearChange(type);
    } else if (mode === "year") {
      onYearRangeChange(type);
    }
  };

  const onMonthChange = (type: "next" | "previous") => {
    let newMonth = searchMonth;
    let newYear = searchYear;

    switch (type) {
      case "next":
        if (searchMonth === 12) {
          newYear++;
          newMonth = 1;
        } else {
          newMonth++;
        }
        break;
      case "previous":
        if (searchMonth === 1) {
          newYear--;
          newMonth = 12;
        } else {
          newMonth--;
        }
        break;
      default:
        break;
    }

    setSearchYear(newYear);
    setSearchMonth(newMonth);
  };

  const onYearChange = (type: "next" | "previous") => {
    setSearchYear((year) => {
      return year + (type === "next" ? 1 : -1);
    });
  };

  const onYearRangeChange = (type: "next" | "previous") => {
    setSearchYear((year) => {
      return year + (type === "next" ? 10 : -10);
    });
  };

  return (
    <div
      className={merge(
        "p-4",
        "rounded-lg bg-white text-primary shadow",
        className
      )}
    >
      <DateTimePickerMenu
        mode={mode}
        year={searchYear}
        month={searchMonth}
        onModeChange={setMode}
        onChange={onMenuChange}
        max={max}
        min={min}
      />
      {mode === "date" && (
        <DateTimePickerDateView
          value={value}
          year={searchYear}
          month={searchMonth}
          onChange={onChange}
          onMonthChange={onMonthChange}
          max={max}
          min={min}
        />
      )}
      {mode === "month" && (
        <DateTimePickerMonthView
          value={value}
          year={searchYear}
          onChange={(year: number, month: number) => {
            setSearchYear(year);
            setSearchMonth(month);
            setMode("date");
          }}
          max={max}
          min={min}
        />
      )}
      {mode === "year" && (
        <DateTimePickerYearView
          value={value}
          year={searchYear}
          onChange={(year: number) => {
            const startYear = Math.floor(searchYear / 10) * 10 + 1;
            if (!(year < startYear || year >= startYear + 10)) {
              setMode("month");
            }
            setSearchYear(year);
          }}
          max={max}
          min={min}
        />
      )}
    </div>
  );
};

export default DateTimePickerModal;
