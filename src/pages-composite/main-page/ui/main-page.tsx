import { Statistic } from "@/entities/statistic";
import { Page } from "@/shared/ui/page";
import { cn } from "@/shared/utils";
import React from "react";

const st = {
  statisticPeople: {
    countPeople: 2,
  },
  statisticProject: {
    countAllProject: 4,
    countAllProjectToday: 3,
    countAllProjectPlanned: 4,
    countAllProjectOpen: 0,
    countAllProjectComleted: 0,
  },
  lastCreatedProjects: [
    {
      id: 7,
      avatar: null,
      name: "test",
      description: "string",
      status: "PLANNED",
    },
    {
      id: 8,
      avatar: null,
      name: "test2",
      description: "string",
      status: "PLANNED",
    },
    {
      id: 6,
      avatar: null,
      name: "STUDENT HUB",
      description: "наш проект",
      status: "PLANNED",
    },
    {
      id: 5,
      avatar: null,
      name: "Кошки-мышки сервис",
      description: "Сервис должен помогать мышкам съесть кошек",
      status: "PLANNED",
    },
  ],
  topEvent: {
    id: 8,
    avatar: null,
    name: "Аудит безопасности веб-приложения",
    description:
      "Проведение аудита безопасности веб-приложения с целью выявления потенциальных уязвимостей и обеспечения защиты данных пользователей.",
    startDate: "2024-07-01T09:00:00",
    endDate: "2024-07-10T09:00:00",
    status: "PLANNED",
    membersCount: 2,
  },
  topRole: { name: "Frontend разработчик", count: 499 },
  rareRole: { name: "Backend разработчик", count: 20 },
  findRole: { name: "Верстальщик", count: 120 },
};

type MainPageProps = {
  className?: string;
};

export const MainPage = React.memo((props: MainPageProps) => {
  const { className } = props;
  return (
    <Page className={cn("", className)}>
      <Statistic statistic={st} />
    </Page>
  );
});

MainPage.displayName = "MainPage";
