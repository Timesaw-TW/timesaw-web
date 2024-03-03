import clsx, { ClassValue } from "clsx";
import { FC, ReactNode } from "react";
import Text from "../Text/Text";

export interface CheckboxProps {
  id: string;
  children: string | ReactNode;
  checked: boolean;
  className?: ClassValue;
  onChange?: (check: boolean) => void;
  withIcon?: boolean;
  withFocus?: boolean;
}

const Checkbox: FC<CheckboxProps> = ({
  id,
  checked,
  onChange,
  withIcon = false,
  withFocus = false,
  children,
  className,
}) => {
  return (
    <label
      htmlFor={id}
      className={clsx("flex w-16 cursor-pointer gap-3", className)}
    >
      <input
        type="checkbox"
        id={id}
        checked={checked}
        className={clsx(
          "peer",
          "relative cursor-pointer appearance-none",
          "mt-1 h-4 w-4 shrink-0",
          "rounded border-2 border-neutral-secondary bg-transparent",
          "checked:border-0 checked:bg-neutral-secondary",
          withFocus &&
            "focus:outline-none focus:ring-1 focus:ring-neutral-secondary focus:ring-offset-1"
          // "disabled:border-steel-400 disabled:bg-steel-400"
        )}
        onChange={() => {
          if (onChange) {
            onChange(!checked);
          }
        }}
      />
      {withIcon && (
        <svg
          className={clsx(
            "absolute stroke-white outline-none",
            "mt-1 h-4 w-4",
            "hidden peer-checked:block",
            "pointer-events-none"
          )}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      )}
      {typeof children === "string" ? <Text>{children}</Text> : children}
    </label>
  );
};

export default Checkbox;
