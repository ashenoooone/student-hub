import { createStore } from "zustand";
import { createSelectors } from "@/shared/utils";
import { immer } from "zustand/middleware/immer";
import { GetAllProjectsParams } from "./types";
import { EventStatus } from "@/entities/events/model/types";

type ProjectFiltersStateType = {
  filters: GetAllProjectsParams;
  setPage: (page: number) => void;
  setSearch: (search: string | undefined) => void;
  setStatus: (status: EventStatus | "ALL") => void;
  setNeedActualRoles: (needActualRoles: boolean) => void;
};

export const COOKIE_PROFILE = "cookie_profile";

const store = createStore<ProjectFiltersStateType>()(
  immer((set) => ({
    setStatus: (status) =>
      set((state) => {
        state.filters.status = status;
      }),
    filters: {
      page: 1,
      limit: 6,
      search: "",
      status: "ALL",
      needActualRoles: false,
    },
    setPage: (page) =>
      set((state) => {
        state.filters.page = page;
      }),
    setSearch: (search) =>
      set((state) => {
        state.filters.search = search;
      }),
    setNeedActualRoles: (needActualRoles) =>
      set((state) => {
        state.filters.needActualRoles = needActualRoles;
      }),
  }))
);

export const useProjectFiltersStore = createSelectors(store);
