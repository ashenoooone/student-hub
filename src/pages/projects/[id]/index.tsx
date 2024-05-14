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

  if (!id || !context.req.cookies.cookie_user) {
    return {
      notFound: true,
    };
  }
  const token = JSON.parse(
    context.req.cookies.cookie_user
  ) as TokensResponseType;

  const authConfig = {
    config: {
      headers: {
        Authorization: `${token.type} ${token.accessToken}`,
      },
    },
  };

  const project = await ProjectService.instance.getById(+id, authConfig);

  return {
    props: {
      project: project.data,
    },
  };
}) satisfies GetServerSideProps<Props>;

export default Projects;
