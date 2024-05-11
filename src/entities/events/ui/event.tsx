import React from "react";
import { EventType } from "../model/types";
import { Box } from "@/shared/ui/box";
import { Typography } from "@/shared/ui/typography";
import { cn, formatToRussianDate } from "@/shared/utils";
import Image from "next/image";
import { CalendarIcon, ImageIcon } from "@radix-ui/react-icons";
import { MembersList } from "@/shared/ui/members";
import { ROUTES } from "@/shared/conts";

// for test members
// [
//   {
//     link: "vk.com",
//     name: "Roman",
//     avatar:
//       "https://pixelbox.ru/wp-content/uploads/2021/11/black-white-avatars-steam-pixelbox.ru-27.jpg",
//   },
//   {
//     link: "vk.com",
//     name: "IGOR",
//     avatar:
//       "https://distribution.faceit-cdn.net/images/ac97a03e-16fb-4c14-8676-c29f4b068e74.jpeg",
//   },
//   {
//     link: "vk.com",
//     name: "ILDAR",
//     avatar:
//       "https://distribution.faceit-cdn.net/images/5a70db89-1448-4a01-a56a-b8288a8dcdde.jpeg",
//   },
// ]

type EventProps = {
  className?: string;
  event: EventType;
};

export const Event = React.memo((props: EventProps) => {
  const { className, event } = props;

  return (
    <Box className={cn("p-10 flex gap-10 justify-between", className)}>
      <div className="basis-2/3 mt-2 flex flex-col">
        {/* main info */}
        <Typography variant={"h1"} className="mb-2">
          {event.name}
        </Typography>
        <Typography affects={"muted"} variant={"p"} className="mb-4">
          {event.description}
        </Typography>
        {/* tags */}
        <div></div>
        {/* footer */}
        <div>
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5" />
            <Typography>
              {formatToRussianDate(event.startDate)} -{" "}
              {formatToRussianDate(event.endDate)}
            </Typography>
          </div>
        </div>
      </div>
      <div>
        {event.avatar ? (
          <Image
            alt={event.name}
            className="h-[240px] w-[240px] object-cover rounded-md"
            src={event.avatar ?? NoImageAvailable}
          />
        ) : (
          <div className="h-[240px] w-[240px] bg-muted rounded-md flex items-center justify-center">
            <ImageIcon className="w-10 h-10 text-muted-foreground" />
          </div>
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
});

Event.displayName = "Event";
