"use client";

import {
  ButtonHTMLAttributes,
  FC,
  ReactElement,
  ReactNode,
  SVGProps,
} from "react";
import { IconPlusSolid } from "../Icons";
import SubHeadline from "../Typography/SubHeadline";
import { merge } from "@/libs/tailwind";

interface FABProps extends ButtonHTMLAttributes<HTMLButtonElement> {
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
  ...props
}) => {
  const Icon = icon;

  return (
    <button
      type="button"
      className={merge(
        "w-12 p-3",
        "rounded-[50%] bg-soda-100",
        "border-[0.5px] border-[#0900000A] shadow-fab",
        "flex items-center",
        showLabel ? "justify-start pl-3" : "justify-center",
        className
      )}
      {...props}
    >
      {children}

      {!children && (
        <div className="flex gap-2">
          {showIcon && <Icon />}
          {showLabel && <SubHeadline>{label}</SubHeadline>}
        </div>
      )}
    </button>
  );
};

export default FAB;
