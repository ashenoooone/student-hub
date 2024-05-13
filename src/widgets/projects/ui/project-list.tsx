import {Box} from "@/shared/ui/box";
import {Typography} from "@/shared/ui/typography";
import {ProjectCard} from "@/entities/project/ui/project-card";
import {ProjectType} from "@/entities/project";
import {FC} from "react";
import {Skeleton} from "@/shared/ui/skeleton";
import Link from "next/link";
import {ROUTES} from "@/shared/conts";

type ProjectListProps = {
  projects: ProjectType[];
  isLoading?: boolean;
};

export const ProjectList: FC<ProjectListProps> = ({projects, isLoading}) => {

  return (
    <div className={"w-full"}>
      <Typography className={"mb-4"} variant={"h3"}>
        Проекты
      </Typography>
      <div className={"flex gap-3 flex-col mb-1"}>
        {!isLoading && projects.length > 0 &&
          projects.map((p) => <ProjectCard project={p} key={p.id} />)}
        {isLoading && Array.from({length: 5}).map((_, index) => (
          <Box key={index}><Skeleton className={'h-[132px]'}/></Box>
        ))}
      </div>
    </div>
  );
};
