import { useProjectFiltersStore } from "@/entities/project";
import { UsersService } from "@/entities/user";
import { UserType } from "@/entities/user/model/types";
import { Box } from "@/shared/ui/box";
import { Page } from "@/shared/ui/page";
import { Typography } from "@/shared/ui/typography";
import { ProjectsListWithFilters } from "@/widgets/projects/ui/projects-list-with-filters";
import { GetServerSideProps } from "next";
import { useEffect } from "react";

export const getServerSideProps: GetServerSideProps = (async (context) => {
  try {
    const { id } = context.params as { id: string | number };

    if (!id) {
      return {
        notFound: true,
      };
    }

    const [profile] = await Promise.all([
      UsersService.instance.getUserById(id),
    ]);
    return {
      props: {
        user: profile.data,
        userId: +id,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}) satisfies GetServerSideProps<Props>;

type Props = {
  userId: number;
  user: UserType;
};

export default function UserProjects(props: Props) {
  const setUserId = useProjectFiltersStore.use.setUserId();

  useEffect(() => {
    setUserId(props.userId);
  }, [props.userId]);

  return (
    <Page>
      <Box className="mb-2">
        <Typography variant={"h1"}>
          Проекты пользователя {props.user.login}
        </Typography>
      </Box>
      <ProjectsListWithFilters />
    </Page>
  );
}
