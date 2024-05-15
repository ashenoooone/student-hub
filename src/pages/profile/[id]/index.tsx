import { Page } from "@/shared/ui/page";
import { TokensResponseType, UserType } from "@/entities/user/model/types";
import { UsersService } from "@/entities/user";
import { ProjectService, ProjectType } from "@/entities/project";
import { EventsService } from "@/entities/events";
import { GetServerSideProps } from "next";
import { EventType } from "@/entities/events/model/types";

import React, { FC } from "react";
import { ROUTES } from "@/shared/conts";
import { UserProfile } from "@/pages-composite/profile-page/ui/user-profile";

type Props = {
  profile: UserType;
  project: ProjectType[];
  events: EventType[];
  totalProjects: number;
  totalEvents: number;
};

const Profile: FC<Props> = (props) => {
  return (
    <Page>
      <UserProfile {...props} />
    </Page>
  );
};

export const getServerSideProps = (async (context) => {
  try {
    const { id } = context.params as { id: string | number };
    if (context.req.cookies.cookie_profile) {
      const userProfile = JSON.parse(
        context.req.cookies.cookie_profile
      ) as UserType;
      if (userProfile && userProfile.id === +id) {
        return {
          redirect: {
            destination: ROUTES.profile,
          },
        };
      }
    }

    if (!id) {
      return {
        notFound: true,
      };
    }

    const [profile, projects, events] = await Promise.all([
      UsersService.instance.getUserById(id),
      UsersService.instance.getUserProjects({
        params: {
          id: +id,
          limit: 3,
        },
      }),
      UsersService.instance.getUserEvents({
        params: {
          id: +id,
          limit: 3,
        },
      }),
    ]);
    return {
      props: {
        profile: profile.data,
        project: projects.data.content,
        events: events.data.content,
        totalProjects: projects.data.totalItems,
        totalEvents: events.data.totalItems,
      },
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
  // todo пофиксить
  // @ts-ignore
}) satisfies GetServerSideProps<Props>;

export default Profile;
