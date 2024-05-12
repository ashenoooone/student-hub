import { cn } from "@/shared/utils";
import React from "react";
import { AllStatistic } from "../model/types";
import { Box } from "@/shared/ui/box";
import { StatisticItem } from "./statistic-item";

type StatisticProps = {
  className?: string;
  statistic: AllStatistic;
};

export const Statistic = React.memo((props: StatisticProps) => {
  const { className, statistic } = props;
  return (
    <div className={cn("", className)}>
      <Box className="grid grid-cols-4 gap-4">
        <StatisticItem
          className="bg-gradient-to-r from-slate-300/90 to-slate-500/90"
          icon={"👨‍🎓"}
          text={`пользователей в системе - ${statistic.statisticPeople.countPeople}`}
        />
        <StatisticItem
          className="bg-gradient-to-r from-slate-900/90 to-slate-700/90"
          icon={"🛠️"}
          text={`проектов создано за все время - ${statistic.statisticProject.countAllProject}`}
        />
        <StatisticItem
          className="bg-gradient-to-r from-cyan-500/90 to-blue-500/90"
          icon={"📊"}
          text={`создано проектов сегодня - ${statistic.statisticProject.countAllProjectToday}`}
        />
        <StatisticItem
          className="bg-gradient-to-r from-rose-400/90 to-red-500/90"
          icon={"❤️"}
          text={
            <>
              проектов, где Вас ждут&nbsp;-&nbsp;
              {statistic.statisticProject.countAllProjectOpen}
            </>
          }
        />
      </Box>
    </div>
  );
});

Statistic.displayName = "Statistic";
