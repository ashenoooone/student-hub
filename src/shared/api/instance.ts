import axios from "axios";
import Cookie from "js-cookie";
import { COOKIE_USER, useUserStore } from "@/entities/user";
import { TokensResponseType } from "@/entities/user/model/types";

const baseUrl = process.env.API_URL;

export const $api = axios.create({
  baseURL: baseUrl,
});

// TODO: добавить проверку что если запрос упал, то обновить токены по рефреш токену
$api.interceptors.request.use((config) => {
  const cookieToken = Cookie.get(COOKIE_USER);

  if (cookieToken) {
    const parsedTokens = JSON.parse(cookieToken) as TokensResponseType;
    config.headers.Authorization = `${parsedTokens.type} ${parsedTokens.accessToken}`;
  }

  return config;
});
