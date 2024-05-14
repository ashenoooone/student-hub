import {EventType} from "@/entities/events/model/types";
import React, {FC} from "react";
import Image from "next/image";
import {Avatar, AvatarFallback} from "@/shared/ui/avatar";
import {Box} from "@/shared/ui/box";
import {ROUTES} from "@/shared/conts";
import {Typography} from "@/shared/ui/typography";

type EventProps = {
  event: EventType;
}

export const Event: FC<EventProps> = ({event}) => {
  return (
    <Box className={'w-1/3'}>
      <Typography variant={'h2'}>Мероприятие</Typography>
      <Avatar link={`${ROUTES.events}/${event.id}`} className={'w-full min-h-[240px] !rounded-[12px] cursor-pointer'}>
        {event.avatar ?
          <Image className={'!rounded-[12px] w-full object-contain'} src={event.avatar} alt={event.name} width={1000}
                 height={1000}/> :
          <AvatarFallback className={'!rounded-[12px]'}>{event.name}</AvatarFallback>}
      </Avatar>
      <Typography variant={'h3'}>{event.name}</Typography>
      <Typography className={'line-clamp-3'} affects={'muted'}>{event.description}</Typography>
    </Box>
  );
};