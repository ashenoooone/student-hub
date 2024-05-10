import { $api } from "@/shared/api";

type PostLoginUserParams = {
  login: string;
  password: string;
};

export type PostLoginUserRequestConfig = RequestConfig<PostLoginUserParams>;

export type PostLoginUserResponse = {
  type: string;
  accessToken: string;
  refreshToken: string;
  accessExpires: number;
  refreshExpires: number;
  authorities: string[];
};

export const postLoginUser = ({ params, config }: PostLoginUserRequestConfig) =>
  $api.post<PostLoginUserResponse>("auth/login", { ...params }, config);
