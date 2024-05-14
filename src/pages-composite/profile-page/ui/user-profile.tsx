import { cn } from "@/shared/utils";
import React from "react";
import { ProfileHeader } from "./profile-header";
import { Events, Info, ProjectList } from "..";
import { AboutUser } from "@/entities/user";
import { ProfileCompliments } from "./profile-compliments";
import { UserType } from "@/entities/user/model/types";
import { ProjectType } from "@/entities/project";
import { EventType } from "@/entities/events/model/types";
import { RoleType } from "@/entities/role";

type UserProfileProps = {
  className?: string;
  profile: UserType;
  project: ProjectType[];
  events: EventType[];
  totalProjects: number;
  totalEvents: number;
  roles: RoleType[];
};

export const UserProfile = React.memo((props: UserProfileProps) => {
  const {
    className,
    events,
    profile,
    project,
    totalEvents,
    totalProjects,
    roles,
  } = props;
  return (
    <div className={cn("", className)}>
      <ProfileHeader profile={profile} />
      <div className={"flex flex-row gap-4 pt-5 w-full"}>
        <div className={"w-1/4 flex flex-col gap-4"}>
          <Info userMedia={profile.media} />
          <AboutUser roles={roles} profile={profile} />
          <ProfileCompliments profile={profile} />
        </div>
        <div className={"w-3/4 flex flex-col gap-4"}>
          <ProjectList totalProjects={totalProjects} projects={project} />
          <Events totalEvents={totalEvents} events={events} />
        </div>
      </div>
    </div>
  );
});

UserProfile.displayName = "UserProfile";
