import { ProjectService, ProjectType } from "@/entities/project";
import { AllStatistic, StatisticService } from "@/entities/statistic";
import { TokensResponseType } from "@/entities/user/model/types";
import { MainPage } from "@/pages-composite/main-page/ui/main-page";
import { GetServerSideProps } from "next";

type Props = {
  statistic: AllStatistic;
  neededProjects: ProjectType[];
};

export const getServerSideProps = (async (context) => {
  let token: TokensResponseType | undefined = undefined;
  let headers = {};

  if (context.req.cookies.cookie_user) {
    token = JSON.parse(context.req.cookies.cookie_user) as TokensResponseType;
    headers = {
      Authorization: `${token.type} ${token.accessToken}`,
    };
  }

  try {
    const [statistic, projects] = await Promise.all([
      StatisticService.instance.getAllStatistic(),
      ProjectService.instance.getNeededProjects({
        params: {
          limit: 9,
          page: 1,
        },
        config: {
          headers,
        },
      }),
    ]);

    return {
      props: {
        statistic: statistic.data,
        neededProjects: projects.data.content,
      },
    };
  } catch (e) {
    console.log(e);
    throw e;
  }
}) satisfies GetServerSideProps<Props>;

export default function Home(props: Props) {
  return (
    <MainPage
      neededProjects={props.neededProjects}
      statistic={props.statistic}
    />
  );
}
