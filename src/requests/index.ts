import { getEnv } from "@/libs/environment";
import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

type HttpMethod = "GET" | "POST";

export interface RequestWrapper<T> {
  executor: (
    axiosInstance: AxiosInstance,
    additionalToRequest?: AxiosRequestConfig
  ) => Promise<AxiosResponse<T>>;
  url: string;
  method: string;
  //   additional?: {
  //     isPublic?: boolean;
  //   };
}

export const requestWrapper = <T>(
  config: AxiosRequestConfig & {
    url: string;
    method: HttpMethod;
  }
  //   additional?: {
  //     isPublic?: boolean;
  //   }
): RequestWrapper<T> => {
  const url = `${getEnv().baseUri}${config.url}`;
  return {
    executor: (
      axiosInstance: AxiosInstance,
      additionalToRequest?: AxiosRequestConfig
    ) => {
      return axiosInstance.request({ ...config, ...additionalToRequest });
    },
    url,
    method: config.method,
    // additional,
  };
};
