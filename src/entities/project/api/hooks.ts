import {useQuery} from "@tanstack/react-query";
import {ProjectService} from "@/entities/project";

const PROJECTS_KEY = 'projects'

export const useProjects = ({page = 1}: { page: number }) => useQuery({
  queryKey: [PROJECTS_KEY, page],
  queryFn: () => ProjectService.instance.getAll({
    config: {
      params: {
        page
      }
    }
  }),
  select: ({data}) => data
})