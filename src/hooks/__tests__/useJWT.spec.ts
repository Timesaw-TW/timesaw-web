import { act, renderHook } from "@testing-library/react";
import useJWT from "../useJWT";
import { CookieKey, setCookie, removeCookie } from "@/libs/cookie";

jest.mock("@/libs/cookie", () => ({
  __esModule: true,
  CookieKey: {
    TOKEN: "key",
  },
  getCookie: jest.fn(),
  setCookie: jest.fn(),
  removeCookie: jest.fn(),
}));

describe("#useJWT", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should set token and save to cookie", () => {
    const { result } = renderHook(() => useJWT());
    const mockToken = "new-token";

    act(() => {
      result.current.setToken(mockToken);
    });

    expect(result.current.token).toBe(mockToken);
    expect(setCookie).toHaveBeenCalledWith(CookieKey.TOKEN, mockToken);
  });

  it("should remove token and delete cookie", () => {
    const { result } = renderHook(() => useJWT());

    act(() => {
      result.current.removeToken();
    });

    expect(result.current.token).toBeUndefined();
    expect(removeCookie).toHaveBeenCalledWith(CookieKey.TOKEN);
  });
});
