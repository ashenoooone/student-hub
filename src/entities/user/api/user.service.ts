import { $api } from "@/shared/api";
import {
  GetUserEventsRequestConfig,
  GetUserEventsResponse,
  GetUserProjectsRequestConfig,
  GetUserProjectsResponse,
  PostLoginUserRequestConfig,
  PostRefreshUserParams,
  PostRegisterUserParams,
  PutUserAboutRequestConfig,
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
    let url = `users/${data?.params.id}/events`;

    if (data?.params.page) {
      url += "?page=" + data?.params.page;
    } else {
      url += "?page=1";
    }

    if (data?.params.limit) {
      url += "&limit=" + data?.params.limit;
    } else {
      url += "&limit=25";
    }

    // TODO добавить возможность пагинации ? квери парамсы передавать
    return $api.get<GetUserEventsResponse>(url, data?.config);
  }

  async getUserProjects(data?: GetUserProjectsRequestConfig) {
    let url = `users/${data?.params.id}/projects`;
    if (data?.params.page) {
      url += "?page=" + data?.params.page;
    } else {
      url += "?page=1";
    }

    if (data?.params.limit) {
      url += "&limit=" + data?.params.limit;
    } else {
      url += "&limit=3";
    }
    console.log(url);
    // TODO добавить возможность пагинации ? квери парамсы передавать
    return $api.get<GetUserProjectsResponse>(url, data?.config);
  }

  async putUserAbout(data: PutUserAboutRequestConfig) {
    // TODO добавить возможность пагинации ? квери парамсы передавать
    return $api.put(`users/about`, data.params, data?.config);
  }

  static instance = new UsersService();
}
