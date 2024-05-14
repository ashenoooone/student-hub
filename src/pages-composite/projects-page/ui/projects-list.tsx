import {FC} from 'react';
import {ProjectTableCard, useProjects, useProjectsStore} from "@/entities/project";
import {Typography} from "@/shared/ui/typography";
import Pagination from "@/shared/ui/pagination";

type ProjectsListProps = {
}

export const ProjectsList: FC<ProjectsListProps> = (props) => {
  const currentPage = useProjectsStore.use.currentPage();
  const setCurrentPage = useProjectsStore.use.setPage();
  const search = useProjectsStore.use.search();

  const {data} = useProjects({
    filter: {
      page: currentPage,
      search,
      limit: 6
    }
  })
  return (
    <div>
      <Typography variant={'h2'}>Проекты</Typography>
      <div className={'grid lg:grid-cols-2 grid-cols-1 gap-4 mt-2 '}>
        {data?.content.map(project => (
          <ProjectTableCard key={project.id} project={project}/>))}
      </div>
      <Pagination className={'mt-4 justify-center'} onPageChange={setCurrentPage} totalCount={data?.totalItems ?? 0}
                  currentPage={currentPage}
                  pageSize={data?.size ?? 0}/>
    </div>
  );
};