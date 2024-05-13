import { Box } from "@/shared/ui/box";
import { Typography } from "@/shared/ui/typography";
import { ProjectCard } from "@/entities/project/ui/project-card";
import { ProjectType } from "@/entities/project";
import { FC } from "react";

type ProjectListProps = {
  projects: ProjectType[];
};

export const ProjectList: FC<ProjectListProps> = ({ projects }) => {
  return (
    <div className={"w-full"}>
      <Typography className={"mb-4"} variant={"h3"}>
        Проекты
      </Typography>
      <div className={"flex flex-col mb-1"}>
        {projects.length > 0 &&
          projects.map((p) => <ProjectCard project={p} key={p.id} />)}
      </div>
    </div>
  );
};
