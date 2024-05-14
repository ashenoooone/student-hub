import {NotificationType} from "@/entities/notification/model/types";
import {FC} from "react";
import {Avatar, AvatarFallback} from "@/shared/ui/avatar";
import Image from "next/image";
import {Typography} from "@/shared/ui/typography";
import {CheckCircledIcon, CrossCircledIcon} from "@radix-ui/react-icons";
import {useNotificationMutation} from "@/entities/notification";
import {useToast} from "@/shared/ui/use-toast";

type NotificationWaitedProps = {
  notification: NotificationType
}

export const NotificationWaited: FC<NotificationWaitedProps> = ({notification}) => {
  const updateStatus = useNotificationMutation().mutateAsync;
  const {toast} = useToast();

  const handleAccept = async () => {
    await updateStatus({
      id: notification.id, params: {
        requestResultIn: 'ACEEPTED'
      }
    }).then(() => {
      toast({
        title: 'Уведомления',
        description: `Вы приняли ${notification.sender.login} в команду проекта ${notification.project.name}`
      })
    })
  }

  const handleDenied = async () => {
    await updateStatus({
      id: notification.id, params: {
        requestResultIn: 'REFUSED'
      }
    }).then(() => {
      toast({
        title: 'Уведомления',
        description: `Вы не приняли ${notification.sender.login} в команду проекта ${notification.project.name}`
      })
    })
  }
  return (
    <div className={'flex flex-row gap-2 items-center space-y-2'}>
      <Avatar>
        {notification.sender.avatar ? (
          <Image src={notification.sender.avatar} alt={notification.sender.login} width={20} height={20}/>
        ) : (
          <AvatarFallback>{notification.sender?.login.slice(0, 2)}</AvatarFallback>
        )}
      </Avatar>
      <div className={'flex flex-col'}>
        <Typography className={'text-[14px]'} variant={'h3'}>{notification.sender.login}</Typography>
        <Typography className={'text-[12px]'} affects={'muted'}>{notification.project.name}</Typography>
      </div>
      <Typography className={'ml-auto'}>{notification.sender.firstName} желает присоединиться</Typography>
      <div className={'flex flex-col gap-0.5'}>
        <CheckCircledIcon onClick={handleAccept} className={'w-5 h-5 cursor-pointer hover:text-green-400'}/>
        <CrossCircledIcon onClick={handleDenied} className={'w-5 h-5 cursor-pointer hover:text-red-400'}/>
      </div>
    </div>
  );
};