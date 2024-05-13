import { useMutation } from "@tanstack/react-query";
import { UsersService } from "../api";
import {
  PostLoginUserRequestConfig,
  PutUserAboutRequestConfig,
  PutUserMediaRequestConfig,
} from "../model/types";

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
