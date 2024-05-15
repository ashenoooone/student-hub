import { Box } from "@/shared/ui/box";
import { Typography } from "@/shared/ui/typography";
import { Button } from "@/shared/ui/button";
import Link from "next/link";
import { ROUTES } from "@/shared/conts";

export const Advert = () => {
  return (
    <Box className={"p-8 gap-5 flex flex-col mt-4"}>
      <Typography className={"text-4xl"} variant={"h3"} affects={"large"}>
        Не нашел проекты?
        <br />
        Создай проект сам и стань лидером!
      </Typography>
      <Button className={"w-max"} size={"lg"}>
        <Link href={ROUTES.createProject}>Создать</Link>
      </Button>
    </Box>
  );
};
