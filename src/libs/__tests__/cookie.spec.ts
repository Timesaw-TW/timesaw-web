import Cookies from "js-cookie";
import { CookieKey, getCookie, removeCookie, setCookie } from "../cookie";

jest.mock("js-cookie");

describe("#cookie", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should set a cookie", () => {
    const value = { user: "test" };
    const options = { expires: 7 };

    setCookie(CookieKey.TOKEN, value, options);
    expect(Cookies.set).toHaveBeenCalledWith(
      CookieKey.TOKEN,
      JSON.stringify(value),
      options
    );
  });

  it("should get a cookie", () => {
    const value = { user: "test" };
    Cookies.get = jest.fn().mockReturnValue(JSON.stringify(value));

    const result = getCookie<{ user: string }>(CookieKey.TOKEN);

    expect(Cookies.get).toHaveBeenCalledWith(CookieKey.TOKEN);
    expect(result).toEqual(value);
  });

  it("should return undefined if cookie does not exist", () => {
    Cookies.get = jest.fn().mockReturnValue(undefined);

    const result = getCookie<{ user: string }>(CookieKey.TOKEN);

    expect(Cookies.get).toHaveBeenCalledWith(CookieKey.TOKEN);
    expect(result).toBeUndefined();
  });

  it("should remove a cookie", () => {
    const options = { path: "/" };

    removeCookie(CookieKey.TOKEN, options);

    expect(Cookies.remove).toHaveBeenCalledWith(CookieKey.TOKEN, options);
  });
});
