import { Page } from "@/shared/ui/page";
import { GetServerSideProps } from "next";
import React, { FC } from "react";
import { AboutUser, UsersService } from "@/entities/user";
import { TokensResponseType, UserType } from "@/entities/user/model/types";
import { ProjectService, ProjectType } from "@/entities/project";
import { EventType } from "@/entities/events/model/types";
import { UserProfile } from "@/pages-composite/profile-page/ui/user-profile";
import { RoleService, RoleType } from "@/entities/role";

type Props = {
  profile: UserType;
  project: ProjectType[];
  events: EventType[];
  totalProjects: number;
  totalEvents: number;
  roles: RoleType[];
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

  try {
    const [profile, projects, events, roles] = await Promise.all([
      UsersService.instance.getUserData(authConfig),
      UsersService.instance.getUserProjects({
        params: {
          id: user.id,
          limit: 3,
        },
      }),
      UsersService.instance.getUserEvents({
        params: {
          id: user.id,
          limit: 3,
        },
      }),
      RoleService.instance.getAll(),
    ]);

    return {
      props: {
        profile: profile.data,
        project: projects.data.content,
        events: events.data.content,
        totalProjects: projects.data.totalItems,
        totalEvents: events.data.totalItems,
        roles: roles.data,
      },
    };
  } catch (e) {
    console.log(e);
    return {
      redirect: {
        destination: "500",
      },
    };
  }
  // @ts-ignore
}) satisfies GetServerSideProps<Props>;

const Profile: FC<Props> = (props) => {
  return (
    <Page>
      <UserProfile {...props} />
    </Page>
  );
};

export default Profile;
