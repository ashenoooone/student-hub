import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {NotificationService} from "@/entities/notification";
import {useUserProfileStore} from "@/entities/user";
import {NotificationParamsType} from "@/entities/notification/model/types";

const REVALIDATION_TIME = 36000

const NOTIFICATION_KEY = 'notification-key'
const NOTIFICATION_MUTATION_KEY = 'notification-mutation-key'

export const useNotification = () => {
  const profile = useUserProfileStore.use.profile();
  return useQuery({
    queryKey: [NOTIFICATION_KEY],
    queryFn: () => NotificationService.instance.getAll(),
    select: ({data}) => data,
    enabled: !!profile,
    refetchInterval: REVALIDATION_TIME
  })
}

export const useNotificationMutation = (settings?: MutationSettings<
  { id: number } & NotificationParamsType,
  typeof NotificationService.instance.updateNotification
>) => {
  const queryClient = useQueryClient();
  return useMutation({
    onSettled: () => queryClient.invalidateQueries({
      queryKey: [NOTIFICATION_KEY]
    }),
    mutationKey: [NOTIFICATION_MUTATION_KEY],
    mutationFn: ({id, params}) => NotificationService.instance.updateNotification(id, params.requestResultIn),
    ...settings?.options
  });
}