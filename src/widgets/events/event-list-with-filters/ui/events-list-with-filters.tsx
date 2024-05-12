import { EventsList, useGetAllEvents } from "@/entities/events";
import { EventStatus } from "@/entities/events/model/types";
import {
  EventsFilters,
  useEventsFiltersStore,
} from "@/features/events/filters";
import Pagination from "@/shared/ui/pagination";
import { cn } from "@/shared/utils";
import React, { useCallback } from "react";

type EventsListWithFiltersProps = {
  className?: string;
};

export const EventsListWithFilters = React.memo(
  (props: EventsListWithFiltersProps) => {
    const { className } = props;

    const filters = useEventsFiltersStore.use.filters();
    const eventsFiltersChangePage = useEventsFiltersStore.use.setPage();

    const { data, isLoading, error, isFetching } = useGetAllEvents({
      ...filters,
    });

    const onPageChange = useCallback(
      (page: number) => {
        eventsFiltersChangePage(page);
      },
      [eventsFiltersChangePage]
    );

    const onSearchChange = useCallback((value: string) => {}, []);

    const onStatusChange = useCallback((status: EventStatus | "ALL") => {}, []);

    // TODO обработка ошибок

    return (
      <div className={cn("flex flex-col gap-4", className)}>
        <EventsFilters
          status={filters.status}
          onChangeSearch={onSearchChange}
          onChangeStatus={onStatusChange}
        />
        <EventsList
          skeletonCount={filters.limit}
          isLoading={isLoading || isFetching}
          events={data?.content}
        />
        <Pagination
          className="self-center mt-4"
          onPageChange={onPageChange}
          totalCount={data ? data.totalPages * data.size : 10}
          currentPage={filters.page ?? 1}
          pageSize={filters?.limit ?? 10}
        />
      </div>
    );
  }
);

EventsListWithFilters.displayName = "EventsListWithFilters";
