import { cn } from "@/shared/utils";
import React from "react";
import { UserType } from "../model/types";
import { Typography } from "@/shared/ui/typography";
import { RoleSmall } from "@/entities/role";
import { Badge } from "@/shared/ui/badge";
import { PlusCircledIcon, PlusIcon } from "@radix-ui/react-icons";
import { Button } from "@/shared/ui/button";

type AboutRolesProps = {
  className?: string;
  profile: UserType;
};

export const AboutRoles = React.memo((props: AboutRolesProps) => {
  const { className, profile } = props;

  const roles = [
    {
      id: 1,
      name: "Frontend",
    },
    {
      id: 2,
      name: "Backend",
    },
    {
      id: 3,
      name: "Devops",
    },
  ];

  return (
    <div className={cn("", className)}>
      <Typography variant={"h3"}>Роли</Typography>
      <div className="flex gap-2 flex-wrap mt-2 items-center">
        {roles.map((role) => (
          <RoleSmall
            onRemoveClick={(id) => console.log(id)}
            role={role}
            key={`role${role.id}`}
          />
        ))}
        <Button size={"sm"} className="max-h-5" variant={"ghost"}>
          <PlusCircledIcon className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
});

AboutRoles.displayName = "AboutRoles";
