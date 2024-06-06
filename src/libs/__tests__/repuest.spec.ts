import { RequestWrapper } from "@/requests";
import { request } from "../request";

describe("#request", () => {
  it("should call request correctly", async () => {
    const executorMock = jest.fn().mockResolvedValueOnce({ data: "ok" });
    const requestWrapper: RequestWrapper<string> = {
      executor: executorMock,
      url: "/test",
      method: "GET",
    };

    const result = await request(requestWrapper);
    expect(result).toBe("ok");
    expect(executorMock).toHaveBeenCalledTimes(1);
  });
});
