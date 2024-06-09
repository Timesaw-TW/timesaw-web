import { FC } from "react";
import { IconExclamationCircle } from "@/stories/Icons";
import Caption from "@/stories/Typography/Caption";
import { ErrorMessageProps } from "./type";
import { merge } from "@/libs/tailwind";

interface Props extends ErrorMessageProps {}

const ErrorMessage: FC<Props> = ({ message, element, className }) => {
  const Icon = element ?? (
    <IconExclamationCircle className="h-4 w-4 stroke-2" />
  );

  return (
    <div
      className={merge(
        "h-6 py-1 text-error",
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
