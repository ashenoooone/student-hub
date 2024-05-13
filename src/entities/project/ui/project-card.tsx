import { FC, useMemo } from "react";
import { ProjectType } from "@/entities/project";
import { Typography } from "@/shared/ui/typography";
import { Button } from "@/shared/ui/button";
import { Member, MembersList } from "@/shared/ui/members";
import Link from "next/link";
import { ROUTES } from "@/shared/conts";
import { Box } from "@/shared/ui/box";
import { Avatar, AvatarFallback } from "@/shared/ui/avatar";
import Image from "next/image";

type ProjectCardProps = {
  project: ProjectType;
};

export const ProjectCard: FC<ProjectCardProps> = ({ project }) => {
  const members: Member[] = useMemo(
    () =>
      project.members?.map((user) => ({
        id: user.id,
        name: user.login,
        link: `/profile/${user.id}`,
        avatar: user.avatar ?? "",
      })),
    [project.members]
  );

  return (
    <Box className={"flex [&:not(:last-child)]:border-b gap-5"}>
      <Avatar className="w-20 h-20">
        {project.avatar && (
          <Image
            width={1000}
            height={1000}
            src={project.avatar}
            alt={project.name}
            className="object-cover"
          />
        )}
        {!project.avatar && (
          <AvatarFallback>{project.name.slice(0, 2)}</AvatarFallback>
        )}
      </Avatar>
      <div className="flex flex-col w-full">
        <Link
          href={`${ROUTES.projects}/${project.id}`}
          className="text-primary w-max"
        >
          <Typography className="text-lg font-bold" affects={"link"}>
            {project.name}
          </Typography>
        </Link>
        <Typography affects={"muted"} className={"mb-3"}>
          {project.description}
        </Typography>
        {project.members && (
          <MembersList
            className="ml-auto"
            members={members}
            totalMembers={project.members.length}
          />
        )}
      </div>
    </Box>
  );
};
