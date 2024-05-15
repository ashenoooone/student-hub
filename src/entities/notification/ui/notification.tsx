import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { BellIcon } from "@radix-ui/react-icons";
import React, { Fragment } from "react";
import { useNotification } from "@/entities/notification";
import { Skeleton } from "@/shared/ui/skeleton";
import { ScrollArea } from "@/shared/ui/scroll-area";
import { NotificationType } from "@/entities/notification/model/types";
import { NotificationWaited } from "@/entities/notification/ui/notification-waited";
import { NotificationAccepted } from "@/entities/notification/ui/notification-accepted";
import { NotificationRefused } from "@/entities/notification/ui/notification-refused";
import { Typography } from "@/shared/ui/typography";

export const Notification = () => {
  const { data, isSuccess, isLoading, isFetching } = useNotification();

  const renderNotification = (notificate: NotificationType) => {
    if (notificate.result === "WAIT") {
      return <NotificationWaited notification={notificate} />;
    }
    if (notificate.result === "ACEEPTED") {
      return <NotificationAccepted notification={notificate} />;
    }
    if (notificate.result === "REFUSED") {
      return <NotificationRefused notification={notificate} />;
    }

    return <Fragment></Fragment>;
  };

  return (
    <Popover>
      <PopoverTrigger className={"relative"}>
        <BellIcon className="w-4 h-4 cursor-pointer hover:text-secondary" />
        {data && data?.length > 0 && (
          <Typography
            className={
              "absolute bg-red-500 w-[17px] h-[17px] rounded-full text-white top-[-8px] right-[-12px] text-[11px]"
            }
            affects={"error"}
          >
            {data?.length}
          </Typography>
        )}
      </PopoverTrigger>
      <PopoverContent className={"px-2"}>
        <ScrollArea className={"flex flex-col"}>
          {isLoading || isFetching
            ? Array.from({ length: 3 }).map((_, index) => (
                <Skeleton key={index} className={"h-10 mt-2"} />
              ))
            : data && data?.map(renderNotification)}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};
