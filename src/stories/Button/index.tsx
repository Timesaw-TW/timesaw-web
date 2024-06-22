import { ButtonHTMLAttributes, FC, ReactNode } from "react";
import { merge } from "@/libs/tailwind";
import SubHeadline from "../Typography/SubHeadline";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  children: string | ReactNode;
  className?: string;
}

const Button: FC<ButtonProps> = ({
  children,
  className,
  disabled,
  ...props
}) => {
  return (
    <button
      type="button"
      className={merge(
        "w-full gap-2 rounded-lg p-3",
        "flex items-center justify-center",
        "text-primary dark:text-white",
        "bg-soda-80",
        disabled && "text-secondary opacity-[38%]",
        className
      )}
      {...props}
    >
      {typeof children === "string" ? (
        <SubHeadline>{children}</SubHeadline>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
