import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {CommentParamsType, ProjectQueryParamsTypes, ProjectService} from "@/entities/project";

const PROJECTS_KEY = 'projects'
const PROJECTS_COMMENTS_KEY = 'projects-comments'
const COMMENT_KEY = 'comment';

const DEFAULT_FILTER_CONFIG: ProjectQueryParamsTypes['filter'] = {
  page: 1,
  limit: 5
}


export const useProjects = ({filter = DEFAULT_FILTER_CONFIG}: ProjectQueryParamsTypes) => useQuery({
  queryKey: [PROJECTS_KEY, ...Object.entries(filter)],
  queryFn: () => ProjectService.instance.getAll({
    config: {
      params: filter
    }
  }),
  select: ({data}) => data
})

export const useComments = (projectId: string | number, page: number) => useQuery({
  queryKey: [PROJECTS_COMMENTS_KEY, page],
  queryFn: () => ProjectService.instance.getComments(+projectId, {
    config: {
      params: {
        page,
        limit: 5
      }
    }
  }),
  select: ({data}) => data,
})

export const useCommentSendMutation = (settings?: MutationSettings<
  CommentParamsType,
  typeof ProjectService.instance.sendComment
>) => {
  const queryClient = useQueryClient();
  return useMutation({
    onSettled: () => queryClient.invalidateQueries({queryKey: [PROJECTS_COMMENTS_KEY]}),
    mutationKey: [COMMENT_KEY],
    mutationFn: ({projectId, ...params}) => ProjectService.instance.sendComment(projectId, params),
    ...settings?.options,
  })
}