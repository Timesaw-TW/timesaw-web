import Cookies from "js-cookie";

export enum CookieKey {
  TOKEN = "__t",
}

export const setCookie = (
  key: CookieKey,
  value: unknown,
  options?: Cookies.CookieAttributes
) => {
  return Cookies.set(key, JSON.stringify(value), options);
};

export const getCookie = <T>(key: CookieKey): T | undefined => {
  const cookie = Cookies.get(key);
  if (cookie) {
    return JSON.parse(cookie);
  }
};

export const removeCookie = (
  key: CookieKey,
  options?: Cookies.CookieAttributes
) => {
  Cookies.remove(key, options);
};
