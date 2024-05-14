import { EventStatus, EventType } from "@/entities/events/model/types";
import { UserType } from "@/entities/user/model/types";
import { RoleType } from "@/entities/role";
import { WithPagination } from "@/shared/types";

export type ProjectType = {
  id: number;
  avatar: string;
  name: string;
  description: string;
  leader: UserType;
  status: string;
  event: EventType;
  members: UserType[];
  actualRoles: RoleType[];
  createDate: string;
};

export type CommentType = {
  id: number;
  author: {
    id: number;
    login: string;
    email: string;
    avatar: string;
  };
  text: string;
  createDate: string;
};

export type CommentParamsType = {
  projectId: number;
} & Pick<CommentType, "text" | "createDate">;

export type ProjectQueryParamsTypes = {
  filter: {
    page: number;
    limit?: number;
    search?: string;
  };
};

export type ProjectsFilterParamsType = {
  search?: string;
};

export type GetAllProjectsParams = {
  page?: number;
  limit?: number;
  search?: string;
  status?: EventStatus | "ALL";
  needActualRoles?: boolean;
};

export type GetAllProjectsRequestConfig = RequestConfig<GetAllProjectsParams>;

export type GetAllProjectsResponse = WithPagination<ProjectType[]>;
