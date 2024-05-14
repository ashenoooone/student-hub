import {FC} from "react";
import {Avatar, AvatarFallback} from "@/shared/ui/avatar";
import Image from "next/image";
import {Typography} from "@/shared/ui/typography";
import {UserType} from "@/entities/user/model/types";
import {convertUserToMember} from "@/shared/utils/mapper";


type MemberProps = {
  user: UserType;
}

export const MemberCard: FC<MemberProps> = ({user}) => {

  const member = convertUserToMember([user])[0];
  console.log(user?.rolesForProject)
  return (
    <div className={'cursor-pointer flex flex-row gap-2 items-center'}>
      <Avatar link={member.link}>
        {member.avatar ? (
          <Image src={member.avatar} alt={member.name} width={40} height={40}/>
        ) : (
          <AvatarFallback>{member.name.slice(0, 2)}</AvatarFallback>
        )}
      </Avatar>
      <Typography>{member.name}</Typography>
      {user?.rolesForProject?.length > 0 && <div>
          <Typography>{user.rolesForProject.length > 1 ? 'Роли:' : 'Роль: '} {user.rolesForProject?.map(el => el.name)?.join(', ') ?? ''}</Typography>
      </div>}
    </div>
  );
};