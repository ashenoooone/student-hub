import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shared/ui/carousel";
import { cn } from "@/shared/utils";
import React from "react";
import { ProjectType } from "../model/types";
import { ProjectCard } from "./project-card";

type ProjectsCarouselProps = {
  className?: string;
  projects?: ProjectType[];
};

export const ProjectsCarousel = React.memo((props: ProjectsCarouselProps) => {
  const { className, projects } = props;

  if (!projects) return null;

  return (
    <div className={cn("px-16 w-full", className)}>
      <Carousel>
        <CarouselContent>
          {projects.map((p) => (
            <CarouselItem className="lg:basis-1/2" key={p.id}>
              <ProjectCard className="border h-full" project={p} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
});

ProjectsCarousel.displayName = "ProjectsCarousel";
