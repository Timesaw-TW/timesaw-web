import { FC } from "react";
import { IconExclamationCircle } from "@/stories/Icons";
import clsx from "clsx";
import Caption from "@/stories/Text/Caption";
import { ErrorMessageProps } from "./type";

interface Props extends ErrorMessageProps {}

const ErrorMessage: FC<Props> = ({ message, element, className }) => {
  const Icon = element ?? (
    <IconExclamationCircle className="h-4 w-4 stroke-2" />
  );

  return (
    <div
      className={clsx(
        "h-6 py-1 text-neutral-error",
        "flex items-center gap-1",
        className
      )}
    >
      {message && (
        <>
          {Icon}
          {typeof message === "string" ? <Caption>{message}</Caption> : message}
        </>
      )}
    </div>
  );
};

export default ErrorMessage;
