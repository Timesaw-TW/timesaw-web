"use client";

import { DropdownProps, SelectOption } from "./type";
import { useEffect, useRef } from "react";
import Footnote from "@/stories/Typography/Footnote";
import SubHeadline from "@/stories/Typography/SubHeadline";
import { merge } from "@/libs/tailwind";

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
  const selectedClass = "bg-soda-40 rounded";
  const liBaseClass = merge(
    "cursor-pointer text-primary",
    "hover:bg-soda-40 hover:rounded"
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
      className={merge(
        "absolute z-10 w-[300px] p-1",
        "flex flex-col",
        "rounded border shadow-md",
        "text-pretty bg-white",
        className
      )}
    >
      {label &&
        (typeof label === "string" ? (
          <Footnote className={merge(itemPadding, "text-secondary")}>
            {label}
          </Footnote>
        ) : (
          label
        ))}
      {filterOptions.map((option, index) => (
        <li
          ref={(el) => (itemRefs.current[index] = el)}
          key={`${index}-${option.value}`}
          className={merge(
            liBaseClass,
            selected?.some((x) => x === option.value) && selectedClass
          )}
        >
          <button
            type="button"
            className={merge("flex w-full justify-start", itemPadding)}
            onClick={() => {
              onChange?.(option);
            }}
          >
            <SubHeadline>{option.label}</SubHeadline>
          </button>
        </li>
      ))}
      {showCreate && (
        <li className={merge(liBaseClass)}>
          <button
            onClick={() => onCreateClick?.(searchValue)}
            className={merge("flex w-full items-center gap-2", itemPadding)}
          >
            <SubHeadline className="text-[#747478]">Create</SubHeadline>
            <SubHeadline className="text-[#090000]">{searchValue}</SubHeadline>
          </button>
        </li>
      )}
    </ul>
  );
};

export default Dropdown;
