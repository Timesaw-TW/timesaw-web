import { RequestWrapper } from "@/requests";
import { useAxios } from "@/contexts/AxiosContext";
import { AxiosRequestConfig } from "axios";
import { useMemo } from "react";

const useRequest = () => {
  const { axios } = useAxios();
  //   const { jwtToken } = useAuth();

  const fetch = useMemo(
    () =>
      <T>(requestWrapper: RequestWrapper<T>) => {
        const additionalToRequest: AxiosRequestConfig = {};
        // if (!requestWrapper.additional?.isPublic) {
        //   additionalToRequest.headers = { Authorization: `Bearer ${jwtToken}` };
        // }
        return requestWrapper
          .executor(axios, additionalToRequest)
          .then((res) => res.data);
      },
    [axios]
  );

  return { fetch };
};

export default useRequest;
