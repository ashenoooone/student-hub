import { EventStatus } from "@/entities/events/model/types";
import { Input } from "@/shared/ui/input";
import { Select, SelectGroupItem } from "@/shared/ui/select";
import { cn } from "@/shared/utils";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import React from "react";

type EventsFiltersProps = {
  className?: string;
};

// PLANNED
// OPEN
// COMPLETED
// ALL

const SelectGroups: SelectGroupItem<EventStatus | "ALL">[] = [
  {
    groupLabel: "Статус",
    selectItems: [
      {
        label: "Все",
        value: "ALL",
      },
      {
        label: "Завершенные",
        value: "COMPLETED",
      },
      {
        label: "Открытые",
        value: "OPEN",
      },
    ],
  },
];

export const EventsFilters = React.memo((props: EventsFiltersProps) => {
  const { className } = props;
  return (
    <div className={cn("", className)}>
      <Input
        className="w-full"
        icon={<MagnifyingGlassIcon className="w-4 h-4" />}
        inputStyles="bg-white px-9 py-7 border-0"
        placeholder="Поиск по названию"
      />
      <div className="mt-2">
        <Select
          defaultValue="ALL"
          groups={SelectGroups}
          trigger="Статус"
          className="bg-white border-none max-w-[200px]"
        />
      </div>
    </div>
  );
});

EventsFilters.displayName = "EventsFilters";
