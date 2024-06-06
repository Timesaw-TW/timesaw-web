import { FC } from "react";
import { merge } from "@/libs/tailwind";
import {
  IconShieldCheckOutline,
  IconShieldExclamationOutline,
} from "@/stories/Icons";
import Text from "@/stories/Typography/Text";

export type HealthCheckState = "success" | "failed" | "pending";

const HealthCheckIcon: FC<{ status: HealthCheckState }> = ({ status }) => {
  const className = merge(
    "ml-3 h-6 w-6",
    status === "success" ? "text-green-600" : "text-red-600"
  );
  if (status === "pending") {
    return <Text className="ml-3">-</Text>;
  }

  return status === "success" ? (
    <IconShieldCheckOutline className={className} />
  ) : (
    <IconShieldExclamationOutline className={className} />
  );
};

export default HealthCheckIcon;
