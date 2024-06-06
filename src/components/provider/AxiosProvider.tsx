"use client";

import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { FC, ReactNode, useMemo } from "react";

import { axios as axiosConfig } from "@/configs/axios";
import AxiosContext from "@/contexts/AxiosContext";

type Props = {
  children: ReactNode;
};

const AxiosProvider: FC<Props> = ({ children }) => {
  const axInterceptor = useMemo(() => {
    const onRequest = (
      config: InternalAxiosRequestConfig
    ): InternalAxiosRequestConfig => {
      return config;
    };
    const onResponse = (response: AxiosResponse): AxiosResponse => {
      return response;
    };
    const onError = (error: AxiosError): Promise<AxiosError> => {
      return Promise.reject(error);
    };
    return { onRequest, onResponse, onError };
  }, []);

  const axInstance = useMemo(() => {
    const instance = axios.create(axiosConfig);
    instance.interceptors.request.use(
      axInterceptor.onRequest,
      axInterceptor.onError
    );
    instance.interceptors.response.use(
      axInterceptor.onResponse,
      axInterceptor.onError
    );
    return instance;
  }, [axInterceptor]);

  return (
    axInstance && (
      <AxiosContext.Provider value={{ axios: axInstance }}>
        {children}
      </AxiosContext.Provider>
    )
  );
};

export default AxiosProvider;
