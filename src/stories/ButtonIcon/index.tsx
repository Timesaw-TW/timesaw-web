import clsx from "clsx";
import { FC, ReactNode, ButtonHTMLAttributes } from "react";
import Text from "../Typography/Text";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  label?: string | ReactNode;
};

const ButtonIcon: FC<Props> = ({ children, className, label, ...props }) => {
  return (
    <button
      className={clsx(
        " px-6 py-3",
        "flex flex-col items-center justify-center gap-1",
        " rounded-md",
        "bg-soda-20",
        className
      )}
      {...props}
    >
      {children}
      {label && (typeof label === "string" ? <Text>{label}</Text> : label)}
    </button>
  );
};

export default ButtonIcon;
