import {$api} from "@/shared/api";
import {
  PostLoginUserRequestConfig,
  PostRefreshUserParams,
  PostRegisterUserParams,
  TokensResponseType,
  UserType,
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

  // TODO request config
  async getUserData() {
    return $api.get<UserType>('users/me')
  }

  // TODO request config
  async getUserById(id: number | string) {
    return $api.get<UserType>(`users/${id}`)
  }

  static instance = new UsersService();
}
