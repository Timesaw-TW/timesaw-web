"use client";

import { clsx } from "clsx";
import Text from "../../Text/Text";
import { DropdownProps, SelectOption } from "./type";
import { useEffect, useRef } from "react";

const Dropdown = <T,>({
  searchValue,
  label,
  onChange,
  options,
  className,
  allowCreate,
  onCreateClick,
  selected,
}: DropdownProps<T>) => {
  const itemPadding = "py-1 px-3";
  const selectedClass = "bg-primary-40 rounded";
  const liBaseClass = clsx(
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

  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    if (selected?.length) {
      const lastSelectedItem = selected[selected.length - 1];
      const index = filterOptions.map((x) => x.value).indexOf(lastSelectedItem);

      if (index !== -1 && itemRefs.current[index]) {
        itemRefs.current[index]?.scrollIntoView({
          behavior: "instant",
          block: "center",
        });
      }
    }
  }, [selected, filterOptions]);

  return (
    <ul
      className={clsx(
        "z-10",
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
        <li
          ref={(el) => (itemRefs.current[index] = el)}
          key={`${index}-${option.value}`}
          className={clsx(
            liBaseClass,
            selected?.some((x) => x === option.value) && selectedClass
          )}
        >
          <button
            type="button"
            className={clsx("flex w-full justify-start", itemPadding)}
            onClick={() => {
              onChange?.(option);
            }}
          >
            <Text>{option.label}</Text>
          </button>
        </li>
      ))}
      {showCreate && (
        <li className={clsx(liBaseClass)}>
          <button
            onClick={() => onCreateClick?.(searchValue)}
            className={clsx("flex w-full items-center gap-2", itemPadding)}
          >
            <Text className="text-[#747478]">Create</Text>
            <Text className="text-[#090000]">{searchValue}</Text>
          </button>
        </li>
      )}
    </ul>
  );
};

export default Dropdown;
