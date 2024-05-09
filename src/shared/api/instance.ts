import axios from "axios";

const baseUrl = "";

export const $api = axios.create({
  baseURL: baseUrl,
});
