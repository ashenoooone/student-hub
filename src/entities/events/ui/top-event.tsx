import { Box } from "@/shared/ui/box";
import { Typography } from "@/shared/ui/typography";
import { cn } from "@/shared/utils";
import React from "react";
import { EventType } from "../model/types";
import { Button } from "@/shared/ui/button";
import Link from "next/link";
import { ROUTES } from "@/shared/conts";
import Image from "next/image";
import { MembersList } from "@/shared/ui/members";

type TopEventProps = {
  className?: string;
  event?: EventType;
};

export const TopEvent = React.memo((props: TopEventProps) => {
  const { className, event } = props;

  return (
    <Box
      className={cn(
        "bg-gradient-to-r flex gap-3 text-white from-blue-600 to-violet-600",
        className
      )}
    >
      <div className="w-1/2 flex flex-col">
        <Typography className="uppercase mb-2" variant={"h2"}>
          Мероприятие дня
        </Typography>
        <Typography className="" variant={"h2"}>
          {event?.name}
        </Typography>
        <Typography className="font-medium line-clamp-[12]">
          {event?.description}
        </Typography>
        {event && (
          <Button variant={"outline"} className="text-black mt-auto">
            <Link href={`${ROUTES.events}/${event?.id}`}>Узнать больше</Link>
          </Button>
        )}
      </div>
      <div className="">
        {event && event.avatar && (
          <Image
            width={1000}
            height={1000}
            src={event?.avatar}
            alt={event?.name}
            className="max-w-[260px] max-h-[260px] rounded"
          />
        )}
        {event?.members && (
          <div className="mt-2">
            <Typography className="font-bold">Уже участвуют: </Typography>
            <MembersList
              totalMembers={event.membersCount}
              members={event?.members.map((m) => ({
                avatar: m.avatar,
                link: `${ROUTES.profile}/${m.id}`,
                name: m.name,
              }))}
            />
          </div>
        )}
      </div>
    </Box>
  );
});

TopEvent.displayName = "TopEvent";
