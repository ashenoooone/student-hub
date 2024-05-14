import { Box } from "@/shared/ui/box";
import { useRolesFroProject } from "@/entities/role";
import { Input } from "@/shared/ui/input";
import { ChangeEventHandler, useEffect, useState } from "react";
import { useDebounce } from "@/shared/utils/useDebaunce";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import {
  GetAllProjectsParams,
  useProjectFiltersStore,
} from "@/entities/project";
import { Select, SelectGroupItem } from "@/shared/ui/select";
import { EventStatus } from "@/entities/events/model/types";
import { Checkbox } from "@/shared/ui/checkbox";
import { cn } from "@/shared/utils";

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
      {
        label: "Проектируется",
        value: "PLANNED",
      },
    ],
  },
];

interface ProjectsFilterProps {
  className?: string;
  filters: GetAllProjectsParams;
  onUpdateSearchValue: (str: string) => void;
  onUpdateStatus: (status: EventStatus | "ALL") => void;
  onChangeNeedActualRoles: (checked: boolean) => void;
}

export const ProjectsFilter = (props: ProjectsFilterProps) => {
  const {
    filters,
    className,
    onUpdateSearchValue,
    onChangeNeedActualRoles,
    onUpdateStatus,
  } = props;

  const [value, setValue] = useState<string | undefined>(filters?.search ?? "");

  const handleValueChange: ChangeEventHandler<HTMLInputElement> = (e) =>
    setValue(e.currentTarget.value);

  const search = useDebounce(value, 500);

  useEffect(() => {
    onUpdateSearchValue?.(search ?? "");
  }, [onUpdateSearchValue, search]);

  return (
    <div className={cn(className, "flex flex-col gap-2")}>
      <Input
        placeholder={"Поиск по названию"}
        icon={<MagnifyingGlassIcon className="w-4 h-4" />}
        inputStyles="bg-white px-9 py-7 border-0"
        value={value}
        onChange={handleValueChange}
      />
      <div className={"flex flex-row gap-5 items-stretch"}>
        <Select
          onValueChange={onUpdateStatus}
          defaultValue="ALL"
          groups={SelectGroups}
          trigger="Статус"
          className="bg-white border-none max-w-[200px]"
        />
        <Box className="w-max rounded p-1 px-3">
          <Checkbox
            onCheckedChange={onChangeNeedActualRoles}
            checked={filters.needActualRoles}
            label={"Нужны участники"}
          />
        </Box>
      </div>
    </div>
  );
};
