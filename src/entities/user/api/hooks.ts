import {useMutation, useQuery} from "@tanstack/react-query";
import { UsersService } from "../api";
import {
    DeleteUserRolesRequestConfig, GetAllUsersParams, GetAllUsersParamsConfig,
    PatchUserRolesRequestConfig,
    PostLoginUserRequestConfig,
    PutUserAboutRequestConfig,
    PutUserMediaRequestConfig,
} from "../model/types";

export const USERS_KEY = "users";

export const usePostLoginUserMutation = (
  settings?: MutationSettings<
    PostLoginUserRequestConfig,
    typeof UsersService.instance.login
  >
) =>
  useMutation({
    mutationKey: ["usePostLoginUserMutation"],
    mutationFn: ({ params, config }) =>
      UsersService.instance.login({
        params,
        config: { ...settings?.config, ...config },
      }),
    ...settings?.options,
  });

export const useGetAllUsers = (settings: GetAllUsersParams) =>
    useQuery({
        queryFn: () =>
            UsersService.instance.getAllUsers({
                params: settings
            }),
        queryKey: [USERS_KEY, ...Object.values(settings)],
        select: ({ data }) => data,
    });


export const usePutUserAboutMutation = (
  settings?: MutationSettings<
    PutUserAboutRequestConfig,
    typeof UsersService.instance.putUserAbout
  >
) =>
  useMutation({
    mutationKey: ["usePutUserAboutMutation"],
    mutationFn: ({ params, config }) =>
      UsersService.instance.putUserAbout({
        params,
        config: { ...settings?.config, ...config },
      }),
    ...settings?.options,
  });

export const usePutUserMediaMutation = (
  settings?: MutationSettings<
    PutUserMediaRequestConfig,
    typeof UsersService.instance.putUserMedia
  >
) =>
  useMutation({
    mutationKey: ["usePutUserMediaMutation"],
    mutationFn: ({ params, config }) =>
      UsersService.instance.putUserMedia({
        params,
        config: { ...settings?.config, ...config },
      }),
    ...settings?.options,
  });

export const usePatchUserRolesMutation = (
  settings?: MutationSettings<
    PatchUserRolesRequestConfig,
    typeof UsersService.instance.patchUserRole
  >
) =>
  useMutation({
    mutationKey: ["usePatchUserRolesMutation"],
    mutationFn: ({ params, config }) =>
      UsersService.instance.patchUserRole({
        params,
        config: { ...settings?.config, ...config },
      }),
    ...settings?.options,
  });

export const useDeleteUserRolesMutation = (
  settings?: MutationSettings<
    DeleteUserRolesRequestConfig,
    typeof UsersService.instance.removeUserRole
  >
) =>
  useMutation({
    mutationKey: ["useDeleteUserRolesMutation"],
    mutationFn: ({ params, config }) =>
      UsersService.instance.removeUserRole({
        params,
        config: { ...settings?.config, ...config },
      }),
    ...settings?.options,
  });
