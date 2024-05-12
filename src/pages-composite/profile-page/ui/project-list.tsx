import {Box} from "@/shared/ui/box";
import {Typography} from "@/shared/ui/typography";
import {ProjectCard} from "@/entities/project/ui/project-card";
import {ProjectType} from "@/entities/project";
import {FC} from "react";
import {ROUTES} from "@/shared/conts";
import Link from "next/link";
import {Button} from "@/shared/ui/button";

type ProjectListProps = {
  project: ProjectType;
}

export const ProjectList: FC<ProjectListProps> = ({project}) => {
  return (
    <Box className={'w-full'}>
      <Typography
        className={'mb-4'}
        variant={'h3'}
      >
        Проекты
      </Typography>
      <div className={'flex flex-col gap-3 mb-1'}>
        <ProjectCard project={project}/>
      </div>
      <Link href={ROUTES.projects}>
        <Button className={'text-primary text-[12px]'} variant={'ghost'}>Смотреть все проекты</Button>
      </Link>
    </Box>
  );
};