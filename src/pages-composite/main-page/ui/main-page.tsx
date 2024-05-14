import { AllStatistic, StatisticCarousel } from "@/entities/statistic";
import { Page } from "@/shared/ui/page";
import { cn } from "@/shared/utils";
import React from "react";
import { AboutUs } from "./about-us";
import { Typography } from "@/shared/ui/typography";
import { Box } from "@/shared/ui/box";

type MainPageProps = {
  className?: string;
  statistic?: AllStatistic;
};

export const MainPage = React.memo((props: MainPageProps) => {
  const { className, statistic } = props;
  return (
    <Page className={cn("flex flex-col gap-8", className)}>
      <AboutUs />
      <Box>
        <Typography variant={"h2"} className="text-3xl mb-4 font-semibold">
          Немного статистики
        </Typography>
        <StatisticCarousel statistic={statistic} />
      </Box>
    </Page>
  );
});

MainPage.displayName = "MainPage";
