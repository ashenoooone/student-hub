import {$api} from "@/shared/api";
import {CreateRequestParamsType, CreateRequestResponseType} from "@/entities/request/model/types";


export class RequestService {
  private constructor() {
  }

  createOrder(data: CreateRequestParamsType, settings?: RequestConfig) {
    return $api.post<CreateRequestResponseType>('/request', data, settings?.config)
  }

  static instance = new RequestService();
}