import clsx from "clsx";
import { FC } from "react";

interface Props {
  percentage: number;
  size?: number;
  strokeWidth?: number;
}

const ProgressCircle: FC<Props> = ({
  percentage,
  size = 16,
  strokeWidth = 1.5,
}) => {
  const radius = (size - strokeWidth) / 2;

  const dashArray = radius * Math.PI * 2;
  const dashOffset = dashArray - (dashArray * (percentage || 0)) / 100;

  if (percentage >= 100) {
    return (
      <div
        style={{ width: `${size}px`, height: `${size}px` }}
        className={clsx(
          "rounded-[50%] bg-secondary fill-white",
          "flex items-center justify-center"
        )}
      >
        <svg viewBox="0 0 16 16" className="h-[70%] w-[70%]">
          <path
            fillRule="evenodd"
            d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    );
  }

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle
        className="fill-none stroke-caption"
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={`${strokeWidth}px`}
      />
      <circle
        className={clsx(
          "fill-none stroke-secondary"
          // "transition-all delay-200 ease-in"
        )}
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeLinecap="round"
        strokeWidth={`${strokeWidth}px`}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{
          strokeDasharray: dashArray,
          strokeDashoffset: dashOffset,
        }}
      />
    </svg>
  );
};

export default ProgressCircle;
