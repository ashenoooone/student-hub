import {Typography} from "@/shared/ui/typography";
import {Box} from "@/shared/ui/box";
import {EnvelopeOpenIcon} from "@radix-ui/react-icons";
import {UserType} from "@/entities/user/model/types";
import {FC} from "react";

type InfoProps = {
  profile: UserType;
}

export const Info: FC<InfoProps> = ({profile}) => {
  return (
    <Box className={'w-full flex flex-col gap-2'}>
      <Typography
        variant={'h3'}
      >
        О себе
      </Typography>
      <Typography className={'flex gap-1 items-center'} affects={'link'}><EnvelopeOpenIcon/> {profile?.email}
      </Typography>
    </Box>
  );
};