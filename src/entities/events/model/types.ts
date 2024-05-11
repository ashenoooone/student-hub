export type EventType = {
  id: number;
  avatar: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: string;
  membersCount: number;
};

export type EventStatus = "PLANNED" | "OPEN" | "COMPLETED";

type GetEventByIdParams = {
  id: string | number;
};
export type GetEventByIdRequestConfig = RequestConfig<GetEventByIdParams>;

type GetAllEventsParams = {
  page?: number;
  limit?: number;
  status?: EventStatus | "ALL";
};
export type GetAllEventsRequestConfig = RequestConfig<GetAllEventsParams>;
