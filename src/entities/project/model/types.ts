import {EventType} from "@/entities/events/model/types";
import {UserType} from "@/entities/user/model/types";
import {RoleType} from "@/entities/role";

export type ProjectType = {
  id: number;
  avatar: string;
  name: string;
  description: string;
  status: string;
  event: EventType;
  members: UserType[];
  actualRoles: RoleType[]
  createDate: string;
}