import axios from "axios";
import Cookie from "js-cookie";
import { COOKIE_USER } from "@/entities/user";
import { TokensResponseType } from "@/entities/user/model/types";

const baseUrl = process.env.API_URL;

export const $api = axios.create({
  baseURL: baseUrl,
});

// TODO: добавить проверку что если запрос упал, то обновить токены по рефреш токену
$api.interceptors.request.use((config) => {
  const token = JSON.parse(Cookie.get(COOKIE_USER)!) as TokensResponseType;

  if (token) {
    config.headers.Authorization = `${token.type} ${token.accessToken}`;
  }

  return config;
});
