import {Typography} from "@/shared/ui/typography";
import {Box} from "@/shared/ui/box";
import {ProjectType} from "@/entities/project";
import {FC} from "react";

type ProjectDescriptionProps = {
  project: ProjectType;
}

export const ProjectDescription: FC<ProjectDescriptionProps> = ({project}) => {
  return (
    <Box>
      <Typography variant={'h2'}>Описание</Typography>
      <Typography>{project.description}</Typography>
    </Box>
  );
};