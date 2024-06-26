import { ProjectType } from "@/entities/project";
import { WithPagination } from "@/shared/types";

export type Member = {
  id: number;
  name: string;
  avatar: string;
};

export type EventType = {
  id: number;
  avatar: string | null;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: string;
  membersCount: number;
  members?: Member[];
  winners: ProjectType[];
};

export type EventStatus = "PLANNED" | "OPEN" | "COMPLETED";

type GetEventByIdParams = {
  id: string | number;
};
export type GetEventByIdRequestConfig = RequestConfig<GetEventByIdParams>;

export type GetAllEventsParams = {
  page?: number;
  limit?: number;
  status?: EventStatus | "ALL";
};

export type GetAllEventsResponse = {
  content: EventType[];
  page: number;
  size: number;
  totalPages: number;
};

export type GetAllEventsRequestConfig = RequestConfig<GetAllEventsParams>;

export type GetEventProjectsParams = {
  id: number;
  page?: number;
  limit?: number;
};

export type GetEventProjectsResponse = WithPagination<ProjectType[]>;

export type GetEventProjectsRequestConfig =
  RequestConfig<GetEventProjectsParams>;
