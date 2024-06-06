import { requestWrapper } from "..";

export const getServerHealth = () => {
  return requestWrapper<{ status: string }>({
    url: "/api/internal/health",
    method: "GET",
  });
};
