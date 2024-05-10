import {$api} from "@/shared/api";

export class EventsService {
  private constructor() {
  }

  async updateEventById(eventId: number | string, event: Omit<EventType, 'id'>) {
    return $api.put<EventType>(`event/${eventId}`, event)
  }

  async createEvent(event: Omit<EventType, 'id'>) {
    return $api.post<EventType>('events', event);
  }

  async updateEventStatus(eventId: number | string, status: EventStatus) {
    return $api.patch<EventType>(`events/${eventId}/status`, null, {
      params: {
        eventStatusIn: status
      }
    })
  }

  async deleteEventAvatar(id: number | string) {
    return $api.delete<EventType>(`events/${id}/avatar`)
  }

  async setEventAvatar() {
    throw new Error('Api not implementations')
  }

  async getEventById(id: number | string) {
    return $api.get<EventType>(`events/${id}`)
  }

  async getAll() {
    return $api.get<EventType[]>('events/all')
  }

  static instance = new EventsService()
}