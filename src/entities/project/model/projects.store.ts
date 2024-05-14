import {createStore} from "zustand";
import {createSelectors} from "@/shared/utils";
import {immer} from "zustand/middleware/immer";

type ProfileStateType = {
  currentPage: number;
  roleFilter: string;
  setPage: (page: number) => void;
  search: string | undefined;
  setSearch: (search: string | undefined) => void;
};

export const COOKIE_PROFILE = "cookie_profile";

const store = createStore<ProfileStateType>()(
    immer((set) => ({
      currentPage: 1,
      setPage: (page) => set((state) => ({...state, currentPage: page})),
      roleFilter: 'ALL',
      search: undefined,
      setSearch: search => set((state) => ({...state, search}))
    })),
);

export const useProjectsStore = createSelectors(store);
