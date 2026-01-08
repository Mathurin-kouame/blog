import axios, { AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import { BASE_URL, CONDUIT_TOKEN } from "../../constants";


export const conduitApi = axios.create();

conduitApi.interceptors.request.use((request: AxiosRequestConfig) => {
  const token = localStorage.getItem(CONDUIT_TOKEN)
  request.baseURL = BASE_URL
  if (token) {
    if (request.headers) {
      request.headers.Authorization = `Bearer ${token}`
    } else {
      request.headers = {
        Authorization: `Bearer ${token}`
      }
    }
  }
  return request as InternalAxiosRequestConfig
})


conduitApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const customError: AxiosError = {
      ...error,
      errors: error.response?.data?.errors,
      message: error.response?.data?.message,
      statusCode: error.response?.status,
    };

    return Promise.reject(customError);
  },
);

