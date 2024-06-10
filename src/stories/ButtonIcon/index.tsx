import { FC, ReactNode, ButtonHTMLAttributes } from "react";
import { merge } from "@/libs/tailwind";
import SubHeadline from "../Typography/SubHeadline";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  label?: string | ReactNode;
};

const ButtonIcon: FC<Props> = ({ children, className, label, ...props }) => {
  return (
    <button
      className={merge(
        "w-full p-3",
        "flex flex-col items-center justify-center",
        "gap-2 rounded-lg",
        "bg-soda-20",
        className
      )}
      {...props}
    >
      {children}
      {label &&
        (typeof label === "string" ? (
          <SubHeadline>{label}</SubHeadline>
        ) : (
          label
        ))}
    </button>
  );
};

export default ButtonIcon;
