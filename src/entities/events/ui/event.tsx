import React from "react";
import { EventType } from "../model/types";
import { Box } from "@/shared/ui/box";
import { Typography } from "@/shared/ui/typography";
import { cn, formatToRussianDate } from "@/shared/utils";
import Image from "next/image";
import { CalendarIcon, ImageIcon } from "@radix-ui/react-icons";
import { MembersList } from "@/shared/ui/members";
import { ROUTES } from "@/shared/conts";
import { NoImageAvailable } from "@/shared/assets/noImageAvailable";
import { ProjectType } from "@/entities/project";
import { ProjectList } from "@/pages-composite/profile-page";

type EventProps = {
  className?: string;
  event: EventType;
  eventProjects?: ProjectType[];
};

export const Event = React.memo((props: EventProps) => {
  const { className, event, eventProjects } = props;
  const eventContent = (
    <Box className={cn("p-10 flex gap-10 justify-between", className)}>
      <div className="basis-2/3 mt-2 flex flex-col">
        {/* main info */}
        <Typography variant={"h1"} className="mb-4">
          {event.name}
        </Typography>
        <Typography affects={"muted"} variant={"p"} className="mb-6">
          {event.description}
        </Typography>
        {/* tags */}
        <div></div>
        {/* footer */}
        <div>
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5" />
            <Typography>
              {formatToRussianDate(event.startDate, true)} -{" "}
              {formatToRussianDate(event.endDate, true)}
            </Typography>
          </div>
        </div>
      </div>
      <div>
        {event.avatar ? (
          <Image
            width={1000}
            height={1000}
            alt={event.name}
            className="h-[240px] w-[340px] object-fit rounded-md"
            src={event.avatar}
          />
        ) : (
          <NoImageAvailable className="h-[240px] w-[240px] " />
        )}
        {event.members && (
          <div className="mt-5">
            <Typography affects={"small"} className="uppercase font-bold mb-2">
              участвуют:{" "}
            </Typography>
            <MembersList
              totalMembers={event.membersCount}
              members={event.members.map((m) => {
                return {
                  avatar: m.avatar,
                  name: m.name,
                  link: `${ROUTES.profile}/${m.id}`,
                };
              })}
            />
          </div>
        )}
      </div>
    </Box>
  );

  if (eventProjects) {
    return (
      <div className="flex flex-col gap-2">
        {eventContent}
        <ProjectList projects={eventProjects} />
      </div>
    );
  }

  return eventContent;
});

Event.displayName = "Event";
