import axios from "axios";

const baseUrl = process.env.API_URL;

export const $api = axios.create({
  baseURL: baseUrl,
});
