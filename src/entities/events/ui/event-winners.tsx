import { ProjectType } from "@/entities/project";
import { Typography } from "@/shared/ui/typography";
import { cn } from "@/shared/utils";
import React from "react";
import { EventWinner } from "./event-winner";

type EventWinnersProps = {
  className?: string;
  winners?: ProjectType[];
};

export const EventWinners = React.memo((props: EventWinnersProps) => {
  const { className, winners } = props;

  if (!winners) return null;

  return (
    <div className={cn("", className)}>
      <Typography variant={"h1"} className="mb-4">
        Победители
      </Typography>
      <div className="flex flex-col gap-4">
        <EventWinner icon="🥇" />
        <EventWinner icon="🥈" />
        <EventWinner icon="🥉" />
      </div>
    </div>
  );
});

EventWinners.displayName = "EventWinners";
