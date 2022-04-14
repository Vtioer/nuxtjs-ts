import { Plugin } from "@nuxt/types";
import { AxiosResponse, AxiosRequestConfig, AxiosError } from "axios";
import { initializeAxios, initializeCookies } from "~/utils/request";

const accessor: Plugin = ({ redirect, error, $axios, $cookies }) => {
  initializeAxios($axios);
  initializeCookies($cookies);
  // 请求拦截器
  $axios.onRequest((config: AxiosRequestConfig) => {
    const token = $cookies.get("token");

    if (token) {
      config.headers.Authorization = token;
    }
    if (config.method === "get") {
      config.headers.ContentType = "application/json;charset=UTF-8";
    } else {
      config.headers.ContentType = "application/x-www-form-urlencoded";
    }
    return config;
  });
  // 响应拦截器
  $axios.onResponse((resp: AxiosResponse) => {
    if (resp.status === 200) {
      return Promise.resolve(resp.data);
    } else {
      return Promise.reject(resp);
    }
  });

  $axios.onError((error: AxiosError<any>) => {
    const code: number | string = error.response ? error.response.status : "";
    if (code === 404 || code === 500) {
      redirect("/error");
    }

    return Promise.reject(error);
  });
};

export default accessor;
