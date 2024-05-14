import { EventType } from "@/entities/events/model/types";
import { ProjectType } from "@/entities/project";
import { RoleType } from "@/entities/role";
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

export type UserRatingType =
  | "creativity"
  | "learningAbility"
  | "politeness"
  | "responsibility";

export const UserRatingMapper: Record<UserRatingType, string> = {
  creativity: "Креативность",
  learningAbility: "Обучаемость",
  politeness: "Ответственность",
  responsibility: "Вежливость",
};

export type UserRatingsType = Record<UserRatingType, number>;

export type UserType = {
  id: number;
  userId: number;
  login: string;
  email: string;
  roles: string[];
  rolesForProject: RoleType[];
  avatar: string | null;
  firstName: string;
  lastName: string;
  middleName: string;
  media?: UserMediaType;
  ratings: UserRatingsType;
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

export type GetAllUsersResponse = WithPagination<UserType[]>

export type GetUserProjectsRequestConfig = RequestConfig<GetUserProjectsParams>;

export type PutUserAboutParams = {
  about: string;
};

export type PutUserAboutRequestConfig = RequestConfig<PutUserAboutParams>;

export type PutUserMediaParams = Omit<UserMediaType, "about">;

export type PutUserMediaRequestConfig = RequestConfig<PutUserMediaParams>;

export type PatchUserRolesParams = {
  roleId: number;
};

export type PatchUserRolesRequestConfig = RequestConfig<PatchUserRolesParams>;

export type DeleteUserRolesParams = {
  roleId: number;
};

export type GetAllUsersParams = {
  page: number;
  limit: number;
  search: string | null;
  roles: RoleType[];
}

export type DeleteUserRolesRequestConfig = RequestConfig<DeleteUserRolesParams>;
export type GetAllUsersParamsConfig = RequestConfig<GetAllUsersParams>