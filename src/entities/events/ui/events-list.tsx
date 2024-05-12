import clsx from "clsx";
import React from "react";
import { EventType } from "../model/types";
import { cn } from "@/shared/utils";
import { EventsListItem } from "./events-list-item";
import { EventsListItemSkeleton } from "./events-list-item-skeleton";

type EventsListProps = {
  className?: string;
  events?: EventType[];
  isLoading?: boolean;
  skeletonCount?: number;
};

export const EventsList = React.memo((props: EventsListProps) => {
  const { className, events, isLoading, skeletonCount = 10 } = props;
  return (
    <div className={cn("grid lg:grid-cols-4 grid-cols-2 gap-4", className)}>
      {isLoading
        ? [...new Array(skeletonCount)].map((_, i) => (
            <EventsListItemSkeleton key={i} />
          ))
        : events?.map((e) => <EventsListItem event={e} key={e.id} />)}
    </div>
  );
});

EventsList.displayName = "EventsList";
