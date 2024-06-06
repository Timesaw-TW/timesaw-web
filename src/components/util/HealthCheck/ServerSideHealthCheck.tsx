import { query } from "@/libs/graphql";
import Text from "@/stories/Typography/Text";
import HealthCheckIcon from "./HealthCheckIcon";
import { GQL_SERVER_CHECK } from "@/gql-requests/util/server";
import { getServerHealth } from "@/requests/util/server";

export default async function ServerSideHealthCheck() {
  const { data: gqlData, loading: gqlLoading } = await query<{
    healthCheck: string;
  }>({
    query: GQL_SERVER_CHECK,
  });

  const result = await getServerHealth();

  return (
    <>
      <Text className="flex items-center">
        Server Side (GraphQL) :
        <HealthCheckIcon
          status={gqlLoading ? "pending" : gqlData ? "success" : "failed"}
        />
      </Text>
      <Text className="flex items-center">
        Server Side (Restful) :
        <HealthCheckIcon status={result ? "success" : "failed"} />
      </Text>
    </>
  );
}
