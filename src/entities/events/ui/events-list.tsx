import clsx from "clsx";
import React from "react";
import { EventType } from "../model/types";
import { cn } from "@/shared/utils";
import { EventsListItem } from "./events-list-item";

type EventsListProps = {
  className?: string;
  events: EventType[];
};

export const EventsList = React.memo((props: EventsListProps) => {
  const { className, events } = props;
  return (
    <div className={cn("grid lg:grid-cols-4 grid-cols-2 gap-4", className)}>
      {events.map((e) => (
        <EventsListItem event={e} key={e.id} />
      ))}
    </div>
  );
});

EventsList.displayName = "EventsList";
