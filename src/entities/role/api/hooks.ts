import {useQuery} from "@tanstack/react-query";
import {RoleService} from "@/entities/role";

const ROLE_FOR_PROJECT = 'role-for-project';

export const useRolesFroProject = () => useQuery({
  queryKey: [ROLE_FOR_PROJECT],
  queryFn: () => RoleService.instance.getAll(),
  select: ({data}) => data
})