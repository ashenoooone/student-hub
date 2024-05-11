export type TokensResponseType = {
  type: string;
  accessToken: string;
  accessExpires: number;
  refreshToken: string;
  refreshExpires: number;
  authorities: string[];
};

export type PostRegisterUserParams = {
  email: string;
  password: string;
  login: string;
};

export type PostRefreshUserParams = {
  accessToken: string;
  refreshToken: string;
};

export type PostLoginUserParams = {
  password: string;
  login: string;
};

export type PostLoginUserRequestConfig = RequestConfig<PostLoginUserParams>;
