import { AllStatistic, StatisticService } from "@/entities/statistic";
import { MainPage } from "@/pages-composite/main-page/ui/main-page";
import { GetServerSideProps } from "next";

type Props = {
  statistic: AllStatistic;
};

export const getServerSideProps = (async (context) => {
  try {
    const [statistic] = await Promise.all([
      StatisticService.instance.getAllStatistic(),
    ]);

    return {
      props: {
        statistic: statistic.data,
      },
    };
  } catch (e) {
    console.log(e);
    throw e;
  }
}) satisfies GetServerSideProps<Props>;

export default function Home(props: Props) {
  return <MainPage statistic={props.statistic} />;
}
