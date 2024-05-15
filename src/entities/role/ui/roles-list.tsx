import { cn } from "@/shared/utils";
import React from "react";
import { RoleType } from "../model/types";
import { Typography } from "@/shared/ui/typography";
import { Badge } from "@/shared/ui/badge";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { TooltipContent } from "@/shared/ui/tooltip";

type RolesListProps = {
  className?: string;
  roles?: RoleType[];
};

export const RolesList = React.memo((props: RolesListProps) => {
  const { className, roles } = props;

  if (!roles) return null;

  return (
    <div className={cn("flex items-stretch gap-2", className)}>
      {roles.slice(0, 2).map((role, index) => (
        <Badge
          className={
            "w-max max-w-[83px] text-ellipsis text-[12px] hover:bg-blue-400 select-none"
          }
          key={index}
        >
          {role.name}
        </Badge>
      ))}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            {roles.length > 2 && (
              <Badge className={"w-max h-full hover:bg-blue-400 select-none"}>
                ...
              </Badge>
            )}
          </TooltipTrigger>
          <TooltipContent className="bg-muted-foreground text-muted">
            {roles
              .slice(2)
              .map((r) => r.name)
              .join(", ")}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {roles.length === 0 && (
        <Typography affects={"muted"}>Роли отсутствуют</Typography>
      )}
    </div>
  );
});

RolesList.displayName = "RolesList";
