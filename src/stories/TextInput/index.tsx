import {
  ButtonHTMLAttributes,
  ChangeEvent,
  InputHTMLAttributes,
  ReactNode,
  RefObject,
  forwardRef,
  useRef,
  useState,
  MouseEvent,
  FocusEvent,
} from "react";
import { IconChevronDown, IconXMark } from "../Icons";
import clsx from "clsx";
import Dropdown, {
  DropdownProps as BaseDropdownProps,
  SelectOption,
} from "../Dropdown";
import useOnFocusOutside from "@/hooks/useOnFocusOutside";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  element?: ReactNode;
  allowClear?: boolean;
}

interface DropdownProps extends BaseDropdownProps<string> {}

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  showButton?: boolean;
  button?: ButtonProps;
  showDropdown?: boolean;
  dropdown?: DropdownProps;
}

const TextInput = forwardRef<HTMLDivElement, TextInputProps>(function Container(
  { showButton, button, showDropdown, dropdown, ...props },
  ref
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { className, onFocus, onBlur, ...inputProps } = props;
  const {
    element,
    className: btnClassName,
    onClick: btnOnClick,
    allowClear,
    ...btnProps
  } = button || {};
  const {
    searchValue,
    onChange: dropdownOnChange,
    options,
    onCreateClick,
    ...dropdownProps
  } = dropdown || {};

  const isClearIcon = !btnOnClick && allowClear && inputProps.value;
  const isDropdownIcon = !isClearIcon && showDropdown;
  const isRenderDropdown = showDropdown && dropdownOpen && dropdown;

  const handleInputFocus = (e: FocusEvent<HTMLInputElement>) => {
    if (showDropdown) {
      setDropdownOpen(true);
    }
    onFocus?.(e);
  };

  const handleIconClick = (e: MouseEvent<HTMLButtonElement>) => {
    inputRef.current?.focus();

    if (btnOnClick) {
      btnOnClick(e);
      return;
    }

    if (isClearIcon) {
      triggerInputChange("");
    }
  };

  const triggerInputChange = (value: string) => {
    inputProps.onChange?.({
      target: { value },
    } as ChangeEvent<HTMLInputElement>);
  };

  const handleDropdownChange = (value: SelectOption<string>) => {
    triggerInputChange(value.label);
    dropdownOnChange?.(value);
    setDropdownOpen(false);
  };

  const handleDropdownCreate = (value: string) => {
    onCreateClick?.(value);
    setDropdownOpen(false);
  };

  useOnFocusOutside((ref as RefObject<HTMLDivElement>) || containerRef, () => {
    if (showButton) {
      setDropdownOpen(false);
    }
  });

  return (
    <div
      ref={ref || containerRef}
      className={clsx("relative w-[300px]", className)}
    >
      <div
        className={clsx(
          "flex items-stretch justify-between",
          "border-b border-neutral-divider caret-[#446BF2]"
        )}
      >
        <input
          ref={inputRef}
          type="text"
          className={clsx(
            "flex-1 p-2",
            "bg-transparent placeholder-neutral-divider ",
            "border-none outline-none focus:ring-0"
          )}
          onFocus={handleInputFocus}
          {...inputProps}
        />
        {showButton && (
          <button
            className={btnClassName}
            onClick={handleIconClick}
            {...btnProps}
          >
            {element ??
              (isClearIcon ? (
                <IconXMark />
              ) : (
                isDropdownIcon && <IconChevronDown />
              ))}
          </button>
        )}
      </div>
      {isRenderDropdown && (
        <Dropdown
          searchValue={searchValue ?? (inputProps.value as string)}
          onChange={handleDropdownChange}
          options={options ?? []}
          onCreateClick={handleDropdownCreate}
          {...dropdownProps}
        />
      )}
    </div>
  );
});

export default TextInput;
