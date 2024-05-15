import { Page } from "@/shared/ui/page";
import { FC } from "react";
import { ProjectService, ProjectType } from "@/entities/project";
import { GetServerSideProps } from "next";
import { TokensResponseType } from "@/entities/user/model/types";
import { Typography } from "@/shared/ui/typography";
import { Box } from "@/shared/ui/box";
import {
  CommentsSections,
  ProjectHeader,
} from "@/pages-composite/projects-page";
import { Commands } from "@/pages-composite/projects-page/ui/commands";

type Props = {
  project: ProjectType;
};

const Projects: FC<Props> = ({ project }) => {
  console.log(project);
  return (
    <Page className={"gap-4"}>
      <ProjectHeader project={project} />
      <Commands project={project} />
      {project.actualRoles.length > 0 && (
        <Box>
          <Typography variant={"h2"}>Свободные места</Typography>
          {project.actualRoles.map((role) => (
            <Typography affects={"lead"} key={role.id}>
              {role.name}
            </Typography>
          ))}
        </Box>
      )}
      <CommentsSections project={project} />
    </Page>
  );
};

export const getServerSideProps = (async (context) => {
  const { id } = context.params as { id: string | number };

  if (!id) {
    return {
      notFound: true,
    };
  }

  const project = await ProjectService.instance.getById(+id);

  return {
    props: {
      project: project.data,
    },
  };
}) satisfies GetServerSideProps<Props>;

export default Projects;
