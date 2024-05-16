import { useUserProfileStore } from "@/entities/user";
import { ROUTES } from "@/shared/conts";
import { Box } from "@/shared/ui/box";
import { Button } from "@/shared/ui/button";
import { Typography } from "@/shared/ui/typography";
import { cn, isActiveLink } from "@/shared/utils";
import { Avatar, AvatarFallback } from "@/shared/ui/avatar";
import Link from "next/link";
import React from "react";
import { UserType } from "@/entities/user/model/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import {
  ArchiveIcon,
  ExitIcon,
  HomeIcon,
  PlusIcon,
} from "@radix-ui/react-icons";
import { Notification } from "@/entities/notification";

type HeaderProps = {
  className?: string;
};

const UserAvatar = (props: UserType & { className?: string }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarFallback>{props?.login.slice(0, 2)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={props.className}>
        <DropdownMenuLabel>Мой аккаунт</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link
            className="flex items-center gap-2 w-full"
            href={ROUTES.profile}
          >
            <HomeIcon className="w-4 h-4" />
            Профиль
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            className="flex items-center gap-2 w-full"
            href={ROUTES.projects}
          >
            <ArchiveIcon className="w-4 h-4" />
            Мои проекты
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link className="flex items-center gap-2 w-full" href={ROUTES.logout}>
            <ExitIcon className="w-4 h-4" />
            Выйти
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const Header = React.memo((props: HeaderProps) => {
  const { className } = props;
  const userProfile = useUserProfileStore.use.profile();
  const userProfileHydrated = useUserProfileStore.use._hydrated();

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
      <div className="flex items-center gap-4">
        <Link href={ROUTES.users}>
          <Button
            variant={"link"}
            className={cn("p-0", {
              "text-primary": isActiveLink(ROUTES.users),
            })}
          >
            Пользователи
          </Button>
        </Link>
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
        {userProfileHydrated && userProfile && (
          <Link
            title="Создать проект"
            className="hover:text-primary"
            href={ROUTES.createProject}
          >
            <PlusIcon className="h-4 w-4" />
          </Link>
        )}
        {userProfileHydrated && userProfile && <Notification />}
        {userProfileHydrated && userProfile ? (
          <UserAvatar {...userProfile} />
        ) : (
          <Link href={ROUTES.login}>
            <Button variant="link">Войти</Button>
          </Link>
        )}
      </div>
    </Box>
  );
});

Header.displayName = "Header";
