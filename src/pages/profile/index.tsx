import { Page } from "@/shared/ui/page";
import { GetServerSideProps } from "next";
import React, { FC } from "react";
import { UsersService } from "@/entities/user";
import { TokensResponseType, UserType } from "@/entities/user/model/types";
import { ProjectService, ProjectType } from "@/entities/project";
import {
  Events,
  Info,
  ProfileHeader,
  ProjectList,
} from "@/pages-composite/profile-page";
import { EventType } from "@/entities/events/model/types";
import Link from "next/link";
import { Button } from "@/shared/ui/button";
import { ROUTES } from "@/shared/conts";
import { Box } from "@/shared/ui/box";
import { Typography } from "@/shared/ui/typography";

type Props = {
  profile: UserType;
  project: ProjectType[];
  events: EventType[];
};

export const getServerSideProps = (async (context) => {
  if (!context.req.cookies.cookie_user || !context.req.cookies.cookie_profile)
    return { notFound: true };

  const token = JSON.parse(
    context.req.cookies.cookie_user
  ) as TokensResponseType;

  const user = JSON.parse(context.req.cookies.cookie_profile) as UserType;

  const authConfig = {
    config: {
      headers: {
        Authorization: `${token.type} ${token.accessToken}`,
      },
    },
  };

  const [profile, projects, events] = await Promise.all([
    UsersService.instance.getUserData(authConfig),
    // TODO сделать получение проектов юзера
    ProjectService.instance.getAll({
      config: {
        ...authConfig.config,
        params: {
          page: 1,
        },
      },
    }),
    // TODO сделать получение ивентов юзера
    UsersService.instance.getUserEvents({
      params: {
        id: user.id,
        limit: 3,
      },
    }),
  ]);

  return {
    props: {
      profile: profile.data,
      project: projects.data.content,
      events: events.data.content,
    },
  };
}) satisfies GetServerSideProps<Props>;

const Profile: FC<Props> = ({ profile, project, events }) => {
  console.log(profile, project, events);
  return (
    <Page>
      <ProfileHeader profile={profile} />
      <div className={"flex flex-row gap-4 pt-5 w-full"}>
        <div className={"w-1/4 flex flex-col gap-4"}>
          <Info profile={profile} />
        </div>
        <div className={"w-3/4 flex flex-col gap-4"}>
          <Box className="flex flex-col items-center">
            {project.length > 0 ? (
              <>
                <ProjectList projects={project} />
                <Link
                  href={ROUTES.projects}
                  className="mt-4 inline-block mx-auto"
                >
                  <Button variant={"outline"}>Смотреть все проекты</Button>
                </Link>
              </>
            ) : (
              <Typography affects={"muted"}>
                Список проектов пока пуст 😔
              </Typography>
            )}
          </Box>
          <Events events={events} />
        </div>
      </div>
    </Page>
  );
};

export default Profile;
