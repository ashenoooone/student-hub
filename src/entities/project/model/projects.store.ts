import {createStore} from "zustand";
import {createSelectors} from "@/shared/utils";
import {immer} from "zustand/middleware/immer";

import {createJSONStorage, persist} from "zustand/middleware";

type ProfileStateType = {
  _hydrated: boolean;
  _setHasHydrated: (hydrated: boolean) => void;
  currentPage: number;
  roleFilter: string;
  setPage: (page: number) => void;
};

export const COOKIE_PROFILE = "cookie_profile";

const store = createStore<ProfileStateType>()(
  persist(
    immer((set) => ({
      _hydrated: false,
      _setHasHydrated: (hydrated) =>
        set((state) => ({...state, _hydrated: hydrated})),
      currentPage: 1,
      setPage: (page) => set((state) => ({...state, currentPage: page})),
      roleFilter: 'ALL',
    })),
    {
      name: COOKIE_PROFILE,
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?._setHasHydrated(true);
      },
    }
  )
);

export const useProjectsStore = createSelectors(store);
