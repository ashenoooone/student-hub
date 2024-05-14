import {ProjectType} from "@/entities/project";
import {FC} from "react";
import {Box} from "@/shared/ui/box";
import {Typography} from "@/shared/ui/typography";
import {MemberCard} from "@/entities/user/ui/member";
import {Avatar, AvatarFallback} from "@/shared/ui/avatar";
import Image from "next/image";
import {ROUTES} from "@/shared/conts";
import {Separator} from "@/shared/ui/separator";

type CommandsProps = {
  project: ProjectType;
}

export const Commands: FC<CommandsProps> = ({project}) => {
  return (
    <Box className={'flex flex-row items-stretch gap-10'}>
      <div className={'flex flex-col gap-2'}>
        <Typography variant={'h2'}>Лидер команды</Typography>
        <div className={'flex flex-row gap-4 justify-between'}>
          <Avatar className={'cursor-pointer w-[205px] h-[205px] !rounded-[12px]'} link={`${ROUTES.profile}/${project.leader.userId}`}>
            {project.leader.avatar ?
              (<Image className={'w-[205px] h-[205px]'} src={project.leader.avatar} alt={project.leader.login}
                      width={200} height={200}/>) : (
                <AvatarFallback className={'!rounded-[12px]'}>{project.leader.login.slice(0, 2)}</AvatarFallback>
              )}
          </Avatar>
          <div>
            <Typography variant={'h3'}>{project.leader.login}</Typography>
            <Typography>{project.leader.lastName} {project.leader.firstName} {project.leader.middleName}</Typography>
            <Typography affects={'muted'}>{project.leader.rolesForProject?.map(el => el.name).join(', ')}</Typography>
          </div>
        </div>
      </div>
      <Separator className={'border h-auto'} orientation={'vertical'} />
      <div className={'flex flex-col'}>
        <Typography variant={'h2'}>Члены команды</Typography>
        <div className={'grid grid-col-2 gap-2'}>
          {project.members.map(m => (
            <MemberCard key={m.id} user={m}/>
          ))}
        </div>
      </div>
    </Box>
  );
};