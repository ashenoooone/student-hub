import { $api } from "@/shared/api";
import {
  GetUserEventsRequestConfig,
  GetUserEventsResponse,
  GetUserProjectsRequestConfig,
  GetUserProjectsResponse,
  PostLoginUserRequestConfig,
  PostRefreshUserParams,
  PostRegisterUserParams,
  TokensResponseType,
  UserType,
} from "../model/types";
import { EventType } from "@/entities/events/model/types";

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
  async getUserData(data?: RequestConfig) {
    return $api.get<UserType>("users/me", data?.config);
  }

  async getUserById(id: number | string, data?: RequestConfig) {
    return $api.get<UserType>(`users/${id}`, data?.config);
  }

  async getUserEvents(data?: GetUserEventsRequestConfig) {
    // TODO добавить возможность пагинации ? квери парамсы передавать
    return $api.get<GetUserEventsResponse>(
      `users/${data?.params.id}/events`,
      data?.config
    );
  }

  async getUserProjects(data?: GetUserProjectsRequestConfig) {
    // TODO добавить возможность пагинации ? квери парамсы передавать
    return $api.get<GetUserProjectsResponse>(
      `users/${data?.params.id}/projects`,
      data?.config
    );
  }

  static instance = new UsersService();
}
