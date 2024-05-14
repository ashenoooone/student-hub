import {Page} from "@/shared/ui/page";
import {Advert, ProjectsFilter, ProjectsList} from "@/pages-composite/projects-page";


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