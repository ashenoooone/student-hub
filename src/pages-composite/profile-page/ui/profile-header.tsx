import { Box } from "@/shared/ui/box";
import { Avatar, AvatarFallback } from "@/shared/ui/avatar";
import { Typography } from "@/shared/ui/typography";
import React, { FC } from "react";
import { UserRatingMapper, UserType } from "@/entities/user/model/types";
import { Compliment } from "./compliment";
import Image from "next/image";
type ProfileHeaderProps = {
  profile: UserType;
};

export const ProfileHeader: FC<ProfileHeaderProps> = ({ profile }) => {
  return (
    <Box
      className={
        "flex gap-4 items-stretch justify-center bg-gradient-to-r from-pink-200 via-green-100 to-blue-300"
      }
    >
      <Box className={"w-max flex flex-col gap-4 items-center bg-black/20"}>
        <Avatar className={"w-[115px] h-[115px] text-5xl"}>
          {profile.avatar && (
            <Image
              src={profile.avatar}
              alt={profile.login}
              width={1000}
              height={1000}
            />
          )}
          {!profile.avatar && (
            <AvatarFallback>{profile.login.slice(0, 2)}</AvatarFallback>
          )}
        </Avatar>
        <Typography
          variant={"h1"}
          affects={"large"}
          className={"text-3xl text-white"}
        >
          {profile?.lastName} {profile?.firstName} {profile?.middleName}
        </Typography>
      </Box>
    </Box>
  );
};
