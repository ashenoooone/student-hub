import {Avatar, AvatarFallback} from "@/shared/ui/avatar";
import {ROUTES} from "@/shared/conts";
import Image from "next/image";
import {Typography} from "@/shared/ui/typography";
import {formatToRussianDate} from "@/shared/utils";
import {ProjectType} from "@/entities/project";
import {FC} from "react";

type ProjectTableCardProps = {
  project: ProjectType;
}

export const ProjectTableCard: FC<ProjectTableCardProps> = ({project}) => {
  return (
    <div key={project.id} className={'flex flex-col gap-3'}>
      <Avatar className={'w-full !rounded-[12px] min-h-[240px] cursor-pointer'}
              link={`${ROUTES.projects}/${project.id}`}>
        {project.avatar ? <Image className={'!rounded-[12px]'} src={project.avatar} alt={project.name} width={200} height={200}/> :
          <AvatarFallback className={'!rounded-[12px]'}>{project.name}</AvatarFallback>
        }
      </Avatar>
      <div className={'px-2'}>
        <Typography className={'mt-1'}>{project.name}</Typography>
        <Typography>{project.description}</Typography>
      </div>
      <div>
        <Typography affects={'muted'}>{formatToRussianDate(project.createDate, true)}</Typography>
      </div>
    </div>
  );
};