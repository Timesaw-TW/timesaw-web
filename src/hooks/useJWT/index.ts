import { create } from "zustand";
import { CookieKey, getCookie, setCookie, removeCookie } from "@/libs/cookie";

interface JwtState {
  token: string | undefined;
  setToken: (token: string) => void;
  removeToken: () => void;
}

const useJWT = create<JwtState>((set) => ({
  token: getCookie<string>(CookieKey.TOKEN),
  setToken: (token: string) =>
    set(() => {
      setCookie(CookieKey.TOKEN, token);
      return { token };
    }),
  removeToken: () =>
    set(() => {
      removeCookie(CookieKey.TOKEN);
      return { token: undefined };
    }),
}));

export default useJWT;
