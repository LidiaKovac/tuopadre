import axios, { AxiosError, AxiosInstance } from "axios";
const updateHeaderInterceptor = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use((config) => {
    config.baseURL = "http://192.168.1.251:3001";
    config.headers["Authorization"] = "Bearer " + localStorage.getItem("tuopadre-token");
    return config;
  });
};
const errorInterceptor = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.response.use(
    (res) => {
      return Promise.resolve(res);
    },
    (error: AxiosError) => {
      if ((error.response?.status as number) >= 400) {
        location.assign("/login");
      }
      return Promise.reject(error.response?.data);
    },
  );
};
const httpClient = axios.create();

updateHeaderInterceptor(httpClient);
errorInterceptor(httpClient);

export default httpClient;