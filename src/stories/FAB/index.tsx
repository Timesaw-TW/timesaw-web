"use client";

import {
  ButtonHTMLAttributes,
  FC,
  ReactElement,
  ReactNode,
  SVGProps,
} from "react";
import clsx from "clsx";
import { IconPlusSolid } from "../Icons";
import SubHeadline from "../Typography/SubHeadline";

export interface FABProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  showIcon?: boolean;
  icon?: ({ ...props }: SVGProps<SVGSVGElement>) => ReactElement;
  showLabel?: boolean;
  label?: string;
  children?: ReactNode;
  onClick?: () => void;
}

const FAB: FC<FABProps> = ({
  className,
  showIcon = true,
  icon = IconPlusSolid,
  showLabel = false,
  label = "Continue",
  children,
  type,
  ...props
}) => {
  const Icon = icon;

  return (
    <button
      type={type || "button"}
      className={clsx(
        "h-full w-full rounded-[50%] bg-soda-100",
        "border-[0.5px] border-[#0900000A] shadow-fab",
        "flex items-center justify-center",
        className
      )}
      {...props}
    >
      {children}

      {!children && (
        <div className="flex gap-2">
          {showIcon && <Icon className="h-6 w-6" />}
          {showLabel && <SubHeadline>{label}</SubHeadline>}
        </div>
      )}
    </button>
  );
};

export default FAB;
