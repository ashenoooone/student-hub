import { $api } from "@/shared/api";
import {
  PostLoginUserParams,
  PostLoginUserRequestConfig,
  PostRefreshUserParams,
  PostRegisterUserParams,
  TokensResponseType,
} from "../model/types";

export class UsersService {
  private constructor() {}

  async login(data: PostLoginUserRequestConfig) {
    return $api.post<TokensResponseType>(
      "auth/login",
      data.params,
      data.config
    );
  }

  // TODO request config
  async refresh(data: PostRefreshUserParams) {
    return $api.post<TokensResponseType>("auth/refresh", data);
  }

  // TODO request config
  async register(data: PostRegisterUserParams) {
    return $api.post<TokensResponseType>("auth/register", data);
  }

  static instance = new UsersService();
}
