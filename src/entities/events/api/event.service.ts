import { $api } from "@/shared/api";
import {
  EventStatus,
  EventType,
  GetAllEventsRequestConfig,
  GetAllEventsResponse,
  GetEventByIdRequestConfig,
} from "@/entities/events/model/types";
import { createInflate } from "zlib";

export class EventsService {
  private constructor() {}

  async updateEventById(
    eventId: number | string,
    event: Omit<EventType, "id">
  ) {
    return $api.put<EventType>(`event/${eventId}`, event);
  }

  async createEvent(event: Omit<EventType, "id">) {
    return $api.post<EventType>("events", event);
  }

  async updateEventStatus(eventId: number | string, status: EventStatus) {
    return $api.patch<EventType>(`events/${eventId}/status`, null, {
      params: {
        eventStatusIn: status,
      },
    });
  }

  async deleteEventAvatar(id: number | string) {
    return $api.delete<EventType>(`events/${id}/avatar`);
  }

  async setEventAvatar() {
    throw new Error("Api not implementations");
  }

  async getEventById(config: GetEventByIdRequestConfig) {
    return $api.get<EventType>(`events/${config.params.id}`, config.config);
  }

  async getAll(config?: GetAllEventsRequestConfig) {
    let url = "events/all";

    if (config?.params.page) {
      url += "?page=" + config?.params.page;
    } else {
      url += "?page=1";
    }

    if (config?.params.limit) {
      url += "&limit=" + config?.params.limit;
    } else {
      url += "&limit=10";
    }

    if (config?.params.status) {
      url += "&status=" + config?.params.status;
    } else {
      url += "&status=ALL";
    }

    return $api.get<GetAllEventsResponse>(url, config?.config);
  }

  static instance = new EventsService();
}
