import { createStore } from "zustand";
import { createSelectors } from "@/shared/utils";
import { immer } from "zustand/middleware/immer";
import {GetAllUsersParams} from "@/entities/user/model/types";
import {RoleType} from "@/entities/role";


type UsersFiltersStoreType = {
    filters: GetAllUsersParams;
    setPage: (page: number) => void;
    setLimit: (limit: number) => void;
    setSearch: (search: string) => void;
    addRole: (role: RoleType) => void;
    removeRole: (role: RoleType) => void;
};

const store = createStore<UsersFiltersStoreType>()(
    immer((set) => ({
        setLimit: (limit) =>
            set((state) => {
                state.filters.limit = limit;
            }),
        setPage: (page) =>
            set((state) => {
                state.filters.page = page;
            }),
        setSearch: (search) =>
            set((state) => {
                state.filters.search = search.toLowerCase();
            }),
        addRole: (role) =>
            set((state) => {
                state.filters.roles.push(role)
            }),
        removeRole: (role) =>
            set((state) => {
                state.filters.roles = state.filters.roles.filter(item => item.id !== role.id)
            }),
        filters: {
            page: 1,
            limit: 12,
            search: null,
            roles: [],
        },
    }))
);

export const useUsersFiltersStore = createSelectors(store);
