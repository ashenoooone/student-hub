import { AllStatistic, StatisticCarousel } from "@/entities/statistic";
import { Page } from "@/shared/ui/page";
import { cn } from "@/shared/utils";
import React from "react";

type MainPageProps = {
  className?: string;
  statistic?: AllStatistic;
};

export const MainPage = React.memo((props: MainPageProps) => {
  const { className, statistic } = props;
  return (
    <Page className={cn("", className)}>
      <StatisticCarousel statistic={statistic} />
    </Page>
  );
});

MainPage.displayName = "MainPage";
