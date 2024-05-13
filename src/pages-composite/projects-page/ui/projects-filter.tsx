import {Box} from "@/shared/ui/box";
import {Select} from "@/shared/ui/select";
import {useRolesFroProject} from "@/entities/role";


export const ProjectsFilter = () => {

  const {data, isLoading, isFetching, isSuccess} = useRolesFroProject();

  return (
    <Box className={'flex flex-row gap-4'}>
      <Select
        className={'w-max px-3 gap-2'}
        trigger={'Роли'}
        groups={isSuccess ? [
          {
            groupLabel: "Роль",
            selectItems: [
              {
                label: "Все",
                value: "ALL",
              },
              ...data?.map(el => ({label: el.name, value: `${el.id}`}))
            ],
          },
        ] : undefined}
        disabled={isLoading || isFetching}
      />
    </Box>
  );
};