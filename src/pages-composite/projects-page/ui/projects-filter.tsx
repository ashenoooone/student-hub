import {Box} from "@/shared/ui/box";
import {useRolesFroProject} from "@/entities/role";
import {Input} from "@/shared/ui/input";
import {ChangeEventHandler, useEffect, useState} from "react";
import {useDebounce} from "@/shared/utils/useDebaunce";
import {MagnifyingGlassIcon} from "@radix-ui/react-icons";
import {useProjectsStore} from "@/entities/project";


export const ProjectsFilter = () => {

  const {data, isLoading, isFetching, isSuccess} = useRolesFroProject();
  const searchStoreValue = useProjectsStore.use.search()
  const updateStoreSearchValue = useProjectsStore.use.setSearch();

  const [value, setValue] = useState<string | undefined>(searchStoreValue)

  const handleValueChange: ChangeEventHandler<HTMLInputElement> = (e) => setValue(e.currentTarget.value);

  const search = useDebounce(value, 500);

  useEffect(() => {
    updateStoreSearchValue(search)
  }, [search]);

  return (
    <Box className={'flex flex-row gap-4'}>
      <Input inputStyles={'pl-8'} placeholder={'Поиск по названию'} className={'w-full items-center'}
             icon={<MagnifyingGlassIcon/>} value={value}
             onChange={handleValueChange}/>
    </Box>
  );
};