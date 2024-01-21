import axios from "./axios-utils";

export const getusers = () => axios.get("/users");

export const getUsersPost = (id: string | number) =>
  axios.get(`/posts?userId=${id}`);

export const getUserAlbums = (id: string | number) =>
  axios.get(`/albums?userId=${id}`);
