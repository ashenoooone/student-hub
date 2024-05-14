import {Page} from "@/shared/ui/page";
import {Advert, ProjectsList} from "@/pages-composite/projects-page";
import {ProjectsFilter} from "@/features/projects/filter";


const Projects = () => {
  return (
    <Page className={'gap-4'}>
      <ProjectsFilter/>
      <ProjectsList/>
      <Advert/>
    </Page>
  );
};

export default Projects