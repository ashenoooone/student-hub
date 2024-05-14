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
  editable?: boolean;
};

export const AboutUser = React.memo((props: AboutUserProps) => {
  const { className, profile, roles, editable } = props;
  return (
    <Box className={cn(className, "flex flex-col gap-4")}>
      <AboutText editable={editable} about={profile.media} />
      <AboutRoles editable={editable} roles={roles} profile={profile} />
    </Box>
  );
});

AboutUser.displayName = "AboutUser";
