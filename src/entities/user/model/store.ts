import {createStore,} from "zustand";
import {TokensResponseType} from "@/entities/user/model/types";
import Cookies from "js-cookie";
import {createSelectors} from "@/shared/utils";

type UserStateType = {
  user: TokensResponseType | null;
  setUser: (user: TokensResponseType) => void;
}

const COOKIE_USER = 'cookie_user';

const store = createStore<UserStateType>()((set) => ({
  user: Cookies.get(COOKIE_USER) ? JSON.parse(Cookies.get(COOKIE_USER)!) as TokensResponseType : null,
  setUser: (user) => set((state) => ({...state, user}))
}))

export const useUserStore = createSelectors(store);