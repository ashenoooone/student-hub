import { Box } from "@/shared/ui/box";
import { Skeleton } from "@/shared/ui/skeleton";
import { cn } from "@/shared/utils";
import React from "react";

type EventsListItemSkeletonProps = {
  className?: string;
};

export const EventsListItemSkeleton = React.memo(
  (props: EventsListItemSkeletonProps) => {
    const { className } = props;
    return (
      <Box className={cn("w-full flex flex-col", className)}>
        <Skeleton className="h-[140px]" />
        <Skeleton className="h-4 mt-2" />
        <Skeleton className="h-4 mt-3 w-2/3" />
        <Skeleton className="h-4 mt-2 ml-auto w-6" />
      </Box>
    );
  }
);

EventsListItemSkeleton.displayName = "EventsListItemSkeleton";
