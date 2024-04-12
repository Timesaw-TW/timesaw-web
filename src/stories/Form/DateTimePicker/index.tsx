"use client";

import {
  RefObject,
  forwardRef,
  useRef,
  useState,
  useEffect,
  ChangeEvent,
} from "react";
import clsx from "clsx";
import dayjs, { Dayjs } from "dayjs";
import { IconCalendarOutline } from "@/stories/Icons/IconCalendarOutline";
import { DateTimePickerProps } from "./type";
import Text from "@/stories/Text/Text";
import useOnFocusOutside from "@/hooks/useOnFocusOutside";
import DateTimePickerModal from "./modal";

const resetSecond = (time: Dayjs) => {
  return time.set("second", 0).set("millisecond", 0);
};

const DateTimePicker = forwardRef<HTMLDivElement, DateTimePickerProps>(
  function Container(
    {
      id,
      name,
      value,
      onChange,
      placeholder = "Please select a date",
      className,
      max,
      min,
    },
    ref
  ) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [opened, setOpened] = useState<boolean>(false);
    const [datetime, setDatetime] = useState<Dayjs>(
      resetSecond(value ? dayjs(value) : dayjs())
    );

    useEffect(() => {
      if (value) {
        setDatetime(dayjs(value));
      }
    }, [value]);

    useOnFocusOutside(
      (ref as RefObject<HTMLDivElement>) || containerRef,
      () => {
        setOpened(false);
      }
    );

    const handleChange = (date: Dayjs) => {
      setDatetime(date);

      if (onChange) {
        onChange({
          target: {
            name,
            id,
            value: date.toISOString(),
          },
        } as ChangeEvent<HTMLInputElement>);
      }
    };

    return (
      <div className={clsx("relative", className)} ref={ref || containerRef}>
        <div
          onClick={() => {
            if (!value && onChange) {
              onChange({
                target: {
                  name,
                  id,
                  value: resetSecond(dayjs()).toISOString(),
                },
              } as ChangeEvent<HTMLInputElement>);
            }
            setOpened(!opened);
          }}
          className={clsx(
            "relative cursor-pointer",
            "flex items-center px-4 py-3",
            "border-b-[0.5px] border-[#C6C6C8]"
          )}
        >
          {!value ? (
            <Text className="text-[#3C3C4399]/60">{placeholder}</Text>
          ) : (
            <Text>{datetime.format("MMM DD, YYYY HH:mm")}</Text>
          )}
          <IconCalendarOutline className={clsx("absolute right-3 h-6 w-6")} />
        </div>
        {opened && (
          <div className="absolute">
            <DateTimePickerModal
              value={datetime}
              onChange={handleChange}
              max={max}
              min={min}
              className="mt-1 w-[328px]"
            />
          </div>
        )}
      </div>
    );
  }
);

export default DateTimePicker;
