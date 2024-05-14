import {UserType} from "@/entities/user/model/types";
import {Member} from "@/shared/ui/members";
import {ROUTES} from "@/shared/conts";

export const convertUserToMember = (users: UserType[]): Member[] => users.map(u => ({
  name: u.login,
  link: `${ROUTES.profile}/${u.userId}`,
  avatar: u.avatar
}))