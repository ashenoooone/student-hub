import { Box } from "@/shared/ui/box";
import { Skeleton } from "@/shared/ui/skeleton";
import { cn } from "@/shared/utils";
import React from "react";

type ProjectTableCardSkeletonProps = {
  className?: string;
};

export const ProjectTableCardSkeleton = React.memo(
  (props: ProjectTableCardSkeletonProps) => {
    const { className } = props;
    return (
      <Box
        className={cn(
          "flex gap-4 w-full items-stretch min-h-[329px]",
          className
        )}
      >
        <div>
          <Skeleton className="w-[320px] h-[245px]" />
          <Skeleton className="h-8 mt-4" />
        </div>
        <div className="basis-1/2 flex flex-col justify-between">
          <Skeleton className="h-6 w-44" />
          <Skeleton className="h-6 w-32 mt-2" />
          <Skeleton className="h-40 w-full mt-2" />
          <div className="mt-full flex gap-2">
            <Skeleton className="rounded-full w-10 h-10" />
            <Skeleton className="rounded-full w-10 h-10" />
            <Skeleton className="rounded-full w-10 h-10" />
          </div>
        </div>
      </Box>
    );
  }
);

ProjectTableCardSkeleton.displayName = "ProjectTableCardSkeleton";
