import clsx from "clsx";
import { FC, ReactNode, ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  label?: string;
};

const ButtonIcon: FC<Props> = ({ children, className, label, ...props }) => {
  return (
    <button
      className={clsx(
        " px-6 py-3",
        "flex flex-col justify-center items-center gap-1",
        " rounded-md shadow",
        "bg-primary-40",
        className
      )}
      {...props}
    >
      {children}
      {label && <span>{label}</span>}
    </button>
  );
};

export default ButtonIcon;
