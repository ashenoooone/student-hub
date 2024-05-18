import { ROUTES } from "@/shared/conts";
import { Box } from "@/shared/ui/box";
import { Typography } from "@/shared/ui/typography";
import { cn } from "@/shared/utils";
import Link from "next/link";
import React from "react";

type AdminPanelProps = {
  className?: string;
};

export const AdminPanel = React.memo((props: AdminPanelProps) => {
  const { className } = props;
  return (
    <Box className={cn("", className)}>
      <Typography variant={"h3"} className="mb-4">
        Админ панель
      </Typography>
      <ul className="max-w-[500px] list-disc grid-rows-2 px-4 grid grid-flow-col">
        <li className="w-max hover:text-primary transition-all">
          <Link href={ROUTES.users}>Пользователи</Link>
        </li>
        <li className="w-max hover:text-primary transition-all">
          <Link href={ROUTES.projects}>Проекты</Link>
        </li>
        <li className="w-max hover:text-primary transition-all">
          <Link href={ROUTES.events}>Мероприятия</Link>
        </li>
      </ul>
    </Box>
  );
});

AdminPanel.displayName = "AdminPanel";
