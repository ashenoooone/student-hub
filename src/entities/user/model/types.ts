import { EventType } from "@/entities/events/model/types";

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

export type UserType = {
  id: number;
  userId: number;
  login: string;
  email: string;
  roles: string[];
  rolesForProject: string[];
  avatar: string | null;
  firstName: string;
  lastName: string;
  middleName: string;
};

export type GetUserEventsParams = {
  id: number;
  limit?: number;
  page?: number;
};

export type GetUserEventsResponse = {
  page: number;
  size: number;
  totalPages: number;
  content: EventType[];
};

export type GetUserEventsRequestConfig = RequestConfig<GetUserEventsParams>;
