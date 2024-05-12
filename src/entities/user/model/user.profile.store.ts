import { createStore } from "zustand";
import { UserType } from "@/entities/user/model/types";
import Cookies from "js-cookie";
import { createSelectors } from "@/shared/utils";
import { immer } from "zustand/middleware/immer";

import { persist, createJSONStorage } from "zustand/middleware";
type ProfileStateType = {
  _hydrated: boolean;
  _setHasHydrated: (hydrated: boolean) => void;
  profile: UserType | null;
  setProfile: (profile: UserType) => void;
  removeProfile: () => void;
};

export const COOKIE_PROFILE = "cookie_profile";

const store = createStore<ProfileStateType>()(
  persist(
    immer((set) => ({
      _hydrated: false,
      _setHasHydrated: (hydrated) =>
        set((state) => ({ ...state, _hydrated: hydrated })),
      profile: Cookies.get(COOKIE_PROFILE)
        ? (JSON.parse(Cookies.get(COOKIE_PROFILE)!) as UserType)
        : null,
      setProfile: (profile) =>
        set((state) => {
          return { ...state, profile };
        }),
      removeProfile: () =>
        set((state) => {
          state.profile = null;
        }),
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

export const useUserProfileStore = createSelectors(store);
