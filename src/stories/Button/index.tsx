import React, { ButtonHTMLAttributes, FC, ReactNode } from "react";
import { clsx } from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Theme
   */
  theme?: "primary" | "secondary";
  /**
   * Theme level
   * */
  level?: 100 | 80 | 60 | 40 | 20;
  /**
   * Optional click handler
   */
  onClick?: () => void;
  /**
   * Content
   * */
  children: ReactNode;
  /**
   * Customize style
   */
  className?: string;
}

export const Button: FC<ButtonProps> = ({
  theme = "primary",
  level = 100,
  children,
  className,
  ...props
}) => {
  return (
    <button
      type="button"
      className={clsx(
        "w-24 h-8 rounded-md",
        "flex justify-center items-center",
        `text-neutral-primary bg-${theme}-${level}`,
        "dark:text-neutral-white",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
