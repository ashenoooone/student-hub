import {UserType} from "@/entities/user/model/types";

export type CreateRequestParamsType = {
  projectId: number;
  recipientId: number;
  type: 'INVITE' | 'REQUEST'
}

export type CreateRequestResponseType = {
  sender: Pick<UserType, "login" | 'email' | 'lastName' | 'firstName' | 'middleName'>
  recipient_id: number;
  type: string
  result: string;
}