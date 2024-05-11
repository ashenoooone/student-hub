import { useMutation } from "@tanstack/react-query";
import { UsersService } from "../api";
import { PostLoginUserRequestConfig } from "../model/types";

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
