import {
  ChangeEvent,
  RefObject,
  forwardRef,
  useRef,
  useState,
  MouseEvent,
  FocusEvent,
  useEffect,
} from "react";
import { IconChevronDown, IconXMark } from "../../Icons";
import Dropdown from "../Dropdown";
import { SelectOption } from "../Dropdown/type";
import useOnFocusOutside from "@/hooks/useOnFocusOutside";
import ErrorMessage from "../ErrorMessage";
import { TextFieldProps } from "./type";
import { merge } from "@/libs/tailwind";

const TextField = forwardRef<HTMLDivElement, TextFieldProps>(function Container(
  { showButton, button, showDropdown, dropdown, ...props },
  ref
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [value, setValue] = useState<string>(props.value as string);
  const {
    className,
    onFocus,
    onBlur,
    value: inputValue,
    onChange,
    errorMessage,
    ...inputProps
  } = props;
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

  const isClearIcon = !btnOnClick && allowClear && value;
  const isDropdownIcon = !isClearIcon && showDropdown;
  const isRenderDropdown = showDropdown && dropdownOpen && dropdown;

  useEffect(() => {
    setValue(inputValue as string);
  }, [inputValue]);

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
    handleInputChange({
      target: { value, id: props.id, name: props.name },
    } as ChangeEvent<HTMLInputElement>);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onChange?.(e);
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
      className={merge("relative w-[300px]", className)}
    >
      <div
        className={merge(
          "relative flex items-stretch",
          "border-b border-caption caret-[#446BF2]"
        )}
      >
        <input
          ref={inputRef}
          type="text"
          className={merge(
            "flex-1 pb-2 pl-2 pt-3",
            showButton ? "pr-9" : "pr-2",
            "bg-transparent placeholder-caption",
            "border-none outline-none focus:ring-0"
          )}
          onFocus={handleInputFocus}
          onChange={handleInputChange}
          value={value}
          {...inputProps}
        />
        {showButton && (
          <button
            className={merge("absolute right-3 h-full", btnClassName)}
            onClick={handleIconClick}
            {...btnProps}
          >
            {element ??
              (isClearIcon ? (
                <IconXMark className="h-6 w-6" />
              ) : (
                isDropdownIcon && <IconChevronDown className="h-6 w-6" />
              ))}
          </button>
        )}
      </div>
      {isRenderDropdown && (
        <Dropdown
          searchValue={searchValue ?? value}
          onChange={handleDropdownChange}
          options={options ?? []}
          onCreateClick={handleDropdownCreate}
          {...dropdownProps}
        />
      )}
      <ErrorMessage {...errorMessage} />
    </div>
  );
});

export default TextField;
