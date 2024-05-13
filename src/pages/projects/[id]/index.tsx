import {Page} from "@/shared/ui/page";
import {FC, useMemo} from "react";
import {ProjectService, ProjectType} from "@/entities/project";
import {GetServerSideProps} from "next";
import {TokensResponseType} from "@/entities/user/model/types";
import {Typography} from "@/shared/ui/typography";
import {Box} from "@/shared/ui/box";
import {Button} from "@/shared/ui/button";
import Image from "next/image";
import {Avatar, AvatarFallback} from "@/shared/ui/avatar";
import {Member, MembersList} from "@/shared/ui/members";
import {PROJECT_STATUS, ROUTES, Status} from "@/shared/conts";
import {useUserProfileStore} from "@/entities/user";
import {RequestService} from "@/entities/request";
import {useToast} from "@/shared/ui/use-toast";
import {AxiosError} from "axios";


type Props = {
  project: ProjectType
}


const Projects: FC<Props> = ({project}) => {
  console.log(project)

  const {toast} = useToast();
  const user = useUserProfileStore.use.profile();

  const existInTeam = !!project.members.find(el => el.login === user?.login) ?? false;

  const members: Member[] = useMemo(() => project.members.map(m => ({
    name: m.login,
    link: `${ROUTES.profile}/${m.userId}`,
    avatar: m.avatar
  })), [project.members])

  const handleCreateRequest = () => {
    RequestService.instance.createOrder({
      projectId: project.id,
      type: 'REQUEST',
      // TODO: id лидера
      recipientId: user?.id!
    }).then((res) => {
      if (res.status === 201) {
        toast({description: "Заявка отправлена"})
      }
    }).catch((reason) => {
      if (reason instanceof AxiosError) {
        toast({
          variant: 'destructive',
          description: reason.response?.data?.message ?? 'Произошла непредвиденная ошибка'
        })
      }
    })
  }

  return (
    <Page className={'gap-4'}>
      <Box className={'flex flex-row gap-4'}>
        <div className={'w-1/2 flex flex-col gap-3'}>
          <Typography variant={'h2'}>Проект {project.name}</Typography>
          <Typography>{PROJECT_STATUS[project.status as Status]}</Typography>
          {!existInTeam &&
              <Button size={'lg'} className={'mt-3 max-w-[238px]'} onClick={handleCreateRequest}>Подать заявку</Button>}
        </div>
        <div className={'w-1/2 flex flex-col gap-3'}>
          <Avatar className={'w-full min-h-[300px] !rounded-[12px]'}>
            {project.avatar ? <Image className={'!rounded-[12px]'} src={project.avatar} alt={project.name}/> :
              <AvatarFallback className={'!rounded-[12px]'}>{project.name}</AvatarFallback>}
          </Avatar>
          <div className={'flex gap-2 items-center'}>
            <Typography affects={'small'}>Команда:</Typography>
            <MembersList members={members} totalMembers={project.members.length}/>
          </div>
        </div>
      </Box>
      <Box>
        <Typography variant={'h2'}>Описание</Typography>
        <Typography>{project.description}</Typography>
      </Box>
      {project.actualRoles.length > 0 && <Box>
          <Typography variant={'h2'}>Свободные места</Typography>
        {project.actualRoles.map((role) => (<Typography affects={'lead'} key={role.id}>{role.name}</Typography>))}
      </Box>}
    </Page>
  );
};

export const getServerSideProps = (async (context) => {
  const {id} = context.params as { id: string | number };

  if (!id || !context.req.cookies.cookie_user) {
    return {
      notFound: true,
    };
  }
  const token = JSON.parse(
    context.req.cookies.cookie_user
  ) as TokensResponseType;

  const authConfig = {
    config: {
      headers: {
        Authorization: `${token.type} ${token.accessToken}`,
      },
    },
  };

  const project = await ProjectService.instance.getById(+id, authConfig)

  return {
    props: {
      project: project.data
    }
  }

}) satisfies GetServerSideProps<Props>

export default Projects