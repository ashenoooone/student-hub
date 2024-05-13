import { Typography } from "@/shared/ui/typography";
import { Box } from "@/shared/ui/box";
import {
  ChatBubbleIcon,
  EnvelopeOpenIcon,
  LinkNone1Icon,
  PaperPlaneIcon,
  Pencil2Icon,
} from "@radix-ui/react-icons";
import { UserMediaType, UserType } from "@/entities/user/model/types";
import { FC } from "react";
import { VkSvgIcon } from "@/shared/assets/vkSvgIcon";
import { Button } from "@/shared/ui/button";

type InfoProps = {
  userMedia?: UserMediaType;
};

export const Contacts: FC<InfoProps> = ({ userMedia }) => {
  if (!userMedia) {
    return null;
  }

  return (
    <Box className={"w-full flex flex-col gap-2 relative"}>
      {/* TODO переделать на линк теги */}
      <Button variant={"ghost"} className="absolute right-4 top-4">
        <Pencil2Icon className="w-5 h-5" />
      </Button>
      <Typography variant={"h3"}>Контакты</Typography>
      <Typography className={"w-max flex gap-3 items-center"} affects={"link"}>
        <EnvelopeOpenIcon className="w-4 h-4" /> {userMedia?.email}
      </Typography>
      <Typography className={"w-max flex gap-3 items-center"} affects={"link"}>
        <PaperPlaneIcon className="w-4 h-4" /> {userMedia?.tgUrl}
      </Typography>
      <Typography className={"w-max flex gap-3 items-center"} affects={"link"}>
        {/* TODO поменять иконку */}
        <LinkNone1Icon className="w-4 h-4" /> {userMedia?.phone}
      </Typography>
      <Typography className={"w-max flex gap-3 items-center"} affects={"link"}>
        <VkSvgIcon className="w-4 h-4" /> {userMedia?.vkUrl}
      </Typography>
    </Box>
  );
};
