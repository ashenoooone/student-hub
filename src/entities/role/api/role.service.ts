import {$api} from "@/shared/api";
import {RoleType} from "@/entities/role";

export class RoleService {
  private constructor() {
  }

  getAll(data?: RequestConfig) {
    return $api.get<RoleType[]>('/roleForProject/all', data?.config);
  }

  static instance = new RoleService()
}