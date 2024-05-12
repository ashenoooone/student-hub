import {Page} from "@/shared/ui/page";
import {Typography} from "@/shared/ui/typography";
import {Box} from "@/shared/ui/box";
import {GetServerSideProps} from "next";
import React, {FC} from "react";
import {UsersService} from "@/entities/user";
import {TokensResponseType, UserType} from "@/entities/user/model/types";
import {Avatar, AvatarFallback} from "@/shared/ui/avatar";
import {EnvelopeOpenIcon} from "@radix-ui/react-icons";

type Props = {
  profile: UserType;
}

export const getServerSideProps = (async (context) => {
  if (!context.req.cookies.cookie_user) return {notFound: true}

  const token = JSON.parse(context.req.cookies.cookie_user) as TokensResponseType;

  const config = {
    config: {
      headers: {
        Authorization: `${token.type} ${token.accessToken}`
      }
    }
  }

  const [] = await Promise.allSettled([
    UsersService.instance.getUserData(config),

  ])

  const {data: profile} = await UsersService.instance.getUserData({
    config: {
      headers: {
        Authorization: `${token.type} ${token.accessToken}`
      }
    }
  });
  return {
    props: {
      profile
    }
  }
}) satisfies GetServerSideProps<Props>

const Profile: FC<Props> = ({profile}) => {
  console.log(profile)
  return (
    <Page>
      <Box className={'flex flex-col gap-4 items-center bg-gradient-to-r from-pink-200 via-green-100 to-blue-300'}>
        <Box className={'w-max flex flex-col gap-4 items-center bg-black/20'}>
          <Avatar className={'w-[115px] h-[115px] text-5xl'}>
            <AvatarFallback>{profile.login.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <Typography
            variant={'h1'}
            affects={"large"}
            className={'text-3xl text-white'}
          >
            {profile?.firstName} {profile?.middleName} {profile?.lastName}</Typography>
        </Box>
      </Box>
      <div className={'flex flex-row gap-4 pt-5 w-full'}>
        <div className={'w-1/4 flex flex-col gap-4'}>
          <Box className={'w-full flex flex-col gap-2'}>
            <Typography
              variant={'h3'}
            >
              Дополнительно
            </Typography>
            <Typography className={'flex gap-1 items-center'} affects={'link'}><EnvelopeOpenIcon/> {profile?.email}
            </Typography>
          </Box>
        </div>
        <div className={'w-3/4 flex flex-col gap-4'}>
          <Box className={'w-full'}>
            <Typography
              variant={'h3'}
            >
              Проекты
            </Typography>
          </Box>
          <Box>
            <Typography
              variant={'h3'}
            >
              Мероприятия
            </Typography>
          </Box>
        </div>
      </div>
    </Page>
  );
};

export default Profile;
