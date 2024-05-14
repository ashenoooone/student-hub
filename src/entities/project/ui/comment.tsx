import {CommentType} from "@/entities/project";
import {FC} from "react";
import {Box} from "@/shared/ui/box";
import {Avatar, AvatarFallback} from "@/shared/ui/avatar";
import {Typography} from "@/shared/ui/typography";
import {formatToRussianDate} from "@/shared/utils";
import Image from 'next/image'
import {ROUTES} from "@/shared/conts";

type CommentProps = {
  comment: CommentType;
}

export const Comment: FC<CommentProps> = ({comment}) => {
  return (
    <Box variant={'blue'} key={comment.id}>
      <div className={'flex flex-col gap-3'}>
        <div className={'flex flex-row gap-2 items-center'}>
          <Avatar className={'cursor-pointer'} link={`${ROUTES.profile}/${comment.author.id}`}>
            {comment.author.avatar ?
              <Image src={comment.author.avatar} alt={comment.author.login} width={100} height={100}/> :
              <AvatarFallback>{comment.author.login.slice(0, 2)}</AvatarFallback>}
          </Avatar>
          <Typography affects={'muted'}>{comment.author.login}</Typography>
          <Typography className={'ml-auto'}
                      affects={'muted'}>{formatToRussianDate(comment.createDate, true)}</Typography>
        </div>
        <Typography>{comment.text}</Typography>
      </div>
    </Box>
  );
};