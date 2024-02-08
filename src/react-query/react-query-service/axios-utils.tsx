import axios from "axios";
import { getStoreValues, useCountStore } from "../../store/count-store";

axios.defaults.baseURL = "http://localhost:3000";

axios.interceptors.request.use(
  function (config) {
    const count = getStoreValues("count");
    console.log("🚀 ~ count:", count);
    return config;
  },

  function (error) {
    console.log("🚀 ~ file: axios-utils.jsx:21 ~ error:", error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log("🚀 ~ error:", error);
    return Promise.reject(error?.response);
  }
);

export default axios;
