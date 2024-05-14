import { cn, formatToRussianDate } from "@/shared/utils";
import React, { useCallback } from "react";
import { EventType } from "../model/types";
import { Box } from "@/shared/ui/box";
import Image from "next/image";
import { NoImageAvailable } from "@/shared/assets/noImageAvailable";
import { Typography } from "@/shared/ui/typography";
import { PersonIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useRouter } from "next/router";
import { ROUTES } from "@/shared/conts";

type EventsListItemProps = {
  className?: string;
  event: EventType;
};

export const EventsListItem = React.memo((props: EventsListItemProps) => {
  const { className, event } = props;

  return (
    <Box className="hover:scale-[101%] transition-all cursor-pointer">
      <Link
        className={cn("flex flex-col justify-between h-full", className)}
        href={`${ROUTES.events}/${event.id}`}
      >
        {event.avatar ? (
          <Image
            width={1000}
            height={1000}
            alt={event.name}
            src={event.avatar}
            className="h-[140px] object-fit"
          />
        ) : (
          <NoImageAvailable className="w-full h-[140px]" />
        )}
        <div className="px-2 flex flex-col items-stretch justify-between flex-grow">
          {/* TODO tags */}
          <Typography className="font-bold mt-2 mb-3">{event.name}</Typography>
          <div className="mt-auto">
            <Typography affects={"muted"}>
              {formatToRussianDate(event.startDate, true)} -{" "}
              {formatToRussianDate(event.endDate, true)}
            </Typography>
            <div className="flex mt-2">
              <Typography
                className="font-bold flex items-center ml-auto"
                affects={"muted"}
              >
                <PersonIcon className="w-5 h-5" />
                {event.membersCount}
              </Typography>
            </div>
          </div>
        </div>
      </Link>
    </Box>
  );
});

EventsListItem.displayName = "EventsListItem";
