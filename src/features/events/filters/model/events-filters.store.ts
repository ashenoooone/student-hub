import { createStore } from "zustand";
import { createSelectors } from "@/shared/utils";
import { immer } from "zustand/middleware/immer";
import { EventStatus, GetAllEventsParams } from "@/entities/events/model/types";

type EventsFiltersStoreType = {
  filters: GetAllEventsParams;
  setStatus: (status: EventStatus | "ALL") => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
};

const store = createStore<EventsFiltersStoreType>()(
  immer((set) => ({
    setLimit: (limit) =>
      set((state) => {
        state.filters.limit = limit;
      }),
    setPage: (page) =>
      set((state) => {
        state.filters.page = page;
      }),
    setStatus: (status) =>
      set((state) => {
        state.filters.status = status;
      }),
    filters: {
      status: "ALL",
      page: 1,
      limit: 12,
    },
  }))
);

export const useEventsFiltersStore = createSelectors(store);
