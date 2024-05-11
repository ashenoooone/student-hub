import { EventsList } from "@/entities/events";
import { EventsFilters } from "@/features/events/filters";
import { cn } from "@/shared/utils";
import React from "react";

type EventsListWithFiltersProps = {
  className?: string;
};

export const EventsListWithFilters = React.memo(
  (props: EventsListWithFiltersProps) => {
    const { className } = props;
    return (
      <div className={cn("flex flex-col gap-4", className)}>
        <EventsFilters />
        <EventsList
          events={[
            {
              id: 1,
              avatar: null,
              name: "string",
              description: "string",
              startDate: "2024-05-11T12:14:27.35",
              endDate: "2024-05-11T12:14:27.35",
              status: "OPEN",
              membersCount: 12,
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
              membersCount: 12,
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
              membersCount: 12,
            },
          ]}
        />
      </div>
    );
  }
);

EventsListWithFilters.displayName = "EventsListWithFilters";
