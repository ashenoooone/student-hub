import { createStore } from "zustand";
import { TokensResponseType, UserType } from "@/entities/user/model/types";
import Cookies from "js-cookie";
import { createSelectors } from "@/shared/utils";

type UserStateType = {
  user: TokensResponseType | null;
  profile: UserType | null;
  setUser: (user: TokensResponseType) => void;
  setProfile: (profile: UserType) => void;
};

export const COOKIE_USER = "cookie_user";
const COOKIE_PROFILE = "cookie_profile";

const store = createStore<UserStateType>()((set) => ({
  user: Cookies.get(COOKIE_USER)
    ? (JSON.parse(Cookies.get(COOKIE_USER)!) as TokensResponseType)
    : null,
  setUser: (user) =>
    set((state) => {
      Cookies.set(COOKIE_USER, JSON.stringify(user));
      return { ...state, user };
    }),
  profile: Cookies.get(COOKIE_PROFILE)
    ? (JSON.parse(Cookies.get(COOKIE_PROFILE)!) as UserType)
    : null,
  setProfile: (profile) =>
    set((state) => {
      Cookies.set(COOKIE_PROFILE, JSON.stringify(profile));
      return { ...state, profile };
    }),
}));

export const useUserStore = createSelectors(store);
