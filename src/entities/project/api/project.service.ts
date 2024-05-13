import {$api} from "@/shared/api";
import {CommentType, ProjectType} from "@/entities/project";

export class ProjectService {
  private constructor() {
  }

  getAll(data?: RequestConfig) {
    return $api.get<PaginationType<ProjectType[]>>('projects/all', data?.config);
  }

  getById(id: number, data?: RequestConfig) {
    return $api.get(`projects/${id}`, data?.config)
  }

  getComments(projectId: number, data?: RequestConfig) {
    return $api.get<PaginationType<CommentType[]>>(`commentsProject/${projectId}`, data?.config)
  }

  sendComment(projectId: number, comment: Pick<CommentType, 'text' | 'createDate'>, data?: RequestConfig) {
    return $api.post<PaginationType<CommentType>>(`commentsProject/${projectId}`, comment, data?.config)
  }

  static instance = new ProjectService();
}