import { cn } from "@/shared/utils";
import { Typography } from "@/shared/ui/typography";
import { GitHubLogoIcon, GlobeIcon } from "@radix-ui/react-icons";
import { Box } from "@/shared/ui/box";
import React, { FormEventHandler, useState } from "react";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { Button } from "@/shared/ui/button";
import { Label } from "@/shared/ui/label";
import { CreateProjectParamsType, ProjectService } from "@/entities/project";
import { useToast } from "@/shared/ui/use-toast";
import { useRouter } from "next/router";
import { ROUTES } from "@/shared/conts";
import { EnterStack } from "./enter-stack";
export const CreateProject = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [stack, setStack] = useState<string[]>([]);

  const onRemoveFromStack = (item: string) => {
    setStack(stack.filter((stackItem) => stackItem !== item));
  };

  const onAddToStack = (stackItem: string) => {
    setStack([...stack, stackItem]);
  };

  const handleSubmitForm: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    await ProjectService.instance
      .createProject({
        ...Object.fromEntries(formData),
        stack: stack.join(","),
      } as CreateProjectParamsType)
      .then((res) => {
        toast({ title: "Проект создан" });
        router.push(`${ROUTES.projects}/${res.data.id}`);
      })
      .catch(() => {
        toast({ title: "Проект не создан", variant: "destructive" });
      });
  };

  return (
    <Box className={cn("flex flex-row gap-4 w-full")}>
      <form
        className={"w-full flex flex-col gap-3"}
        onSubmit={handleSubmitForm}
      >
        <Label>Название проекта</Label>
        <Input name={"name"} placeholder={"Название проекта"} required />
        <Label>Описание проекта</Label>
        <Textarea
          name={"description"}
          placeholder={"Описание проекта"}
          required
        />
        <div>
          <Typography variant={"h3"}>Ссылки</Typography>
          <Label>Ссылка на проект</Label>
          <div className={"flex items-center my-1 gap-1"}>
            <GlobeIcon />
            <Input name={"githubUrl"} placeholder={"Ссылка на проект"} />
          </div>
          <Label>Ссылка на исходники</Label>
          <div className={"flex items-center my-1 gap-1"}>
            <GitHubLogoIcon />
            <Input name={"siteUrl"} placeholder={"Ссылка на исходники"} />
          </div>
          <EnterStack
            onAddToStack={onAddToStack}
            onRemoveFromStack={onRemoveFromStack}
            stack={stack}
          />
        </div>
        <Button>Создать</Button>
      </form>
    </Box>
  );
};
