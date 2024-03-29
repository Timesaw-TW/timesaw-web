"use client";

import { FC, useRef, useState } from "react";
import { useHoverDirty } from "react-use";
import clsx, { ClassValue } from "clsx";

export type Color = {
  code: string;
  selected: string;
};

export const DEFAULT_COLORS: Color[] = [
  { code: "#C5E7EE", selected: "#C5E7EE" },
  { code: "#FFD7D2", selected: "#FFD7D2" },
  { code: "#FFF1C1", selected: "#FFF1C1" },
  { code: "#EEEE9E", selected: "#EEEE9E" },
  { code: "#E4D4F4", selected: "#E4D4F4" },
  { code: "#C9E3F3", selected: "#C9E3F3" },
  { code: "#FCA8A6", selected: "#FCA8A6" },
  { code: "#FFE885", selected: "#FFE885" },
  { code: "#D7E6BF", selected: "#D7E6BF" },
  { code: "#A9BCFF", selected: "#A9BCFF" },
  { code: "#AFD8F9", selected: "#AFD8F9" },
  { code: "#FF987F", selected: "#FF987F" },
  { code: "#FFD884", selected: "#FFD884" },
  { code: "#C4E696", selected: "#C4E696" },
  { code: "#7A9FD8", selected: "#7A9FD8" },
  { code: "#7CB7C7", selected: "#7CB7C7" },
  { code: "#FB923F", selected: "#FB923F" },
  { code: "#DFB666", selected: "#DFB666" },
  { code: "#A7C122", selected: "#A7C122" },
  { code: "#888FC6", selected: "#888FC6" },
  { code: "#3286A0", selected: "#3286A0" },
  { code: "#E27B43", selected: "#E27B43" },
  { code: "#B3863C", selected: "#B3863C" },
  { code: "#B2A745", selected: "#B2A745" },
  { code: "#9780B4", selected: "#9780B4" },
];

interface Props {
  columns?: number;
  colors?: Color[];
  className?: ClassValue;
  selected: string[];
  onClick?: (colorList: string[]) => void;
  allowMultiple?: boolean;
  backgroundColorClass?: ClassValue;
}

const ColorItem = ({
  color,
  isSelected,
  onClick,
  backgroundColorClass,
}: {
  color: Color;
  isSelected: boolean;
  onClick?: () => void;
  backgroundColorClass?: ClassValue;
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const isHovering = useHoverDirty(ref);

  return (
    <button
      ref={ref}
      className={clsx(
        "flex items-center justify-center",
        "h-[32px] w-[32px] rounded-[50%]",
        "transition-all duration-300"
      )}
      style={{
        backgroundColor: isSelected || isHovering ? color.code : "transparent",
      }}
      onClick={onClick}
    >
      <div
        className={clsx(
          "flex items-center justify-center",
          "h-[28px] w-[28px] rounded-[50%]",
          "transition-all duration-300",
          (isSelected || isHovering) &&
            (backgroundColorClass || "bg-white dark:bg-black")
        )}
      >
        <div
          className={clsx(
            "h-[23px] w-[23px] rounded-[50%]",
            "transition-all duration-300"
          )}
          style={{ backgroundColor: color.code }}
        ></div>
      </div>
    </button>
  );
};

const ColorPicker: FC<Props> = ({
  selected,
  columns = 5,
  onClick,
  allowMultiple = false,
  colors = DEFAULT_COLORS,
  className,
  backgroundColorClass,
}) => {
  const [selectedList, setSelectedList] = useState<string[]>(selected);

  return (
    <ul
      className={clsx(
        "w-[320px] p-5",
        "rounded-lg border border-solid border-neutral-divider shadow-md",
        "grid gap-y-2",
        "justify-items-center",
        className,
        backgroundColorClass
      )}
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
    >
      {colors.map((color) => {
        const isSelected = selectedList.includes(color.code);
        return (
          <li
            key={color.code}
            className="flex h-[32px] items-center justify-center"
          >
            <ColorItem
              color={color}
              isSelected={isSelected}
              backgroundColorClass={backgroundColorClass}
              onClick={() => {
                let newList = [...selectedList];
                if (isSelected) {
                  if (allowMultiple) {
                    const index = selectedList.indexOf(color.code);
                    delete newList[index];
                  }
                } else {
                  if (allowMultiple) {
                    newList.push(color.code);
                  } else {
                    newList = [color.code];
                  }
                }

                setSelectedList(newList);
                if (onClick) {
                  onClick(newList);
                }
              }}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default ColorPicker;
