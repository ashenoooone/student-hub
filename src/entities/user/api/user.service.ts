import { $api } from "@/shared/api";
import {
  PostLoginUserParams,
  PostRefreshUserParams,
  PostRegisterUserParams,
  TokensResponseType,
} from "../model/types";

export class UsersService {
  private constructor() {}

  async login(data: PostLoginUserParams) {
    return $api.post<TokensResponseType>("auth/login", data);
  }

  async refresh(data: PostRefreshUserParams) {
    return $api.post<TokensResponseType>("auth/refresh", data);
  }

  async register(data: PostRegisterUserParams) {
    return $api.post<TokensResponseType>("auth/register", data);
  }

  static instance = new UsersService();
}
