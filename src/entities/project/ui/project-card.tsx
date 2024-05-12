import {FC, useMemo} from "react";
import {ProjectType} from "@/entities/project";
import {Typography} from "@/shared/ui/typography";
import {Button} from "@/shared/ui/button";
import {Member, MembersList} from "@/shared/ui/members";
import Link from "next/link";
import {ROUTES} from "@/shared/conts";
import {Box} from "@/shared/ui/box";


type ProjectCardProps = {
  project: ProjectType;
}

export const ProjectCard: FC<ProjectCardProps> = ({project}) => {

  const members: Member[] = useMemo(() => project.members.map(user => ({
    id: user.id,
    name: user.login,
    link: `/profile/${user.id}`,
    avatar: user.avatar ?? ''
  })), [project.members])

  return (
    <Box variant={'blue'} className={'flex flex-col'}>
      <Typography className={'text-[#9398a8]'}>#{project.id}</Typography>
      <Typography affects={'large'}>{project.name}</Typography>
      <Typography className={'mb-3'}>{project.description}</Typography>
      <div className={'flex justify-between'}>
        <Link href={`${ROUTES.projects}/${project.id}`}>
          <Button className={'text-primary'} variant={'outline'}>Смотреть профиль проекта</Button>
        </Link>
        <MembersList members={members} totalMembers={project.members.length}/>
      </div>
    </Box>
  );
};