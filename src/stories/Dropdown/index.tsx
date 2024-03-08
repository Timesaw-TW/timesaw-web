import React, { ReactNode } from "react";
import { ClassValue, clsx } from "clsx";
import Text from "../Text/Text";

export interface SelectOption<T> {
  label: string;
  value: T;
}

export interface DropdownProps<T> {
  label?: string | ReactNode;
  onChange?: (value: SelectOption<T>) => void;
  options: SelectOption<T>[];
  className?: ClassValue;
  allowCreate?: boolean;
  createdValue?: string;
  onCreateClick?: (value: string) => void;
}

const Dropdown = <T,>({
  label = "Select an option",
  onChange,
  options,
  className,
  allowCreate,
  createdValue,
  onCreateClick,
}: DropdownProps<T>) => {
  const liBaseClass = clsx(
    "px-4 py-2",
    "cursor-pointer text-neutral-primary",
    "hover:bg-neutral-divider"
  );

  return (
    <ul
      className={clsx(
        "absolute w-full",
        "flex flex-col",
        "border rounded shadow-md",
        "bg-white",
        className
      )}
    >
      {typeof label === "string" ? (
        <Text className={clsx("px-4 py-2", "text-neutral-secondary")}>
          {label}
        </Text>
      ) : (
        label
      )}
      {options.map((option, index) => (
        <li
          key={`${index}-${option.value}`}
          onClick={() => {
            onChange?.(option);
          }}
          className={liBaseClass}
        >
          <Text>{option.label}</Text>
        </li>
      ))}
      {allowCreate &&
        !options.some((option) => option.label === createdValue) &&
        createdValue && (
          <li
            className={clsx(liBaseClass, "flex items-center gap-2")}
            onClick={() => onCreateClick?.(createdValue)}
          >
            <Text className="text-[#747478]">Create</Text>
            <Text className="text-[#090000]">{createdValue}</Text>
          </li>
        )}
    </ul>
  );
};

export default Dropdown;
