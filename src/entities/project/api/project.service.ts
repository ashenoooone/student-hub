import { $api } from "@/shared/api";
import {
  CommentType,
  GetAllProjectsRequestConfig,
  GetAllProjectsResponse,
  ProjectType,
} from "@/entities/project";

export class ProjectService {
  private constructor() {}

  getAll(config?: GetAllProjectsRequestConfig) {
    let url = "projects/all";
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

    if (config?.params.search && config?.params.search.length > 0) {
      url += "&search=" + config?.params.search;
    }
    return $api.get<GetAllProjectsResponse>(url, config?.config);
  }

  getById(id: number, data?: RequestConfig) {
    return $api.get(`projects/${id}`, data?.config);
  }

  getComments(projectId: number, data?: RequestConfig) {
    return $api.get<PaginationType<CommentType[]>>(
      `commentsProject/${projectId}`,
      data?.config
    );
  }

  sendComment(
    projectId: number,
    comment: Pick<CommentType, "text" | "createDate">,
    data?: RequestConfig
  ) {
    return $api.post<PaginationType<CommentType>>(
      `commentsProject/${projectId}`,
      comment,
      data?.config
    );
  }

  static instance = new ProjectService();
}
