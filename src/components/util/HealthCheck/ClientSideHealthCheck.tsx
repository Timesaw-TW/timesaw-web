"use client";

import { useEffect, useState } from "react";
import Text from "@/stories/Typography/Text";
import useRequest from "@/hooks/useRequest";
import { getServerHealth } from "@/requests/util/server";
import HealthCheckIcon, { HealthCheckState } from "./HealthCheckIcon";
import { GQL_SERVER_CHECK } from "@/gql-requests/util/server";
import { useQuery } from "@apollo/client";

const ClientSideHealthCheck = () => {
  const [restfulCheck, setRestfulCheck] = useState<HealthCheckState>("pending");
  const { fetch } = useRequest();
  const { data: gqlData, loading: gqlLoading } = useQuery<{
    healthCheck: string;
  }>(GQL_SERVER_CHECK);

  useEffect(() => {
    fetch(getServerHealth())
      .then(() => {
        setRestfulCheck("success");
      })
      .catch(() => {
        setRestfulCheck("failed");
      });
  }, [fetch]);

  const gqlCheck: HealthCheckState = gqlData ? "success" : "failed";

  return (
    <>
      <Text className="flex items-center">
        Client Side (GraphQL) :
        <HealthCheckIcon status={gqlLoading ? "pending" : gqlCheck} />
      </Text>
      <Text className="flex items-center">
        Client Side (Restful) : <HealthCheckIcon status={restfulCheck} />
      </Text>
    </>
  );
};

export default ClientSideHealthCheck;
