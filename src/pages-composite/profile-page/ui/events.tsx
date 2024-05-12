import {Typography} from "@/shared/ui/typography";
import {Box} from "@/shared/ui/box";
import React, {FC} from "react";
import {EventType} from "@/entities/events/model/types";
import {EventsList} from "@/entities/events";

type EventsProps = {
  events: EventType[];
}

export const Events: FC<EventsProps> = ({events}) => {
  return (
    <Box>
      <Typography
        variant={'h3'}
        className={'mb-3'}
      >
        Мероприятия
      </Typography>
      <EventsList events={events}/>
    </Box>
  );
};