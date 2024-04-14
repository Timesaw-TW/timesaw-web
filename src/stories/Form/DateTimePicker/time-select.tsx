"use client";

import { FC, useEffect, useMemo, useRef, useState } from "react";
import Text from "@/stories/Text/Text";
import { IconChevronDown } from "@/stories/Icons";
import clsx from "clsx";
import { Dayjs } from "dayjs";
import useOnFocusOutside from "@/hooks/useOnFocusOutside";

interface Props {
  value: Dayjs;
  type: "hour" | "minute";
  onChange?: (value: Dayjs) => void;
  max?: Dayjs;
  min?: Dayjs;
}

const TimeSelect: FC<Props> = ({ value, type, onChange, max, min }) => {
  const ref = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [optionOpen, setOptionOpen] = useState<boolean>(false);

  useOnFocusOutside(ref, () => {
    setOptionOpen(false);
  });

  useEffect(() => {
    if (optionOpen && listRef.current) {
      const selectedOption = listRef.current.querySelector(
        `[data-value="${value[type]()}"`
      );
      if (selectedOption) {
        selectedOption.scrollIntoView({
          block: "center",
        });
      }
    }
  }, [optionOpen, value, type]);

  const options = useMemo(() => {
    return Array.from(
      { length: type === "hour" ? 24 : 60 },
      (_, index) => 0 + index
    ).map((option) => {
      const newTime = value.set(type, option);

      let isDisable = false;

      if ((max && newTime.isAfter(max)) || (min && newTime.isBefore(min))) {
        isDisable = true;
      }

      return { value: option, isDisable };
    });
  }, [type, max, min, value]);

  const handleOptionClick = (option: number) => {
    onChange?.(value.set(type, option));
    setOptionOpen(false);
  };

  return (
    <div
      ref={ref}
      className={clsx(
        "relative",
        "rounded border border-neutral-divider px-2 py-1"
      )}
    >
      <button
        type="button"
        onClick={() => setOptionOpen(!optionOpen)}
        className={clsx(
          "cursor-pointer",
          "flex items-center justify-center gap-1"
        )}
      >
        <Text>{value[type]().toString().padStart(2, "0")}</Text>
        <div className="flex h-4 w-4 items-center justify-center">
          <IconChevronDown className="h-2 w-2 stroke-2" />
        </div>
      </button>
      {optionOpen && (
        <ul
          ref={listRef}
          className={clsx(
            "h-[240px] w-[72px] overflow-y-scroll p-1",
            "absolute bottom-9 left-0",
            "rounded border border-e-neutral-divider bg-white",
            "flex flex-col gap-[10px]"
          )}
        >
          {options.map(({ value: option, isDisable }) => {
            return (
              <li data-value={option} key={option}>
                <button
                  type="button"
                  className={clsx(
                    "h-full w-full text-left",
                    "rounded px-3 py-1",
                    isDisable ? "text-neutral-divider" : "hover:bg-soda-40",
                    !isDisable && value[type]() === option && "bg-soda-40"
                  )}
                  disabled={isDisable}
                  onClick={() => {
                    if (!isDisable) {
                      handleOptionClick(option);
                    }
                  }}
                >
                  <Text>{option.toString().padStart(2, "0")}</Text>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default TimeSelect;
