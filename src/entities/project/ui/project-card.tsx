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
import { cn } from "@/shared/utils";
import { Badge } from "@/shared/ui/badge";

type ProjectCardProps = {
  project: ProjectType;
  className?: string;
};

export const ProjectCard: FC<ProjectCardProps> = ({ project, className }) => {
  const members: Member[] = useMemo(
    () =>
      project.members?.slice(0, 3).map((user) => ({
        id: user.id,
        name: user.login,
        link: `/profile/${user.id}`,
        avatar: user.avatar ?? "",
      })),
    [project.members]
  );

  return (
    <Box className={cn("flex [&:not(:last-child)]:border-b gap-5", className)}>
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
        <Typography affects={"muted"} className={"mb-3 line-clamp-3"}>
          {project.description}
        </Typography>
        <div className="flex mt-auto">
          {project.actualRoles && project.actualRoles.length > 0 && (
            <div>
              <Typography className="font-medium">Проекту нужны: </Typography>
              {project.actualRoles.slice(0, 3).map((role, index) => (
                <Badge
                  className={
                    "w-max max-w-[83px] select-none [&:not(:first-child)]:ml-1 text-ellipsis hover:bg-blue-400"
                  }
                  key={index}
                >
                  {role.name}
                </Badge>
              ))}
              {project.actualRoles && project.actualRoles.length > 3 && (
                <Badge className={"w-max ml-1 select-none hover:bg-blue-400"}>
                  ...
                </Badge>
              )}
            </div>
          )}
          {project.members && (
            <MembersList
              className="ml-auto self-end"
              members={members}
              totalMembers={project.members.length}
            />
          )}
        </div>
      </div>
    </Box>
  );
};
