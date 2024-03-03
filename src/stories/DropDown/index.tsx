import React, { FC, useState } from "react";
import { clsx } from "clsx";
import { IconChevronDown } from "../Icons";
export interface SelectOption<T> {
  label: string;
  value?: T;
}

interface DropDownProps<T> {
  options: SelectOption<T>[];
  value?: SelectOption<T>;
  label: string;
  isOpen?: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  onChange: (value: SelectOption<T>) => void;
}

export const DropDown: FC<DropDownProps<any>> = ({
  value,
  label,
  onChange,
  isOpen: externalIsOpen,
  setIsOpen: externalSetIsOpen,
  options,
}: DropDownProps<any>) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const setIsOpen =
    externalSetIsOpen !== undefined ? externalSetIsOpen : setInternalIsOpen;

  const handleOptionSelect = (option: SelectOption<any>) => {
    if (value?.value !== option.value) onChange(option);
    setIsOpen(!isOpen);
  };
  const isOptionSelected = (option: SelectOption<any>) => {
    return option.value === value?.value;
  };

  return (
    <button
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
        <IconChevronDown />
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
              handleOptionSelect(option);
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
    </button>
  );
};
