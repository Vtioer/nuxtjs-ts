import { NuxtAxiosInstance } from "@nuxtjs/axios";
import { NuxtCookies } from "cookie-universal-nuxt";

let $axios: NuxtAxiosInstance;

export function initializeAxios(axiosInstance: NuxtAxiosInstance) {
  $axios = axiosInstance;
}

let $cookies: NuxtCookies;

export function initializeCookies(cookiesInstance: NuxtCookies) {
  $cookies = cookiesInstance;
}

export { $axios, $cookies };
