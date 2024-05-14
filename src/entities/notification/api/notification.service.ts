import {$api} from "@/shared/api";
import {NotificationParamsType, NotificationType} from "@/entities/notification/model/types";


export class NotificationService {
  private constructor() {
  }

  getAll(data?: RequestConfig) {
    return $api.get<NotificationType[]>('request/all', data?.config)
  }

  updateNotification(id: number, status: string, data?: RequestConfig) {
    return $api.patch(`request/${id}?requestResultIn=${status}`, data?.config)
  }


  static instance = new NotificationService();
}