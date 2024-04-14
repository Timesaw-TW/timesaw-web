import { ButtonHTMLAttributes, FC, ReactNode } from "react";
import { clsx } from "clsx";
import Text from "../Text/Text";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  children: string | ReactNode;
  className?: string;
}

export const Button: FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      type="button"
      className={clsx(
        "h-8 w-24 rounded-md",
        "flex items-center justify-center",
        "text-neutral-primary dark:text-neutral-white",
        "bg-soda-100",
        className
      )}
      {...props}
    >
      {typeof children === "string" ? <Text>{children}</Text> : children}
    </button>
  );
};
