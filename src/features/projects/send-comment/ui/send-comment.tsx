import {Textarea} from "@/shared/ui/textarea";
import {Button} from "@/shared/ui/button";
import {PaperPlaneIcon} from "@radix-ui/react-icons";
import {ProjectType, useCommentSendMutation} from "@/entities/project";
import {ChangeEventHandler, FC, FormEventHandler, useState} from "react";
import {useToast} from "@/shared/ui/use-toast";
import {AxiosError} from "axios";

type SendCommentProps = {
  project: ProjectType;
}

export const SendComment: FC<SendCommentProps> = ({project}) => {
  const {toast} = useToast();
  const [message, setMessage] = useState<string>('');
  const sendMessage = useCommentSendMutation().mutateAsync;

  const handleMessageChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => setMessage(e.currentTarget.value);

  const handleMessageSend: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    await sendMessage({text: message, createDate: new Date().toISOString(), projectId: project.id}).catch((err) => {
      if (err instanceof AxiosError)
        toast({title: 'Ошибка', description: err.message, variant: 'destructive'})
    }).finally(() => {
      setMessage('');
    })

  }

  return (
    <form className={'mt-3 flex flex-row gap-3 items-center'} onSubmit={handleMessageSend}>
      <Textarea value={message} onChange={handleMessageChange} placeholder={'Напишите ваш комментарий'}/>
      <Button className={'px-3'}><PaperPlaneIcon/></Button>
    </form>
  );
};