import {Comment, ProjectType, useComments} from "@/entities/project";
import {FC, useState} from "react";
import {Typography} from "@/shared/ui/typography";
import Pagination from "@/shared/ui/pagination";
import {Box} from "@/shared/ui/box";
import {SendComment} from "@/features/projects/send-comment";

type CommentsSectionsProps = {
  project: ProjectType;
}

export const CommentsSections: FC<CommentsSectionsProps> = ({project}) => {

  const [currentPage, setCurrentPage] = useState(1);
  const {data: comments, isSuccess} = useComments(project.id, currentPage);

  console.log(comments)

  return (
    <Box className={'flex flex-col gap-3'}>
      <Typography variant={'h2'}>Комментарии</Typography>
      {isSuccess && comments.content.map(comment => (
        <Comment key={comment.id} comment={comment}/>
      ))}
      <SendComment project={project}/>
      <Pagination currentPage={currentPage} onPageChange={setCurrentPage} pageSize={comments?.size ?? 0}
                  totalCount={comments?.totalItems ?? 0}/>
    </Box>
  );
};