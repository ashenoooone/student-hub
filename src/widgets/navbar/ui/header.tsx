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
import { ArchiveIcon, ExitIcon, HomeIcon } from "@radix-ui/react-icons";
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
        <DropdownMenuItem className="flex items-center gap-2">
          <HomeIcon className="w-4 h-4" />
          <Link href={ROUTES.profile}>Профиль</Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2">
          <ArchiveIcon className="w-4 h-4" />
          <Link href={ROUTES.projects}>Мои проекты</Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2">
          <ExitIcon className="w-4 h-4" />
          <Link href={ROUTES.logout}>Выйти</Link>
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
        {userProfileHydrated && userProfile ? (
          <UserAvatar className="mr-2" {...userProfile} />
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
