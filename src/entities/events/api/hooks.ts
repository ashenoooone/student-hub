import {EventsService} from './event.service';
import {useQuery} from "@tanstack/react-query";

const EVENTS_KEY = 'events';
const EVENT_KEY = 'event';

export const useEvents = () => useQuery({
  queryFn: () => EventsService.instance.getAll(),
  queryKey: [EVENTS_KEY],
  select: ({data}) => data
})

export const useEvent = (id: number | string) => useQuery({
  queryFn: () => EventsService.instance.getEventById(id),
  queryKey: [EVENT_KEY, id],
  select: ({data}) => data
})