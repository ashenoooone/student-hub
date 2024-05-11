import clsx from "clsx";
import React from "react";
import { EventType } from "../model/types";

type EventsListProps = {
  className?: string;
  events: EventType[];
};

export const EventsList = React.memo((props: EventsListProps) => {
  const { className } = props;
  return <div className={clsx("", className)}></div>;
});

EventsList.displayName = "EventsList";
