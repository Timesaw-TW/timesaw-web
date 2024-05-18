import { forwardRef } from "react";
import clsx from "clsx";
import Text from "../../Typography/Text";
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
            "absolute mt-1 h-4 w-4 text-white",
            "hidden peer-checked:block",
            "pointer-events-none"
          )}
          viewBox="0 0 16 16"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
            clipRule="evenodd"
          />
        </svg>
      )}
      {typeof children === "string" ? <Text>{children}</Text> : children}
    </label>
  );
});

export default Checkbox;
