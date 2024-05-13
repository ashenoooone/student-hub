import { Typography } from "@/shared/ui/typography";
import { ProjectCard } from "@/entities/project/ui/project-card";
import { ProjectType } from "@/entities/project";
import { FC } from "react";
import { Button } from "@/shared/ui/button";
import { Box } from "@/shared/ui/box";

type ProjectListProps = {
  projects: ProjectType[];
  totalProjects: number;
};

export const ProjectList: FC<ProjectListProps> = ({
  projects,
  totalProjects,
}) => {
  return (
    <Box>
      <Typography className={"mb-4"} variant={"h3"}>
        Проекты
      </Typography>
      <div className={"flex flex-col mb-1"}>
        {projects.length > 0 ? (
          <>
            {projects.map((p) => (
              <ProjectCard project={p} key={p.id} />
            ))}
            {totalProjects > projects.length && (
              <Button variant={"outline"} className="mt-5 w-max mx-auto">
                Смотреть все проекты
              </Button>
            )}
          </>
        ) : (
          <Typography affects={"muted"}>
            Список проектов пока пуст 😔
          </Typography>
        )}
      </div>
    </Box>
  );
};