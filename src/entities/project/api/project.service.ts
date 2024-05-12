import {$api} from "@/shared/api";
import {ProjectType} from "@/entities/project";

export class ProjectService {
  private constructor() {
  }

  async getAll(data?: RequestConfig) {
    return $api.get<ProjectType[]>('projects/all', data?.config);
  }

  async getById(id: number, data?: RequestConfig) {
    return $api.get(`projects/${id}`, data?.config)
  }

  static instance = new ProjectService();
}