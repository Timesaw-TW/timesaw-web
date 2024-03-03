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
      className={clsx("flex gap-3 cursor-pointer w-16", className)}
    >
      <input
        type="checkbox"
        id={id}
        checked={checked}
        className={clsx(
          "peer",
          "appearance-none relative cursor-pointer",
          "w-4 h-4 mt-1 shrink-0",
          "border-2 border-neutral-secondary rounded bg-transparent",
          "checked:bg-neutral-secondary checked:border-0",
          withFocus &&
            "focus:outline-none focus:ring-offset-1 focus:ring-1 focus:ring-neutral-secondary"
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
            "w-4 h-4 mt-1",
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
