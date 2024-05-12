import { createStore } from "zustand";
import { TokensResponseType, UserType } from "@/entities/user/model/types";
import Cookies from "js-cookie";
import { createSelectors } from "@/shared/utils";
import { immer } from "zustand/middleware/immer";

type UserStateType = {
  user: TokensResponseType | null;
  setUser: (user: TokensResponseType) => void;
  removeUser: () => void;
};

export const COOKIE_USER = "cookie_user";

const store = createStore<UserStateType>()(
  immer((set) => ({
    user: Cookies.get(COOKIE_USER)
      ? (JSON.parse(Cookies.get(COOKIE_USER)!) as TokensResponseType)
      : null,
    setUser: (user) =>
      set((state) => {
        Cookies.set(COOKIE_USER, JSON.stringify(user));
        return { ...state, user };
      }),
    removeUser: () =>
      set((state) => {
        Cookies.remove(COOKIE_USER);
        state.user = null;
      }),
  }))
);

export const useUserStore = createSelectors(store);
