import { cn } from "@/shared/utils";
import React from "react";
import { UserType } from "../model/types";
import { Box } from "@/shared/ui/box";

import { AboutText } from "./about-text";
import { AboutRoles } from "./about-roles";
import { RoleType } from "@/entities/role";

type AboutUserProps = {
  className?: string;
  profile: UserType;
  roles: RoleType[];
};

export const AboutUser = React.memo((props: AboutUserProps) => {
  const { className, profile, roles } = props;
  return (
    <Box className={cn(className, "flex flex-col gap-4")}>
      <AboutText about={profile.media} />
      <AboutRoles roles={roles} profile={profile} />
    </Box>
  );
});

AboutUser.displayName = "AboutUser";
