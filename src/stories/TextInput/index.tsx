import {
  ButtonHTMLAttributes,
  FC,
  InputHTMLAttributes,
  ReactNode,
} from "react";
import { IconChevronDown } from "../Icons";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  element?: ReactNode;
}

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  showButton?: boolean;
  button?: ButtonProps;
}

const TextInput: FC<TextInputProps> = ({ showButton, button, ...props }) => {
  const { className, ...inputProps } = props ?? {};
  const { element, className: btnClassName, ...btnProps } = button ?? {};

  return (
    <div
      className={clsx(
        "w-[300px]",
        "flex justify-between items-stretch",
        "border-b border-neutral-divider caret-[#446BF2]",
        className
      )}
    >
      <input
        type="text"
        role="textbox"
        className={clsx(
          "flex-1 p-4",
          "bg-transparent placeholder-neutral-divider ",
          "border-none focus:ring-0 outline-none"
        )}
        {...inputProps}
      />
      {showButton && (
        <button className={clsx("", btnClassName)} {...btnProps}>
          {element || <IconChevronDown />}
        </button>
      )}
    </div>
  );
};

export default TextInput;
