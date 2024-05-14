import {ProjectType} from "@/entities/project";
import React, {FC, useMemo} from "react";
import {Box} from "@/shared/ui/box";
import {Typography} from "@/shared/ui/typography";
import {PROJECT_STATUS, ROUTES, Status} from "@/shared/conts";
import {Avatar, AvatarFallback} from "@/shared/ui/avatar";
import {Member, MembersList} from "@/shared/ui/members";
import Image from 'next/image';
import {SendRequest} from "@/features/projects/send-request";
import {Event} from "@/pages-composite/projects-page";

type ProjectHeaderProps = {
  project: ProjectType;
}

export const ProjectHeader: FC<ProjectHeaderProps> = ({project}) => {
  const members: Member[] = useMemo(() => project.members.map(m => ({
    name: m.login,
    link: `${ROUTES.profile}/${m.userId}`,
    avatar: m.avatar
  })), [project.members])

  console.log('events', project.event)

  return (
    <div className={'flex flex-row gap-4'}>
      <Box className={'flex flex-row gap-4 w-2/3'}>
        <div className={'w-2/3 flex flex-col gap-3'}>
        <div className={'flex row justify-between items-center'}>
          <Typography variant={'h2'}>Проект {project.name}</Typography>
          <Typography affects={'link'}>{PROJECT_STATUS[project.status as Status]}</Typography>
        </div>
        <Typography className={'w-[80%]'}>{project.description}</Typography>
        <SendRequest project={project}/>
      </div>
        <div className={'w-1/3 flex flex-col gap-3'}>
        <Avatar className={'w-full min-h-[300px] !rounded-[12px]'}>
          {project.avatar ?
            <Image className={'!rounded-[12px] w-full object-cover'} src={project.avatar} alt={project.name} width={1000} height={1000}/> :
            <AvatarFallback className={'!rounded-[12px]'}>{project.name}</AvatarFallback>}
        </Avatar>
        <div className={'flex gap-2 items-center'}>
          <Typography affects={'small'}>Команда:</Typography>
          <MembersList members={members} totalMembers={project.members.length}/>
        </div>
      </div>
    </Box>
      <Event event={project.event}/>
    </div>
  );
};