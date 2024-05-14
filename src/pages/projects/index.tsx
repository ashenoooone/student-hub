import { Page } from "@/shared/ui/page";
import { Advert } from "@/pages-composite/projects-page";
import { ProjectsListWithFilters } from "@/widgets/projects/ui/projects-list-with-filters";

const Projects = () => {
  return (
    <Page className={"gap-4"}>
      <ProjectsListWithFilters />
      <Advert />
    </Page>
  );
};

export default Projects;
