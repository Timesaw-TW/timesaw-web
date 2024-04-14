import { forwardRef } from "react";
import clsx from "clsx";
import Text from "../../Text/Text";
import { CheckboxProps } from "./type";

const Checkbox = forwardRef<HTMLLabelElement, CheckboxProps>(function Container(
  { id, withIcon = false, withFocus = false, children, className, ...props },
  ref
) {
  return (
    <label
      htmlFor={id}
      ref={ref}
      className={clsx("flex w-16 cursor-pointer gap-3", className)}
    >
      <input
        id={id}
        type="checkbox"
        className={clsx(
          "peer",
          "relative cursor-pointer appearance-none",
          "mt-1 h-4 w-4 shrink-0",
          "rounded border-2 border-secondary bg-transparent",
          "checked:border-0 checked:bg-secondary",
          withFocus &&
            "focus:outline-none focus:ring-1 focus:ring-secondary focus:ring-offset-1"
          // "disabled:border-steel-400 disabled:bg-steel-400"
        )}
        {...props}
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
});

export default Checkbox;
