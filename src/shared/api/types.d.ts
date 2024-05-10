interface MutationSettings<Params = void, Func = unknown> {
  config?: ApiRequestConfig;
  options?: import("@tanstack/react-query").UseMutationOptions<
    Awaited<ReturnType<Func>>,
    any,
    Params,
    any
  >;
}

interface QuerySettings<Func = unknown> {
  config?: ApiRequestConfig;
  options?: Omit<
    import("@tanstack/react-query").UseQueryOptions<
      Awaited<ReturnType<Func>>,
      any,
      Awaited<ReturnType<Func>>,
      any
    >,
    "queryKey"
  >;
}

type ApiRequestConfig = import("axios").AxiosRequestConfig;

type RequestConfig<Params = undefined> = Params extends undefined
  ? { config?: ApiRequestConfig }
  : { params: Params; config?: ApiRequestConfig };

interface BaseResponse {
  success: boolean;
  reason?: string;
}

type BaseError = {
  detail?: string;
};

type ApiError = AxiosError<BaseError>;

// ~~~ ПРИМЕР МУТАЦИИ ~~~

// type PostCreateStrategyParams = {
//   name: string;
// };

// export type PostCreateStrategyRequestConfig =
//   RequestConfig<PostCreateStrategyParams>;

// export type PostCreateStrategyResponse = {
//   name: string;
//   is_active: boolean;
//   sources: any[];
//   id: number;
// };

// export const postCreateStrategy = ({
//   params,
//   config,
// }: PostCreateStrategyRequestConfig) =>
//   $api.post<PostCreateStrategyResponse>(
//     "/settings",
//     { ...params, sources: [] },
//     config
//   );

// export const usePostCreateStrategyMutation = (
//   settings?: MutationSettings<
//     PostCreateStrategyRequestConfig,
//     typeof postCreateStrategy
//   >
// ) => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationKey: ["postCreateStrategy"],
//     onSettled: async () => {
//       await queryClient.invalidateQueries({
//         queryKey: [USER_SETTINGS_QUERY_KEY],
//       });
//     },
//     mutationFn: ({ params, config }) =>
//       postCreateStrategy({
//         params,
//         config: { ...settings?.config, ...config },
//       }),
//     ...settings?.options,
//   });
// };

// ~~~ ПРИМЕР КВЕРИ ~~~

// type GetSettingsResponse = UserSettingsType[];

// export const getSettings = () => $api.get<GetSettingsResponse>("/settings");

// const STALE_TIME = 1000 * 60 * 5; // 5 minutes

// export const USER_SETTINGS_QUERY_KEY = "settings";

// export function useGetSettings(settings?: QuerySettings<typeof getSettings>) {
//   return useQuery({
//     staleTime: STALE_TIME,
//     queryFn: () => getSettings(),
//     queryKey: [USER_SETTINGS_QUERY_KEY],
//     ...settings,
//   });
// }
