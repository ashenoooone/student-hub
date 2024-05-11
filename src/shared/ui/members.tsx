import React from "react";
import { cn } from "../utils";
import { Avatar, AvatarFallback } from "./avatar";
import Image from "next/image";

const MAX_MEMBERS = 99;

type Member = {
  link: string;
  name: string;
  avatar: string;
};

type MembersListProps = {
  className?: string;
  members: Member[];
  totalMembers: number;
};

export const MembersList = React.memo((props: MembersListProps) => {
  const { className, members, totalMembers } = props;
  return (
    <div className={cn("flex", className)}>
      {members.map((m) => {
        return (
          <Avatar
            className="border-2 border-white [&:not(:first-child)]:-ml-3 cursor-pointer"
            title={m.name}
            key={m.link}
          >
            <Image width={40} height={40} alt={m.name} src={m.avatar} />
          </Avatar>
        );
      })}
      {members.length < MAX_MEMBERS && (
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
