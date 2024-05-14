import {UserType} from "@/entities/user/model/types";
import {ProjectType} from "@/entities/project";


export type NotificationType = {
  id: number;
  sender: Pick<UserType, 'login' | 'email' | 'lastName' | 'firstName' | 'middleName' | 'avatar' | 'userId'>;
  recipient_id: number;
  project_id: number;
  project: ProjectType;
  type: 'REQUEST';
  result: 'ACCEPTED' | 'WAIT';
  createdAt: string;
}

export type NotificationParamsType = {
  params: {
    requestResultIn: 'REFUSED' | 'ACEEPTED' | 'WAIT'
  }
}