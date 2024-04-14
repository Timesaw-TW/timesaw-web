import { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from "react";
import { DropdownProps } from "../Dropdown/type";
import { ErrorMessageProps } from "../ErrorMessage/type";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  element?: ReactNode;
  allowClear?: boolean;
}

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  name: string;
  showButton?: boolean;
  button?: ButtonProps;
  showDropdown?: boolean;
  dropdown?: DropdownProps<string>;
  errorMessage?: ErrorMessageProps;
}
