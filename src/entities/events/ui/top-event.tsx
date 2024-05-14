import { Box } from "@/shared/ui/box";
import { Typography } from "@/shared/ui/typography";
import { cn } from "@/shared/utils";
import React from "react";
import { EventType } from "../model/types";

type TopEventProps = {
  className?: string;
  event?: EventType;
};

export const TopEvent = React.memo((props: TopEventProps) => {
  const { className, event } = props;

  return (
    <Box
      className={cn("bg-gradient-to-r from-blue-600 to-violet-600", className)}
    >
      <Typography className="text-white" variant={"h2"}>
        Мероприятие дня
      </Typography>
      <Typography className="text-white" variant={"h2"}>
        {event?.name}
      </Typography>
    </Box>
  );
});

TopEvent.displayName = "TopEvent";
