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
import {cn} from "@/shared/utils";
import Link from "next/link";
import {GitHubLogoIcon, GlobeIcon} from "@radix-ui/react-icons";
import {Badge} from "@/shared/ui/badge";

type ProjectHeaderProps = {
  project: ProjectType;
}

export const ProjectHeader: FC<ProjectHeaderProps> = ({project}) => {
  const members: Member[] = useMemo(() => project.members.map(m => ({
    name: m.login,
    link: `${ROUTES.profile}/${m.userId}`,
    avatar: m.avatar
  })), [project.members])

  console.log('project', project)

  return (
    <div className={'flex flex-row gap-4'}>
      <Box className={cn('flex flex-row gap-4', {
        'w-2/3': !!project.event,
        'w-full': !project.event,
      })}>
        <div className={'w-2/3 flex flex-col gap-3'}>
        <div className={'flex row justify-between items-center'}>
          <Typography variant={'h2'}>Проект {project.name}</Typography>
          <Typography affects={'link'}>{PROJECT_STATUS[project.status as Status]}</Typography>
        </div>
        <Typography className={'w-[80%]'}>{project.description}</Typography>
          <div>
            <Typography variant={'h3'}>Ссылки</Typography>
            <Link className={'flex items-center my-1 gap-1'} href={project.media.urlSite}>
              <GlobeIcon/>
              <Typography affects={'link'}>{project.media.urlSite}</Typography>
            </Link>
            <Link className={'flex items-center my-1 gap-1'} href={project.media.githubLink}>
              <GitHubLogoIcon/>
              <Typography affects={'link'}>{project.media.githubLink}</Typography>
            </Link>
            <Typography className={'text-[16px] my-1'} variant={'h3'}>Стек:</Typography>
            <div className={'flex flex-row gap-1'}>
              {project.media.stack.split(',').map((st, index) => (
                <Badge key={index}>{st}</Badge>
              ))}
            </div>
          </div>
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
      {project.event && <Event event={project.event}/>}
    </div>
  );
};