"use client";

import { useEffect, useState } from "react";
import FAB from "@/stories/FAB";
import useRequest from "@/hooks/useRequest";
import { getServerHealth } from "@/requests/util/server";
import {
  IconShieldCheckOutline,
  IconShieldExclamationOutline,
} from "@/stories/Icons";
import { merge } from "@/utils/tailwind";

const ServerHealth = () => {
  const [showStatus, setShowStatus] = useState<boolean>(false);
  const [status, setStatus] = useState<boolean>(false);
  const request = useRequest();

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    request
      .fetch(getServerHealth())
      .then(() => {
        setStatus(true);
      })
      .catch(() => {
        setStatus(false);
      })
      .finally(() => {
        setShowStatus(true);
        timeoutId = setTimeout(() => {
          setShowStatus(false);
        }, 2000);
      });
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  if (!showStatus) {
    return <></>;
  }

  return (
    <FAB
      icon={status ? IconShieldCheckOutline : IconShieldExclamationOutline}
      showLabel
      label="Server Health"
      className={merge(
        "rounded-[100px]",
        status ? "bg-green-500" : "bg-red-500"
      )}
    />
  );
};

export default ServerHealth;
