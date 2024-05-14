import { ProjectType } from "@/entities/project";
import { ProjectCard } from "@/entities/project/ui/project-card";
import { cn } from "@/shared/utils";
import React from "react";

type EventWinnerProps = {
  className?: string;
  icon: React.ReactNode;
  project: ProjectType;
  iconClassName?: string;
};

export const EventWinner = React.memo((props: EventWinnerProps) => {
  const { className, icon, project, iconClassName } = props;
  return (
    <div className={cn("flex items-center", className)}>
      <span className={cn("text-3xl", iconClassName)}>{icon}</span>
      <ProjectCard project={project} />
    </div>
  );
});

EventWinner.displayName = "EventWinner";
