import axios, { AxiosError, AxiosInstance } from "axios";
import { store } from "../redux/store";
import uniqid from "uniqid";
const updateHeaderInterceptor = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use((config) => {
    config.baseURL = "http://localhost:3001/";
    // config.headers["Authorization"] =
    //   "Bearer " + localStorage.getItem("tumblr-token");
    return config;
  });
};
const errorInterceptor = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.response.use(
    (res) => {
      store.dispatch({
        type: "errors/resetErrors",
      });
      return Promise.resolve(res);
    },
    (error: AxiosError) => {
      store.dispatch({
        type: "errors/addError",
        payload: {
          ...(error.response?.data as Error),
          id: uniqid(),
        },
      });
      console.log(error);
      store.dispatch({
        type: "errors/setLoginError",
        payload: error.response?.status === 401,
      });
      return Promise.reject(error.response?.data);
    }
  );
};
const httpClient = axios.create();

updateHeaderInterceptor(httpClient);
errorInterceptor(httpClient);

export default httpClient;
