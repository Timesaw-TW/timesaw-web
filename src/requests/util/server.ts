import { requestWrapper } from "..";

export const getServerHealth = () => {
  return requestWrapper<string>({
    url: "/api/internal/health",
    method: "GET",
  });
};
