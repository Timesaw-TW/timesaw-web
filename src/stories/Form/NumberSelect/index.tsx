"use client";

import { ChangeEvent, RefObject, forwardRef, useRef, useState } from "react";
import { NumberSelectProps } from "./type";
import clsx from "clsx";
import Dropdown from "../Dropdown";
import { SelectOption } from "../Dropdown/type";
import useOnFocusOutside from "@/hooks/useOnFocusOutside";
import "./index.css";

const NumberSelect = forwardRef<HTMLDivElement, NumberSelectProps>(
  function Container(
    {
      min = 1,
      max = 31,
      onFocus,
      onBlur,
      onChange,
      className,
      dropdown,
      ...props
    },
    ref
  ) {
    const containerRef = useRef<HTMLInputElement>(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    if (min > max) {
      throw new Error("maximum should be bigger than minimum");
    }

    const options: SelectOption<number>[] = Array.from(
      { length: max - min + 1 },
      (_, index) => min + index
    ).map((value) => ({ label: `${value}`, value }));

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (
        !e.target.value ||
        (Number(e.target.value) >= min && Number(e.target.value) <= max)
      ) {
        onChange?.(e);
      }
    };

    const triggerInputChange = (value: number) => {
      handleInputChange({
        target: { id: props.id, name: props.name, value: value.toString() },
      } as ChangeEvent<HTMLInputElement>);
    };

    const handleDropdownOpen = (open?: boolean) => {
      setDropdownOpen(open ?? !dropdownOpen);
    };

    const handleDropdownClick = (option: SelectOption<number>) => {
      triggerInputChange(option.value);
      handleDropdownOpen(false);
    };

    useOnFocusOutside(
      (ref as RefObject<HTMLDivElement>) ?? containerRef,
      () => {
        handleDropdownOpen(false);
      }
    );

    return (
      <div ref={ref ?? containerRef} className={clsx("relative", className)}>
        <input
          type="number"
          className={clsx(
            "px-2 py-1",
            "w-full  bg-transparent",
            "rounded border border-caption"
          )}
          onFocus={(e) => {
            handleDropdownOpen(true);
            onFocus?.(e);
          }}
          onChange={handleInputChange}
          min={min}
          max={max}
          {...props}
        />
        {dropdownOpen && (
          <Dropdown
            className={clsx("max-h-52 overflow-y-auto", dropdown?.className)}
            options={options}
            onChange={handleDropdownClick}
            selected={props.value ? [props.value as number] : []}
          />
        )}
      </div>
    );
  }
);

export default NumberSelect;
