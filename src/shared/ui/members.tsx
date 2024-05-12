import React from "react";
import {cn} from "../utils";
import {Avatar, AvatarFallback} from "./avatar";
import Image from "next/image";

const MAX_MEMBERS = 99;

export type Member = {
  link: string;
  name: string;
  avatar: string | null;
};

type MembersListProps = {
  className?: string;
  members: Member[];
  totalMembers: number;
};

export const MembersList = React.memo((props: MembersListProps) => {
  const {
    className, members, totalMembers
  }
    = props;
  return (
    <div className={cn("flex", className)}>
      {members.map((m) => {
        return (
          <Avatar
            className="border-2 border-white [&:not(:first-child)]:-ml-3 cursor-pointer"
            title={m.name}
            link={m.link}
            key={m.link}
          >
            {m.avatar ? (
            <Image width={40} height={40} alt={m.name} src={m.avatar} />
            ) : (
              <AvatarFallback>{m.name.slice(0, 2)}</AvatarFallback>
            )}
          </Avatar>
        );
      })}
      {members.length < totalMembers && (
        <Avatar className="[&:not(:first-child)]:-ml-3 outline outline-2 outline-white">
          <AvatarFallback className="bg-muted font-bold">
            {totalMembers - members.length > MAX_MEMBERS
              ? MAX_MEMBERS
              : totalMembers - members.length}
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
});

MembersList.displayName = "MembersList";
