import React, { ReactNode } from "react";
import { ClassValue, clsx } from "clsx";
import Text from "../Text/Text";

export interface SelectOption<T> {
  label: string;
  value: T;
}

export interface DropdownProps<T> {
  searchValue?: string;
  label?: string | ReactNode;
  onChange?: (value: SelectOption<T>) => void;
  options: SelectOption<T>[];
  className?: ClassValue;
  allowCreate?: boolean;
  onCreateClick?: (value: string) => void;
}

const Dropdown = <T,>({
  searchValue,
  label,
  onChange,
  options,
  className,
  allowCreate,
  onCreateClick,
}: DropdownProps<T>) => {
  const itemPadding = "py-1 px-3";
  const liBaseClass = clsx(
    itemPadding,
    "cursor-pointer text-neutral-primary",
    "hover:bg-primary-40 hover:rounded"
  );

  const compareWithAutoComplete = (
    input: string | undefined,
    optionList: SelectOption<T>[]
  ) => {
    return !optionList.some((option) => {
      return option.label.toLowerCase() === input?.toLocaleLowerCase();
    });
  };

  const showCreate =
    allowCreate && compareWithAutoComplete(searchValue, options) && searchValue;

  const filterOptions = searchValue
    ? options.filter((x) =>
        x.label.toLowerCase().startsWith(searchValue.toLowerCase())
      )
    : options;

  return (
    <ul
      className={clsx(
        "absolute w-full p-1",
        "flex flex-col",
        "rounded border shadow-md",
        "text-pretty bg-white",
        className
      )}
    >
      {label &&
        (typeof label === "string" ? (
          <Text className={clsx(itemPadding, "text-neutral-secondary")}>
            {label}
          </Text>
        ) : (
          label
        ))}
      {filterOptions.map((option, index) => (
        <li key={`${index}-${option.value}`} className={liBaseClass}>
          <button
            className="flex w-full justify-start"
            onClick={() => {
              onChange?.(option);
            }}
          >
            <Text>{option.label}</Text>
          </button>
        </li>
      ))}
      {showCreate && (
        <li
          className={clsx(liBaseClass)}
          onClick={() => onCreateClick?.(searchValue)}
        >
          <button className="flex w-full items-center gap-2">
            <Text className="text-[#747478]">Create</Text>
            <Text className="text-[#090000]">{searchValue}</Text>
          </button>
        </li>
      )}
    </ul>
  );
};

export default Dropdown;
