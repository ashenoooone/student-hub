import { GetAllEventsParams, GetAllEventsRequestConfig } from "../model/types";
import { EventsService } from "./event.service";
import { useQuery } from "@tanstack/react-query";

const EVENTS_KEY = "events";
const EVENT_KEY = "event";
const EVENTS_STALE_TIME = 60 * 1000; // 1 minutes

export const useGetAllEvents = (settings: GetAllEventsParams) =>
  useQuery({
    queryFn: () =>
      EventsService.instance.getAll({
        params: settings,
      }),
    queryKey: [EVENTS_KEY, ...Object.values(settings)],
    staleTime: EVENTS_STALE_TIME,
    select: ({ data }) => data,
  });

export const useEvent = (id: number | string) =>
  useQuery({
    queryFn: () =>
      EventsService.instance.getEventById({
        params: {
          id,
        },
      }),
    queryKey: [EVENT_KEY, id],
    select: ({ data }) => data,
  });
