"use client";

import { FC, useEffect, useState } from "react";
import clsx from "clsx";
import dayjs, { Dayjs } from "dayjs";
import { DateTimePickerMode } from "./type";
import { IconChevronLeft, IconChevronRight } from "@/stories/Icons";
import Headline from "@/stories/Typography/Headline";

interface Props {
  mode: DateTimePickerMode;
  year: number;
  month: number;
  onModeChange: (mode: DateTimePickerMode) => void;
  onChange: (data: {
    mode: DateTimePickerMode;
    type: "next" | "previous";
  }) => void;
  max?: Dayjs;
  min?: Dayjs;
}

const DateTimePickerMenu: FC<Props> = ({
  mode,
  year,
  month,
  onModeChange,
  onChange,
  max,
  min,
}) => {
  const [showPreBtn, setShowPreBtn] = useState<boolean>(true);
  const [showNextBtn, setShowNextBtn] = useState<boolean>(true);

  useEffect(() => {
    if (!min) {
      setShowPreBtn(true);
      return;
    }

    if (mode === "date") {
      setShowPreBtn(
        year > min.year() ||
          (year === min.year() && month - 1 >= min.month() + 1)
      );
    } else if (mode === "month") {
      setShowPreBtn(year - 1 >= min.year());
    } else if (mode === "year") {
      const lastEndYear = Math.floor(year / 10) * 10;
      setShowPreBtn(lastEndYear >= min.year());
    }
  }, [mode, min, year, month]);

  useEffect(() => {
    if (!max) {
      setShowNextBtn(true);
      return;
    }

    if (mode === "date") {
      setShowNextBtn(
        year < max.year() ||
          (year === max.year() && month + 1 <= max.month() + 1)
      );
    } else if (mode === "month") {
      setShowNextBtn(year + 1 <= max.year());
    } else if (mode === "year") {
      const nextStartYear = Math.floor(year / 10) * 10 + 11;
      setShowNextBtn(max.year() >= nextStartYear);
    }
  }, [mode, max, year, month]);

  const handleChangeMode = () => {
    if (mode === "date") {
      onModeChange("month");
    } else if (mode === "month") {
      onModeChange("year");
    } else {
      onModeChange("date");
    }
  };

  return (
    <div className={clsx("h-10 pb-2", "flex items-center justify-between")}>
      <button
        type="button"
        className={clsx(
          "flex h-10 w-10 items-center justify-center p-2",
          !showPreBtn && "invisible"
        )}
        onClick={() => onChange({ type: "previous", mode })}
      >
        <IconChevronLeft className="h-4 w-4 stroke-2 text-primary" />
      </button>
      <button type="button" onClick={handleChangeMode}>
        <Headline bold>
          {mode === "date" && dayjs(`${year}-${month}-01`).format("MMM YYYY")}
          {mode === "month" && year}
          {mode === "year" &&
            `${Math.floor(year / 10) * 10 + 1}-${Math.floor(year / 10) * 10 + 10}`}
        </Headline>
      </button>
      <button
        type="button"
        className={clsx(
          "flex h-10 w-10 items-center justify-center p-2",
          !showNextBtn && "invisible"
        )}
        onClick={() => onChange({ type: "next", mode })}
      >
        <IconChevronRight className="h-4 w-4 stroke-2 text-primary" />
      </button>
    </div>
  );
};

export default DateTimePickerMenu;
