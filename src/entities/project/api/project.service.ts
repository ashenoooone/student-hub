import { $api } from "@/shared/api";
import {
  CommentType, CreateProjectParamsType,
  GetAllProjectsRequestConfig,
  GetAllProjectsResponse,
  GetNeededProjectsRequestConfig,
  GetNeededProjectsResponse,
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

    if (config?.params.needActualRoles) {
      url += "&needActualRoles=" + config?.params.needActualRoles;
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

  getNeededProjects(config?: GetNeededProjectsRequestConfig) {
    let url = "projects/all/needed";

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

    return $api.get<GetNeededProjectsResponse>(url, config?.config);
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

  createProject(data: CreateProjectParamsType) {
    return $api.post<ProjectType>('projects', data)
  }

  static instance = new ProjectService();
}
