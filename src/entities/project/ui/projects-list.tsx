import React from "react";
import { ProjectType } from "../model/types";
import { cn } from "@/shared/utils";
import { ProjectTableCard } from "./project-table-card";
import { ProjectTableCardSkeleton } from "./project-table-card-skeleton";

type ProjectsListProps = {
  className?: string;
  projects?: ProjectType[];
  isLoading?: boolean;
  skeletonCount?: number;
};

export const ProjectsList = React.memo((props: ProjectsListProps) => {
  const { className, projects, isLoading, skeletonCount = 10 } = props;
  return (
    <div className={cn("grid lg:grid-cols-2 grid-cols-1 gap-4", className)}>
      {isLoading
        ? [...new Array(skeletonCount)].map((_, i) => (
            <ProjectTableCardSkeleton key={i} />
          ))
        : projects?.map((p) => <ProjectTableCard project={p} key={p.id} />)}
    </div>
  );
});

ProjectsList.displayName = "ProjectsList";
