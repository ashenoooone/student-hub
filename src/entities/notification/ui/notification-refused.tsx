import { NotificationType } from "@/entities/notification/model/types";
import { FC } from "react";
import { Avatar, AvatarFallback } from "@/shared/ui/avatar";
import Image from "next/image";
import { Typography } from "@/shared/ui/typography";
import { useUserProfileStore } from "@/entities/user";

type NotificationRefusedProps = {
  notification: NotificationType;
};

export const NotificationRefused: FC<NotificationRefusedProps> = ({
  notification,
}) => {
  const profile = useUserProfileStore.use.profile();

  console.log(
    profile,
    notification.sender,
    notification.sender.login === profile?.login
  );
  return (
    <div className={"flex flex-row gap-2 items-center space-y-2"}>
      <Avatar>
        {notification.sender.avatar ? (
          <Image
            src={notification.sender.avatar}
            alt={notification.sender.login}
            width={1000}
            height={1000}
          />
        ) : (
          <AvatarFallback>
            {notification.sender?.login.slice(0, 2)}
          </AvatarFallback>
        )}
      </Avatar>
      <div className={"flex flex-col"}>
        <Typography className={"text-[14px]"} variant={"h3"}>
          {notification.sender.login}
        </Typography>
        <Typography className={"text-[12px]"} affects={"muted"}>
          {notification.project.name}
        </Typography>
      </div>
      <Typography className={"ml-auto"}>
        {notification.sender.login !== profile?.login
          ? `Вы отказали ${notification.sender.login}!`
          : "Вас не добавили в проект!"}
      </Typography>
    </div>
  );
};
