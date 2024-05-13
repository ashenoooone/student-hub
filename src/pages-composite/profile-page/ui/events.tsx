import { Typography } from "@/shared/ui/typography";
import { Box } from "@/shared/ui/box";
import React, { FC } from "react";
import { EventType } from "@/entities/events/model/types";
import { EventsList } from "@/entities/events";
import { ROUTES } from "@/shared/conts";
import Link from "next/link";
import { Button } from "@/shared/ui/button";

type EventsProps = {
  events: EventType[];
  totalEvents: number;
};

export const Events: FC<EventsProps> = ({ events }) => {
  return (
    <Box>
      <Typography variant={"h3"} className={"mb-3"}>
        Мероприятия
      </Typography>
      {events.length > 0 ? (
        <>
          <EventsList events={events} />
        </>
      ) : (
        <Typography
          affects={"muted"}
          className="text-center flex flex-col items-center"
        >
          Вы пока не записались ни на одно мероприятие 😖
          <Link className="w-max" href={ROUTES.events}>
            {/* TODO ИСПРАВИТЬ ПОТОМ */}
            <Button variant={"link"}>Посмотреть список мероприятий</Button>
          </Link>
        </Typography>
      )}
    </Box>
  );
};
