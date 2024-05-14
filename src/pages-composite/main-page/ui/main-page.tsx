import { AllStatistic, StatisticCarousel } from "@/entities/statistic";
import { Page } from "@/shared/ui/page";
import { cn } from "@/shared/utils";
import React from "react";
import { AboutUs } from "./about-us";
import { Typography } from "@/shared/ui/typography";
import { Box } from "@/shared/ui/box";
import { ProjectType, ProjectsCarousel } from "@/entities/project";

type MainPageProps = {
  className?: string;
  statistic?: AllStatistic;
  neededProjects?: ProjectType[];
};

export const MainPage = React.memo((props: MainPageProps) => {
  const { className, statistic, neededProjects } = props;
  console.log(statistic);

  return (
    <Page className={cn("flex flex-col gap-8", className)}>
      {neededProjects && neededProjects.length > 0 && (
        <Box>
          <Typography variant={"h3"} className="mb-4 text-center">
            Проекты, в которых Вас ждут 🔍 💼 🎉
          </Typography>
          <ProjectsCarousel projects={neededProjects} />
        </Box>
      )}
      <AboutUs topEvent={statistic?.statisticHot.topEvent} />
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
