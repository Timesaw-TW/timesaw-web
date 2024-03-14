import {
  ButtonHTMLAttributes,
  ChangeEvent,
  InputHTMLAttributes,
  ReactNode,
  RefObject,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { IconChevronDown, IconXMark } from "../Icons";
import clsx from "clsx";
import Dropdown, { DropdownProps as BaseDropdownProps } from "../Dropdown";
import useOnFocusOutside from "@/hooks/useOnFocusOutside";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  element?: ReactNode;
  allowClear?: boolean;
}

interface DropdownProps extends BaseDropdownProps<string> {
  onOpenChange?: (open: boolean) => void;
}

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
    onChange: dropdownOnChange,
    options = [],
    onOpenChange,
    createdValue,
    onCreateClick,
    ...dropdownProps
  } = dropdown || {};

  useEffect(() => {
    onOpenChange?.(dropdownOpen);
  }, [dropdownOpen, onOpenChange]);

  useOnFocusOutside((ref as RefObject<HTMLDivElement>) || containerRef, () => {
    if (showButton) {
      setDropdownOpen(false);
    }
  });

  const triggerInputChange = useCallback(
    (value: string) => {
      inputProps.onChange?.({
        target: { value },
      } as ChangeEvent<HTMLInputElement>);
    },
    [inputProps]
  );
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
          onFocus={(e) => {
            if (showDropdown) {
              setDropdownOpen(true);
            }
            onFocus?.(e);
          }}
          {...inputProps}
        />
        {showButton && (
          <button
            className={clsx("", btnClassName)}
            onClick={(e) => {
              inputRef.current?.focus();
              if (!btnOnClick) {
                if (allowClear && inputProps.value && inputProps.onChange) {
                  triggerInputChange("");
                }
              } else {
                btnOnClick(e);
              }
            }}
            {...btnProps}
          >
            {element ||
              (allowClear && inputProps.value ? (
                <IconXMark />
              ) : (
                showDropdown && <IconChevronDown />
              ))}
          </button>
        )}
      </div>
      {showDropdown && dropdownOpen && dropdown && (
        <Dropdown
          onChange={(value) => {
            triggerInputChange(value.label);
            dropdownOnChange?.(value);
            setDropdownOpen(false);
          }}
          options={options}
          createdValue={createdValue ?? (inputProps.value as string)}
          onCreateClick={(value: string) => {
            onCreateClick?.(value);
            setDropdownOpen(false);
          }}
          {...dropdownProps}
        />
      )}
    </div>
  );
});

export default TextInput;
