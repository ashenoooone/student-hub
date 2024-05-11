import { COOKIE_PROFILE, useUserProfileStore } from "@/entities/user";
import { ROUTES } from "@/shared/conts";
import { Box } from "@/shared/ui/box";
import { Button } from "@/shared/ui/button";
import { Typography } from "@/shared/ui/typography";
import { cn, isActiveLink } from "@/shared/utils";
import { Avatar, AvatarFallback } from "@/shared/ui/avatar";
import Link from "next/link";
import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { getCookie } from "cookies-next";
type HeaderProps = {
  className?: string;
};

export const Header = React.memo((props: HeaderProps) => {
  const { className } = props;
  const profile = useUserProfileStore.use.profile();

  return (
    <Box
      className={cn(
        "mx-auto items-center flex justify-between max-w-[1280px] w-full px-[20px] py-2",
        className
      )}
    >
      <Link href={ROUTES.main} className="w-max block">
        <Typography
          variant={"h3"}
          className="font-bold select-none"
          affects={"large"}
        >
          STUDENT <span className="text-primary">HUB</span>
        </Typography>
      </Link>
      <div className="flex gap-4">
        <Link href={ROUTES.events}>
          <Button
            variant={"link"}
            className={cn("p-0", {
              "text-primary": isActiveLink(ROUTES.events),
            })}
          >
            Мероприятия
          </Button>
        </Link>
        <Link href={ROUTES.projects}>
          <Button
            variant={"link"}
            className={cn("p-0", {
              "text-primary": isActiveLink(ROUTES.projects),
            })}
          >
            Проекты
          </Button>
        </Link>
        {/* TODO вызывает ошибку гидратации исправить */}
        {/* {profile ? (
          <Link href={ROUTES.profile}>
            <Avatar>
              {/* TODO AVATARKA */}
        {/* <Image src={profile.} /> */}
        {/* <AvatarFallback>{profile.email.slice(0, 2)}</AvatarFallback>
            </Avatar>
          </Link> */}
        {/* ) : ( */}
        {/* <Link href={ROUTES.login}>
            <Button
              variant={"link"}
              className={cn("p-0", {
                "text-primary": isActiveLink(ROUTES.login),
              })}
            >
              Войти
            </Button>
          </Link> */}
        {/* )} */}
      </div>
    </Box>
  );
});

Header.displayName = "Header";
