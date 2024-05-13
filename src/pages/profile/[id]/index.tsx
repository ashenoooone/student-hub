import { Page } from "@/shared/ui/page";
import { TokensResponseType, UserType } from "@/entities/user/model/types";
import { UsersService } from "@/entities/user";
import { ProjectService, ProjectType } from "@/entities/project";
import { EventsService } from "@/entities/events";
import { GetServerSideProps } from "next";
import { EventType } from "@/entities/events/model/types";
import {
  Events,
  Info,
  ProfileHeader,
  ProjectList,
} from "@/pages-composite/profile-page";
import React, { FC } from "react";
import { threadId } from "worker_threads";

type Props = {
  profile: UserType;
  project: ProjectType;
  events: EventType[];
};

const Profile: FC<Props> = ({ profile, project, events }) => {
  return (
    <Page>
      <ProfileHeader profile={profile} />
      <div className={"flex flex-row gap-4 pt-5 w-full"}>
        <div className={"w-1/4 flex flex-col gap-4"}>
          <Info profile={profile} />
        </div>
        <div className={"w-3/4 flex flex-col gap-4"}>
          <ProjectList projects={project} />
          <Events events={events} />
        </div>
      </div>
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
  try {
    const [profile, projects, events] = await Promise.all([
      UsersService.instance.getUserById(id, authConfig),
      ProjectService.instance.getAll({
        config: {
          ...authConfig.config,
          params: {
            page: 1,
          },
        },
      }),
      EventsService.instance.getAll(),
    ]);
    return {
      props: {
        profile: profile.data,
        project: projects.data[0],
        events: events.data.content.slice(0, 4),
      },
    };
  } catch (error) {
    throw error;
  }
}) satisfies GetServerSideProps<Props>;

export default Profile;
