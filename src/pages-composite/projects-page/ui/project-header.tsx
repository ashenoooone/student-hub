import {ProjectType} from "@/entities/project";
import React, {FC, useMemo} from "react";
import {Box} from "@/shared/ui/box";
import {Typography} from "@/shared/ui/typography";
import {PROJECT_STATUS, ROUTES, Status} from "@/shared/conts";
import {Avatar, AvatarFallback} from "@/shared/ui/avatar";
import {Member, MembersList} from "@/shared/ui/members";
import Image from 'next/image';
import {SendRequest} from "@/features/projects/send-request";

type ProjectHeaderProps = {
  project: ProjectType;
}

export const ProjectHeader: FC<ProjectHeaderProps> = ({project}) => {
  const members: Member[] = useMemo(() => project.members.map(m => ({
    name: m.login,
    link: `${ROUTES.profile}/${m.userId}`,
    avatar: m.avatar
  })), [project.members])

  return (
    <Box className={'flex flex-row gap-4'}>
      <div className={'w-1/2 flex flex-col gap-3'}>
        <Typography variant={'h2'}>Проект {project.name}</Typography>
        <Typography>{PROJECT_STATUS[project.status as Status]}</Typography>
        <SendRequest project={project}/>
      </div>
      <div className={'w-1/2 flex flex-col gap-3'}>
        <Avatar className={'w-full min-h-[300px] !rounded-[12px]'}>
          {project.avatar ?
            <Image className={'!rounded-[12px] w-full object-cover'} src={project.avatar} alt={project.name} width={100} height={100}/> :
            <AvatarFallback className={'!rounded-[12px]'}>{project.name}</AvatarFallback>}
        </Avatar>
        <div className={'flex gap-2 items-center'}>
          <Typography affects={'small'}>Команда:</Typography>
          <MembersList members={members} totalMembers={project.members.length}/>
        </div>
      </div>
    </Box>
  );
};