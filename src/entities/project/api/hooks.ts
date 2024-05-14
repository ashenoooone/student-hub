import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CommentParamsType,
  GetAllProjectsParams,
  ProjectQueryParamsTypes,
  ProjectService,
} from "@/entities/project";

const PROJECTS_KEY = "projects";
const PROJECTS_COMMENTS_KEY = "projects-comments";
const COMMENT_KEY = "comment";

const PROJECTS_STALE_TIME = 60 * 1000;
export const useGetAllProjects = (settings: GetAllProjectsParams) =>
  useQuery({
    queryFn: () =>
      ProjectService.instance.getAll({
        params: settings,
      }),
    queryKey: [PROJECTS_KEY, ...Object.values(settings)],
    staleTime: PROJECTS_STALE_TIME,
    select: ({ data }) => data,
  });

export const useComments = (projectId: string | number, page: number) =>
  useQuery({
    queryKey: [PROJECTS_COMMENTS_KEY, page],
    queryFn: () =>
      ProjectService.instance.getComments(+projectId, {
        config: {
          params: {
            page,
            limit: 5,
          },
        },
      }),
    select: ({ data }) => data,
  });

export const useCommentSendMutation = (
  settings?: MutationSettings<
    CommentParamsType,
    typeof ProjectService.instance.sendComment
  >
) => {
  const queryClient = useQueryClient();
  return useMutation({
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: [PROJECTS_COMMENTS_KEY] }),
    mutationKey: [COMMENT_KEY],
    mutationFn: ({ projectId, ...params }) =>
      ProjectService.instance.sendComment(projectId, params),
    ...settings?.options,
  });
};
