"use client";

import { FC, useState } from "react";
import clsx, { ClassValue } from "clsx";
import { Dayjs } from "dayjs";
import DateTimePickerMenu from "./menu";
import DateTimePickerDateView from "./date-view";
import DateTimePickerMonthView from "./month-view";
import { DateTimePickerMode } from "./type";
import DateTimePickerYearView from "./year-view";

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
      return;
    } else if (mode === "month") {
      onYearChange(type);
      return;
    } else if (mode === "year") {
      onYearRangeChange(type);
    }
  };

  const onMonthChange = (type: "next" | "previous") => {
    if (type === "next") {
      if (searchMonth === 12) {
        setSearchYear((year) => year + 1);
        setSearchMonth(1);
      } else {
        setSearchMonth((month) => month + 1);
      }
    } else {
      if (searchMonth === 1) {
        setSearchYear((year) => year - 1);
        setSearchMonth(12);
      } else {
        setSearchMonth((month) => month - 1);
      }
    }
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
      className={clsx(
        "p-4",
        "rounded-lg bg-white text-neutral-primary shadow",
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
