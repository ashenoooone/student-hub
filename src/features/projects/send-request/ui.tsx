import {Button} from "@/shared/ui/button";
import React, {FC, useState} from "react";
import {useUserProfileStore} from "@/entities/user";
import {ProjectType} from "@/entities/project";
import {RequestService} from "@/entities/request";
import {AxiosError} from "axios";
import {useToast} from "@/shared/ui/use-toast";

type SendRequestProps = {
  project: ProjectType;
}

export const SendRequest: FC<SendRequestProps> = ({project}) => {
  const {toast} = useToast();
  const user = useUserProfileStore.use.profile();
  const _hydrated = useUserProfileStore.use._hydrated();

  const [isRequestSend, setRequestSend] = useState<boolean>(false);
  const existInTeam = !!project.members.find(el => el.login === user?.login) ?? false;

  const handleCreateRequest = () => {
    RequestService.instance.createOrder({
      projectId: project.id,
      type: 'REQUEST',
      recipientId: project.leader.userId
    }).then(() => {
      toast({title: 'Заявка', description: "Заявка отправлена"})
      setRequestSend(true);
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
    <>
      {_hydrated && !existInTeam &&
          <Button size={'lg'} className={'mt-auto max-w-[238px]'} onClick={handleCreateRequest}
                  disabled={isRequestSend}>Подать
              заявку</Button>}
    </>
  );
};