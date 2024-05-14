import {Avatar, AvatarFallback} from "@/shared/ui/avatar";
import {PROJECT_STATUS, ROUTES, Status} from "@/shared/conts";
import Image from "next/image";
import {Typography} from "@/shared/ui/typography";
import {ProjectType} from "@/entities/project";
import {FC} from "react";
import {MembersList} from "@/shared/ui/members";
import {convertUserToMember} from "@/shared/utils/mapper";
import {Box} from "@/shared/ui/box";
import {Badge} from "@/shared/ui/badge";
import Link from "next/link";

type ProjectTableCardProps = {
  project: ProjectType;
}

export const ProjectTableCard: FC<ProjectTableCardProps> = ({project}) => {
  return (
    <Box key={project.id} className={'flex flex-row items-stretch gap-4'}>
      <div className={'w-1/2 flex flex-col gap-3'}>
        <Avatar className={'w-full !rounded-[12px] min-w-[205px] min-h-[245px] cursor-pointer'}
              link={`${ROUTES.projects}/${project.id}`}>
          {project.avatar ?
            <Image className={'!rounded-[12px] w-full object-cover'} src={project.avatar} alt={project.name} width={800}
                   height={800}/> :
          <AvatarFallback className={'!rounded-[12px]'}>{project.name}</AvatarFallback>
        }
      </Avatar>
        {project.actualRoles.length > 0 ? <div className={'flex flex-col gap-3'}>
          <Typography>Проекту требуется:</Typography>
          <div className={'flex flex-row gap-1'}>
            {project.actualRoles.slice(0, 3).map((role, index) => (
              <Badge className={'w-max max-w-[83px] text-ellipsis hover:bg-blue-400'} key={index}>{role.name}</Badge>
            ))}
            {project.actualRoles.length > 3 && <Badge className={'w-max hover:bg-blue-400'}>...</Badge>}
          </div>
        </div> : (
          <div className={'flex flex-col gap-2'}>
            <Typography affects={'small'}>Проекту требуется:</Typography>
            <Typography className={'text-[12px]'} affects={'muted'}>Роли отсутствуют</Typography>
          </div>
        )}
      </div>
      <div className={'w-1/2 flex flex-col gap-2'}>
        <Link href={`${ROUTES.projects}/${project.id}`}>
        <Typography
          variant={'h3'}
          affects={'large'}
          className={'underline underline-offset-2 text-2xl'}
        >{project.name}</Typography>
        </Link>
        <Typography affects={'link'}>{PROJECT_STATUS[project.status as Status]}</Typography>
        <Typography>{project.description}</Typography>
        <Typography affects={'large'} className={'text-sm mt-auto'}>Количество
          участников: {project.members.length}</Typography>
        <MembersList members={convertUserToMember(project.members)} totalMembers={project.members.length}/>
      </div>
    </Box>
  );
};