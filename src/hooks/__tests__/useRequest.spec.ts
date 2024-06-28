import { AxiosInstance } from "axios";
import { useAxios } from "@/contexts/AxiosContext";
import useRequest from "@/hooks/useRequest";
import { RequestWrapper } from "@/requests";
import { act, renderHook } from "@testing-library/react";

jest.mock("@/contexts/AxiosContext");

describe("#useRequest", () => {
  const mockUseAxios = useAxios as jest.Mock;
  const axiosInstance = {
    request: jest.fn(),
  } as unknown as AxiosInstance;

  beforeEach(() => {
    mockUseAxios.mockReturnValue({ axios: axiosInstance });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should execute request and return data", async () => {
    const requestWrapper: RequestWrapper<{ data: string }> = {
      executor: jest.fn().mockResolvedValue({ data: { data: "test data" } }),
      url: "/test-endpoint",
      method: "GET",
    };

    const { result } = renderHook(() => useRequest());

    await act(async () => {
      const data = await result.current.fetch(requestWrapper);
      expect(data).toEqual({ data: "test data" });
      expect(requestWrapper.executor).toHaveBeenCalledWith(axiosInstance, {});
    });
  });
});
