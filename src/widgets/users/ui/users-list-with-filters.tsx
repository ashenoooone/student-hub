import React, {useCallback} from "react";
import {ProjectsListWithFilters} from "@/widgets/projects/ui/projects-list-with-filters";
import {PROJECTS_KEY, useGetAllProjects, useProjectFiltersStore} from "@/entities/project";
import {useUsersFiltersStore} from "@/features/users/filters/model/users-filters.store";
import {useGetFromCache} from "@/shared/utils/useGetFromCache";
import {useGetAllUsers} from "@/entities/user";
import {EventStatus} from "@/entities/events/model/types";
import Pagination from "@/shared/ui/pagination";
import {UsersFilter} from "@/features/users/filters/ui/filter";
import {RoleType} from "@/entities/role";
import UsersList from "@/widgets/users/ui/users-list";

type UsersListWithFiltersProps = {
    className?: string;
    rolesForProject: RoleType[];
};

export const UsersListWithFilters = React.memo((props: UsersListWithFiltersProps) => {
    const filters = useUsersFiltersStore.use.filters();
    const setSearchValue = useUsersFiltersStore.use.setSearch();
    const setPage = useUsersFiltersStore.use.setPage();
    const addRoles = useUsersFiltersStore.use.addRole()
    const remveRoles = useUsersFiltersStore.use.removeRole()
    const setLimit = useUsersFiltersStore.use.setLimit();

    const { data, error, isLoading, isFetching } = useGetAllUsers({
        ...filters,
    });

    const onUpdateSearchValue = useCallback((val: string) => {
        setSearchValue(val);
    }, []);

    const onPageChange = useCallback((page: number) => {
        setPage(page);
    }, []);

    const addRolesChange = useCallback((role: RoleType) => {
        addRoles(role);
    }, []);

    const removeRolesChange = useCallback((role: RoleType) => {
        remveRoles(role);
    }, []);

    return (
        <div>
            <UsersFilter
                filters={filters}
                onUpdateSearchValue={onUpdateSearchValue}
                rolesForProject={props.rolesForProject}
                addRolesChange={addRolesChange}
                removeRolesChange={removeRolesChange}
            />
            <UsersList
                content={data?.content}
            />
            <Pagination
                className="self-center mt-4"
                onPageChange={onPageChange}
                //   TODO подумать над тем чтобы при пагинации брать из кеша данные о прошлйо страинице, чтобы она не прыгала
                totalCount={(data && data.totalPages * data.size) ?? 0}
                currentPage={filters.page ?? 1}
                pageSize={filters?.limit ?? 10}
            />
        </div>
    );
});

UsersListWithFilters.displayName = "UsersListWithFilters";