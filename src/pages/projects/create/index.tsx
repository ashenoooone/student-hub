import {Page} from "@/shared/ui/page";
import {cn} from "@/shared/utils";
import {Typography} from "@/shared/ui/typography";
import {GitHubLogoIcon, GlobeIcon} from "@radix-ui/react-icons";
import {Box} from "@/shared/ui/box";
import React, {FormEventHandler} from "react";
import {Input} from "@/shared/ui/input";
import {Textarea} from "@/shared/ui/textarea";
import {Button} from "@/shared/ui/button";
import {Label} from "@/shared/ui/label";
import {CreateProjectParamsType, ProjectService} from "@/entities/project";
import {useToast} from "@/shared/ui/use-toast";
import {useRouter} from "next/router";
import {ROUTES} from "@/shared/conts";

const ProjectCreate = () => {
  const {toast} = useToast();
  const router = useRouter()

  const handleSubmitForm: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    console.log(Object.fromEntries(formData));
    await ProjectService.instance.createProject(Object.fromEntries(formData) as CreateProjectParamsType).then((res) => {
      toast({title: 'Проект создан'});
      router.push(`${ROUTES.projects}/${res.data.id}`)
    }).catch(() => {
      toast({title: 'Проект не создан', variant: 'destructive'})
    })
  }

  return (
    <Page className={"gap-4"}>
      <Box
        className={cn("flex flex-row gap-4 w-full")}
      >
        <form className={"w-full flex flex-col gap-3"} onSubmit={handleSubmitForm}>
          <Label>Название проекта</Label>
          <Input name={'name'} placeholder={'Название проекта'} required/>
          <Label>Описание проекта</Label>
          <Textarea name={'description'} placeholder={'Описание проекта'} required/>
          <div>
            <Typography variant={"h3"}>Ссылки</Typography>
            <Label>Ссылка на проект</Label>
            <div className={"flex items-center my-1 gap-1"}>
              <GlobeIcon/>
              <Input name={'githubUrl'} placeholder={'Ссылка на проект'} required/>
            </div>
            <Label>Ссылка на исходники</Label>
            <div className={"flex items-center my-1 gap-1"}>
              <GitHubLogoIcon/>
              <Input name={'siteUrl'} placeholder={'Ссылка на исходники'} required/>
            </div>
            <Label>Введите stack через запятую</Label>
            <Input name={'stack'} placeholder={'Введите stack через запятую'} required/>
          </div>
          <Button>Создать</Button>
        </form>
      </Box>
    </Page>
  );
};

export default ProjectCreate;
