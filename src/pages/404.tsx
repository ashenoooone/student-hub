import NotFoundImage from "@/shared/assets/Error_404.svg";
import { Box } from "@/shared/ui/box";
import { Button } from "@/shared/ui/button";
import { Page } from "@/shared/ui/page";
import { Typography } from "@/shared/ui/typography";
import Image from "next/image";
import { useRouter } from "next/router";

const NotFound = () => {
  const router = useRouter();

  const onBackClick = () => {
    router.back();
  };

  return (
    <Page>
      <Box className="flex flex-col items-center justify-center">
        <Image alt="Не найдено" src={NotFoundImage} />
        <Typography variant={"h2"} className="mt-2">
          Страница не найдена или находится в разработке
        </Typography>
        <Button onClick={onBackClick} className="mt-2">
          Вернуться назад
        </Button>
      </Box>
    </Page>
  );
};

export default NotFound;
