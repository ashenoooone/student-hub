import { cn } from "@/shared/utils";
import React from "react";
import { AllStatistic } from "../model/types";
import { Box } from "@/shared/ui/box";
import { StatisticItem } from "./statistic-item";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shared/ui/carousel";

type StatisticProps = {
  className?: string;
  statistic?: AllStatistic;
};

export const StatisticCarousel = React.memo((props: StatisticProps) => {
  const { className, statistic } = props;

  if (!statistic) return null;

  return (
    <div className={cn("px-16", className)}>
      <Carousel>
        <CarouselContent>
          <CarouselItem className="md:basis-1/2 lg:basis-1/4">
            <StatisticItem
              className="bg-gradient-to-r from-slate-300/90 to-slate-500/90"
              icon={"👨‍🎓"}
              text={
                <>
                  пользователей в системе&nbsp;-&nbsp;
                  {statistic.statisticPeople.countPeople}
                </>
              }
            />
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/4">
            <StatisticItem
              className="bg-gradient-to-r from-slate-900/90 to-slate-700/90"
              icon={"🛠️"}
              text={
                <>
                  проектов создано за все время&nbsp;-&nbsp;
                  {statistic.statisticProject.countAllProject}
                </>
              }
            />
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/4">
            <StatisticItem
              className="bg-gradient-to-r from-cyan-500/90 to-blue-500/90"
              icon={"📊"}
              text={
                <>
                  создано проектов сегодня&nbsp;-&nbsp;
                  {statistic.statisticProject.countAllProjectToday}
                </>
              }
            />
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/4">
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
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/4">
            <StatisticItem
              className="bg-gradient-to-r from-indigo-500 to-blue-500"
              icon={"🔎"}
              text={
                <>
                  самая разыскиваемая роль&nbsp;-&nbsp;
                  {statistic.statisticHot.findRole.name}
                </>
              }
            />
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/4">
            <StatisticItem
              className="bg-gradient-to-r from-teal-400 to-yellow-200"
              icon={"👨‍💼📊"}
              text={
                <>
                  самая распространенная роль&nbsp;-&nbsp;
                  {statistic.statisticHot.topRole.name}
                </>
              }
            />
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/4">
            <StatisticItem
              className="bg-gradient-to-r from-fuchsia-500 to-cyan-500"
              icon={"🦄🔮"}
              text={
                <>
                  самая редкая роль&nbsp;-&nbsp;
                  {statistic.statisticHot.rareRole.name}
                </>
              }
            />
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
});

StatisticCarousel.displayName = "Statistic";
