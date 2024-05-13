import {FC} from 'react';
import {ProjectTableCard, ProjectType} from "@/entities/project";
import {Box} from "@/shared/ui/box";
import {Typography} from "@/shared/ui/typography";

type ProjectsListProps = {
  projects: ProjectType[];
}

export const ProjectsList: FC<ProjectsListProps> = (props) => {
  const {projects} = props;
  return (
    <Box>
      <Typography variant={'h2'}>Проекты</Typography>
      <div className={'grid lg:grid-cols-4 grid-cols-2 gap-4 mt-2 '}>
        {projects.map(project => (
          <ProjectTableCard key={project.id} project={project}/>))}
      </div>
    </Box>
  );
};