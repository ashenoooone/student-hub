import { cn } from "@/shared/utils";
import React, { useCallback } from "react";
import { useGetAllProjects, useProjectFiltersStore } from "@/entities/project";
import { ProjectsFilter } from "@/features/projects/filter";
import { EventStatus } from "@/entities/events/model/types";
import Pagination from "@/shared/ui/pagination";
import { ProjectsList } from "@/entities/project/ui/projects-list";

type ProjectsListWithFiltersProps = {
  className?: string;
};

export const ProjectsListWithFilters = React.memo(
  (props: ProjectsListWithFiltersProps) => {
    const { className } = props;
    const filters = useProjectFiltersStore.use.filters();
    const setSearchValue = useProjectFiltersStore.use.setSearch();
    const setStatus = useProjectFiltersStore.use.setStatus();
    const setNeedActualRoles = useProjectFiltersStore.use.setNeedActualRoles();
    const setPage = useProjectFiltersStore.use.setPage();

    const { data, error, isLoading, isFetching } = useGetAllProjects({
      ...filters,
    });

    const onUpdateSearchValue = useCallback((val: string) => {
      setSearchValue(val);
    }, []);

    const onUpdateStatus = useCallback((val: EventStatus | "ALL") => {
      setStatus(val);
    }, []);

    const onPageChange = useCallback((page: number) => {
      setPage(page);
    }, []);

    const onChangeNeedActualRoles = useCallback(
      (need: boolean) => {
        console.log(need);
        setNeedActualRoles(need);
      },
      [setNeedActualRoles]
    );

    return (
      <div className={cn("flex flex-col gap-4", className)}>
        <ProjectsFilter
          filters={filters}
          onUpdateSearchValue={onUpdateSearchValue}
          onUpdateStatus={onUpdateStatus}
          onChangeNeedActualRoles={onChangeNeedActualRoles}
        />
        <ProjectsList
          skeletonCount={filters.limit}
          isLoading={isLoading || isFetching}
          projects={data?.content}
        />
        <Pagination
          className="self-center mt-4"
          onPageChange={onPageChange}
          //   todo подумать над тем чтобы при пагинации брать из кеша данные о прошлйо страинице, чтобы она не прыгала
          totalCount={data ? data.totalPages * data.size : 10}
          currentPage={filters.page ?? 1}
          pageSize={filters?.limit ?? 10}
        />
      </div>
    );
  }
);

ProjectsListWithFilters.displayName = "ProjectsListWithFilters";
