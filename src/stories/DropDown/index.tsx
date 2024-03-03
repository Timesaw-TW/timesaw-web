import React, { FC, useState, useEffect } from "react";
import { clsx } from "clsx";

export interface SelectOption {
  label: string;
  value?: string | number;
  //TODO:改城犯行
}

interface DropDownProps {
  options: SelectOption[];
  value?: SelectOption;
  label: string;
  onChange: (value: SelectOption) => void;
}

export const DropDown: FC<DropDownProps> = ({
  value,
  label,
  onChange,
  options,
}: DropDownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectOption = (option: SelectOption) => {
    if (value?.value !== option.value) onChange(option);
    setIsOpen(!isOpen);
  };
  const isOptionSelected = (option: SelectOption) => {
    return option.value === value?.value;
  };

  return (
    <div
      tabIndex={0}
      className={clsx(
        "relative w-80 min-h-8 bg-gray-300",
        " flex items-center gap-2 p-2 rounded",
        "outline-none text-gray-600 "
      )}
      onClick={() => setIsOpen((open) => !open)}
      onBlur={() => setIsOpen(false)}
    >
      <span className={clsx("grow text-black ")}>{value?.label || label}</span>
      <div className="flex items-center ml-auto">
        {/* TODO:一動到icons 資料夾 */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        </svg>
      </div>
      <ul
        className={clsx(
          "m-0 p-0 list-none absolute",
          "max-h-60	w-80 overflow-y-auto",
          "shadow-lg shadow-gray-600/40",
          "z-10 bg-white left-0 top-10 rounded-md",
          isOpen ? "block" : "hidden"
        )}
      >
        <span>Select an option or create one</span>
        {options.map((option, index) => (
          <li
            key={`${option.value}-${index}`}
            onClick={(e) => {
              // TODO:selectOption
              selectOption(option);
              e.stopPropagation();
            }}
            className={clsx(
              "py-1 px-2 cursor-pointer",
              isOptionSelected(option) && "bg-gray-300 text-black",
              "hover:bg-gray-300 text-black"
            )}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};
