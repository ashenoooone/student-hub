import { cn } from "@/shared/utils";
import React, { ChangeEvent, useCallback, useState } from "react";
import { UserMediaType, UserType } from "../model/types";
import { Box } from "@/shared/ui/box";
import { Typography } from "@/shared/ui/typography";
import { Button } from "@/shared/ui/button";
import {
  CheckCircledIcon,
  CrossCircledIcon,
  Pencil2Icon,
} from "@radix-ui/react-icons";
import { Textarea } from "@/shared/ui/textarea";
import { usePutUserAboutMutation } from "../api";
import { useToast } from "@/shared/ui/use-toast";
import { isApiError } from "@/shared/api/utils";
import { AboutText } from "./about-text";
import { AboutRoles } from "./about-roles";

type AboutUserProps = {
  className?: string;
  profile: UserType;
};

export const AboutUser = React.memo((props: AboutUserProps) => {
  const { className, profile } = props;
  return (
    <Box className={cn(className, "flex flex-col gap-4")}>
      <AboutText about={profile.media} />
      <AboutRoles profile={profile} />
    </Box>
  );
});

AboutUser.displayName = "AboutUser";
