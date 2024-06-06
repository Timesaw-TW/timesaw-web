import { axios as axConfig } from "@/configs/axios";
import { RequestWrapper } from "./../requests/index";
import axios from "axios";

export const request = async <T>(wrapper: RequestWrapper<T>) => {
  const res = await wrapper.executor(axios.create(axConfig));
  return res.data;
};
