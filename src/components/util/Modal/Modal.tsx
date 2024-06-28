import { FC, ReactNode } from "react";
import { merge } from "@/libs/tailwind";
import SubHeadline from "@/stories/Typography/SubHeadline";
import Button from "@/stories/Button";
import { IconXMark } from "@/stories/Icons";

export interface ModalProps {
  content: ReactNode;
  successLabel?: string;
  onSuccess?: () => void;
  cancelLabel?: string;
  onCancel?: () => void;
  footer?: ReactNode;
  allowClosed?: boolean;
  onClosed?: () => void;
  className?: string;
}

const Modal: FC<ModalProps> = ({
  content,
  onSuccess,
  onCancel,
  successLabel,
  cancelLabel,
  allowClosed,
  onClosed,
  footer,
}) => {
  return (
    <div
      className={merge(
        "fixed left-0 top-0 z-[100]",
        "h-full w-full bg-[#010B1F61]",
        "flex items-center justify-center"
      )}
    >
      <div
        className={merge(
          "relative h-[204px] w-[328px] bg-white",
          "flex flex-col justify-between gap-2",
          "rounded-lg px-4 py-6"
        )}
      >
        {content}
        {footer ??
          ((successLabel || cancelLabel) && (
            <div className="flex justify-end gap-4">
              {successLabel && (
                <Button className="w-fit" onClick={onSuccess}>
                  <SubHeadline>{successLabel}</SubHeadline>
                </Button>
              )}
              {cancelLabel && (
                <Button className="w-fit bg-warning" onClick={onCancel}>
                  <SubHeadline>{cancelLabel}</SubHeadline>
                </Button>
              )}
            </div>
          ))}
        {allowClosed && (
          <button
            type="button"
            className="absolute right-0 top-0 p-2"
            onClick={() => onClosed?.()}
          >
            <IconXMark />
          </button>
        )}
      </div>
    </div>
  );
};

export default Modal;
