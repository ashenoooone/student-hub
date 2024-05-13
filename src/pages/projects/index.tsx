import {Page} from "@/shared/ui/page";
import {FC} from "react";
import {ProjectType, useProjects, useProjectsStore} from "@/entities/project";
import {ProjectsFilter, ProjectsList} from "@/pages-composite/projects-page";
import Pagination from "@/shared/ui/pagination";

type Props = {
  projects: ProjectType[]
}

const PAGE_SIZE = 10;

const Projects: FC<Props> = () => {
  const currentPage = useProjectsStore.use.currentPage();
  const handlePageChange = useProjectsStore.use.setPage();

  const {data, isLoading, isFetching, isSuccess} = useProjects({page: currentPage})
  return (
    <Page className={'gap-4'}>
      {isLoading || isFetching && <div>Loading...</div>}
      <ProjectsFilter/>
      <ProjectsList projects={data?.content ?? []}/>
      <Pagination onPageChange={handlePageChange} totalCount={data?.totalPages ?? 0} currentPage={currentPage}
                  pageSize={PAGE_SIZE}/>
    </Page>
  );
};

export default Projects