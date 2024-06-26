import React from "react";
import { UserRatingMapper, UserType } from "@/entities/user/model/types";
import { Avatar, AvatarFallback } from "@/shared/ui/avatar";
import Image from "next/image";
import { Badge } from "@/shared/ui/badge";
import { Compliment } from "@/pages-composite/profile-page/ui/compliment";
import ComplimentMini from "@/entities/user/ui/compliment";
import { Typography } from "@/shared/ui/typography";
import { ROUTES } from "@/shared/conts";
import { RolesList } from "@/entities/role";
import Link from "next/link";

type Props = {
  user: UserType;
};

const CardUser = (props: Props) => {
  const { user } = props;

  return (
    <div
      className={
        "bg-white p-5 rounded-2xl flex flex-row items-start gap-4 hover:scale-[101%] transition"
      }
    >
      <Avatar
        className={"w-[100px] h-[100px] cursor-pointer"}
        link={`${ROUTES.profile}/${user.id}`}
      >
        {user.avatar ? (
          <Image
            src={user.avatar}
            alt={user.login}
            width={1000}
            height={1000}
            className={"w-[100px] h-[100px]"}
          />
        ) : (
          <AvatarFallback className={"w-[100px] h-[100px]"}>
            {user.login.slice(0, 2)}
          </AvatarFallback>
        )}
      </Avatar>
      <div className={" flex flex-col mt-2 ml-2"}>
        <div className={"text-md font-medium"}>
          <Link href={`${ROUTES.profile}/${user.id}`}>
            {user.lastName} {user.firstName} {user.middleName}
          </Link>
        </div>
        <div className={"flex flex-row gap-2 mt-2"}>
          <RolesList roles={user.rolesForProject} />
        </div>
        <div className={"flex flex-row gap-2 mt-2 "}>
          <ComplimentMini
            icon={"🤝"}
            text={UserRatingMapper.politeness}
            count={user.ratings?.politeness ?? 0}
          />
          <ComplimentMini
            icon={"✨"}
            text={UserRatingMapper.creativity}
            count={user.ratings?.politeness ?? 0}
          />
          <ComplimentMini
            icon={"📚"}
            text={UserRatingMapper.learningAbility}
            count={user.ratings?.politeness ?? 0}
          />
          <ComplimentMini
            icon={"🌷"}
            text={UserRatingMapper.responsibility}
            count={user.ratings?.politeness ?? 0}
          />
        </div>
      </div>
    </div>
  );
};

export default CardUser;
