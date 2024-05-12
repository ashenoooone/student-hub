import { EventsList, useGetAllEvents } from "@/entities/events";
import { EventStatus, EventType } from "@/entities/events/model/types";
import {
  EventsFilters,
  useEventsFiltersStore,
} from "@/features/events/filters";
import Pagination from "@/shared/ui/pagination";
import { cn } from "@/shared/utils";
import React, { useCallback } from "react";

type EventsListWithFiltersProps = {
  className?: string;
};

const events = [
  {
    id: 10,
    avatar: null,
    name: "Разработка нового модуля CRM-системы",
    description:
      "Разработка и внедрение нового модуля для CRM-системы, который позволит автоматизировать процессы управления клиентскими отношениями.",
    startDate: "2024-08-01T10:00:00",
    endDate: "2024-08-15T10:00:00",
    status: "PLANNED",
    membersCount: null,
  },
  {
    id: 9,
    avatar: null,
    name: "Оптимизация алгоритмов обработки данных",
    description:
      "Исследование и оптимизация алгоритмов обработки больших объемов данных для повышения производительности и эффективности работы приложения.",
    startDate: "2024-07-15T08:00:00",
    endDate: "2024-07-30T08:00:00",
    status: "PLANNED",
    membersCount: null,
  },
  {
    id: 8,
    avatar: null,
    name: "Аудит безопасности веб-приложения",
    description:
      "Проведение аудита безопасности веб-приложения с целью выявления потенциальных уязвимостей и обеспечения защиты данных пользователей.",
    startDate: "2024-07-01T09:00:00",
    endDate: "2024-07-10T09:00:00",
    status: "PLANNED",
    membersCount: null,
  },
  {
    id: 7,
    avatar: null,
    name: "Обновление интерфейса мобильного приложения",
    description:
      "Обновление дизайна и функциональности мобильного приложения для повышения удобства использования и привлечения новых пользователей.",
    startDate: "2024-06-10T08:00:00",
    endDate: "2024-06-20T08:00:00",
    status: "PLANNED",
    membersCount: null,
  },
  {
    id: 6,
    avatar: null,
    name: "Подготовка и проведение хакатона",
    description:
      "Организация хакатона для разработчиков, целью которого является создание инновационных проектов в области программного обеспечения за ограниченный период времени.",
    startDate: "2024-06-01T12:00:00",
    endDate: "2024-06-03T12:00:00",
    status: "PLANNED",
    membersCount: null,
  },
  {
    id: 5,
    avatar: null,
    name: "Проведение онлайн-курса по Python",
    description:
      "Серия онлайн-занятий по изучению языка программирования Python с нуля. Курс включает в себя основы языка, а также практические задания и проекты.",
    startDate: "2024-05-15T10:00:00",
    endDate: "2024-06-30T10:00:00",
    status: "PLANNED",
    membersCount: null,
  },
  {
    id: 4,
    avatar: null,
    name: "Разработка новой веб-платформы",
    description:
      "Проект по созданию современной веб-платформы для управления бизнес-процессами. Включает в себя разработку фронтенда, бэкенда и базы данных.",
    startDate: "2024-05-12T08:43:48.103",
    endDate: "2024-05-20T08:43:48.103",
    status: "PLANNED",
    membersCount: null,
  },
  {
    id: 1,
    avatar: null,
    name: "string",
    description: "string",
    startDate: "2024-05-11T12:14:27.35",
    endDate: "2024-05-11T12:14:27.35",
    status: "OPEN",
    membersCount: null,
  },
  {
    id: 2,
    avatar: null,
    name: "Меропритие№2",
    description:
      "Акселерационная программа «Фабрика идей: «БАС-Пром» на базе СГТУ имени Гагарина Ю.А.",
    startDate: "2024-05-11T12:14:27.35",
    endDate: "2024-05-11T12:14:27.35",
    status: "OPEN",
    membersCount: null,
  },
  {
    id: 3,
    avatar: null,
    name: "Воркшоп «Развитие малых инновационных предприятий как формы инновационного предпринимательства»",
    description:
      "В рамках мероприятия состоится обсуждение способов создания и развития малых инновационных предприятий. Вместе со спикером студенты узнают, как использовать малое инновационное предприятие в предпринимательских целях.\n\n\n*Воркшоп — инструмент для обмена знаниями, развития навыков и укрепления командного духа. Если вы хотите научиться эффективно использовать воркшопы для достижения своих целей и улучшения процессов в работе или бизнесе, прочитайте статью.",
    startDate: "2024-05-04T12:14:27.35",
    endDate: "2024-05-15T12:14:27.35",
    status: "COMPLETED",
    membersCount: null,
  },
];

export const EventsListWithFilters = React.memo(
  (props: EventsListWithFiltersProps) => {
    const { className } = props;

    const filters = useEventsFiltersStore.use.filters();
    const eventsFiltersChangePage = useEventsFiltersStore.use.setPage();

    const { data, isLoading, error, isFetching } = useGetAllEvents({
      ...filters,
    });

    const onPageChange = useCallback(
      (page: number) => {
        eventsFiltersChangePage(page);
      },
      [eventsFiltersChangePage]
    );

    const onSearchChange = useCallback((value: string) => {}, []);

    const onStatusChange = useCallback((status: EventStatus | "ALL") => {}, []);

    // TODO обработка ошибок

    return (
      <div className={cn("flex flex-col gap-4", className)}>
        <EventsFilters
          status={filters.status}
          onChangeSearch={onSearchChange}
          onChangeStatus={onStatusChange}
        />
        <EventsList
          skeletonCount={filters.limit}
          isLoading={isLoading || isFetching}
          events={data}
        />
        <Pagination
          className="self-center mt-4"
          onPageChange={onPageChange}
          // TODO добавить общее количество событий
          totalCount={10000}
          currentPage={filters.page ?? 1}
          pageSize={10}
        />
      </div>
    );
  }
);

EventsListWithFilters.displayName = "EventsListWithFilters";
