import { EventType } from "@/entities/events/model/types";
import { ProjectType } from "@/entities/project";
import { WithPagination } from "@/shared/types";
import { Project } from "next/dist/build/swc";

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

export type UserMediaType = {
  tgUrl: string;
  vkUrl: string;
  phone: string;
  email: string;
  about: string;
};

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
  media?: UserMediaType;
};

export type GetUserEventsParams = {
  id: number;
  limit?: number;
  page?: number;
};

export type GetUserEventsResponse = WithPagination<EventType[]>;

export type GetUserEventsRequestConfig = RequestConfig<GetUserEventsParams>;

export type GetUserProjectsParams = {
  id: number;
  limit?: number;
  page?: number;
};

export type GetUserProjectsResponse = WithPagination<ProjectType[]>;

export type GetUserProjectsRequestConfig = RequestConfig<GetUserProjectsParams>;

export type PutUserAboutParams = {
  about: string;
};

export type PutUserAboutRequestConfig = RequestConfig<PutUserAboutParams>;
