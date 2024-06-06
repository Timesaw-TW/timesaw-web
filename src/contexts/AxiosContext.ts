import axios from "axios";
import type { AxiosInstance } from "axios";
import { createContext, useContext } from "react";

interface IAxiosContext {
  axios: AxiosInstance;
}

const AxiosContext = createContext<IAxiosContext>({
  axios: axios.create(),
});

export const useAxios = () => {
  return useContext(AxiosContext);
};

export default AxiosContext;
