import { ButtonHTMLAttributes, FC, ReactNode } from "react";
import Text from "../Typography/Text";
import { merge } from "@/libs/tailwind";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  children: string | ReactNode;
  className?: string;
}

const Button: FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      type="button"
      className={merge(
        "h-12 w-24 rounded-md",
        "flex items-center justify-center",
        "text-primary dark:text-white",
        "bg-soda-80",
        className
      )}
      {...props}
    >
      {typeof children === "string" ? <Text>{children}</Text> : children}
    </button>
  );
};

export default Button;
