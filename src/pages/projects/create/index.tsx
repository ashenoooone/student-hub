import { Page } from "@/shared/ui/page";
import { cn } from "@/shared/utils";
import { Typography } from "@/shared/ui/typography";
import { GitHubLogoIcon, GlobeIcon } from "@radix-ui/react-icons";
import { Box } from "@/shared/ui/box";
import React, { FormEventHandler } from "react";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { Button } from "@/shared/ui/button";
import { Label } from "@/shared/ui/label";
import { CreateProjectParamsType, ProjectService } from "@/entities/project";
import { useToast } from "@/shared/ui/use-toast";
import { useRouter } from "next/router";
import { ROUTES } from "@/shared/conts";
import { CreateProject } from "@/features/projects/create-project";

const ProjectCreate = () => {
  return (
    <Page className={"gap-4"}>
      <CreateProject />
    </Page>
  );
};

export default ProjectCreate;
