import { AxiosResponse } from "axios";
import axios from "./axios-utils";

export type techDataType = {
  id: number;
  title: string;
  description: string;
  frameworkType: string;
  releaseYear: number;
};

export const getTechs = () => axios.get("/data");

export const getSingleTech = (
  id: number | string
): Promise<AxiosResponse<techDataType>> => axios.get(`/data/${id}`);

export const createTech = (props: techDataType) => axios.post("/data", props);

export const upadateTech = ({
  id,
  props,
}: {
  id: number | string;
  props: techDataType;
}) => {
  return axios.put(`/data/${id}`, props);
};

export const deleteTech = (id: number | string) => axios.delete(`/data/${id}`);
