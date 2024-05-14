import { Box } from "@/shared/ui/box";
import { Typography } from "@/shared/ui/typography";
import { cn } from "@/shared/utils";
import React from "react";
import { EventType } from "../model/types";
import { Button } from "@/shared/ui/button";

type TopEventProps = {
  className?: string;
  event?: EventType;
};

export const TopEvent = React.memo((props: TopEventProps) => {
  const { className, event } = props;

  return (
    <Box
      className={cn(
        "bg-gradient-to-r text-white from-blue-600 to-violet-600",
        className
      )}
    >
      <Typography className="uppercase mb-2" variant={"h2"}>
        Мероприятие дня
      </Typography>
      <Typography className="" variant={"h2"}>
        {event?.name}
      </Typography>
      <Typography className="font-medium line-clamp-[12] w-1/2">
        {event?.description}
      </Typography>
      <Button variant={"outline"} className="text-black mt-4">
        Узнать больше
      </Button>
    </Box>
  );
});

TopEvent.displayName = "TopEvent";
