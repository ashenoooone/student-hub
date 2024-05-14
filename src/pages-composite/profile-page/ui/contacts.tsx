import { Typography } from "@/shared/ui/typography";
import { Box } from "@/shared/ui/box";
import {
  CheckCircledIcon,
  CrossCircledIcon,
  EnvelopeOpenIcon,
  LinkNone1Icon,
  PaperPlaneIcon,
  Pencil2Icon,
} from "@radix-ui/react-icons";
import { UserMediaType, UserType } from "@/entities/user/model/types";
import { ChangeEvent, FC, useCallback, useMemo, useState } from "react";
import { VkSvgIcon } from "@/shared/assets/vkSvgIcon";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { usePutUserMediaMutation } from "@/entities/user";
import { useToast } from "@/shared/ui/use-toast";
import { isApiError } from "@/shared/api/utils";

type InfoProps = {
  userMedia?: UserMediaType;
  editable: boolean;
};

export const Contacts: FC<InfoProps> = ({
  userMedia: userMediaFromProps,
  editable,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [lastUserMedia, setLastUserMedia] = useState(userMediaFromProps);
  const [userMedia, setUserMedia] = useState(userMediaFromProps);
  const putUserMedia = usePutUserMediaMutation().mutateAsync;
  const { toast } = useToast();

  const onChangeIsEdit = useCallback(() => {
    setIsEdit((isEdit) => !isEdit);
  }, []);

  const onChangeEmailField = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setUserMedia(
        (userMedia) =>
          ({
            ...userMedia,
            email: event.target.value,
          } as UserMediaType)
      );
    },
    []
  );

  const onChangeTgField = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setUserMedia(
        (userMedia) =>
          ({
            ...userMedia,
            tgUrl: event.target.value,
          } as UserMediaType)
      );
    },
    []
  );

  const onChangeVkField = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setUserMedia(
        (userMedia) =>
          ({
            ...userMedia,
            vkUrl: event.target.value,
          } as UserMediaType)
      );
    },
    []
  );

  const onChangePhoneField = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setUserMedia(
        (userMedia) =>
          ({
            ...userMedia,
            phone: event.target.value,
          } as UserMediaType)
      );
    },
    []
  );

  const onCancelClick = useCallback(() => {
    setUserMedia(lastUserMedia);
    setIsEdit(false);
  }, [lastUserMedia]);

  const onSaveContacts = useCallback(async () => {
    try {
      await putUserMedia({
        params: {
          email: userMedia!.email,
          tgUrl: userMedia!.tgUrl,
          vkUrl: userMedia!.vkUrl,
          phone: userMedia!.phone,
        },
      });
      toast({
        title: "Контакты успешно обновлены",
      });
      setLastUserMedia(userMedia);
      setIsEdit(false);
    } catch (e) {
      if (isApiError(e)) {
        toast({
          title: "Произошла ошибка",
          description: "Попробуйте еще раз позже",
          variant: "destructive",
        });
      }
    }
  }, [putUserMedia, toast, userMedia]);

  const content = useMemo(() => {
    if (isEdit) {
      return (
        <>
          <Input
            icon={<EnvelopeOpenIcon className="w-4 h-4" />}
            placeholder="Email"
            className="py-0"
            inputStyles="pl-9"
            value={userMedia?.email}
            onChange={onChangeEmailField}
          />
          <Input
            icon={<PaperPlaneIcon className="w-4 h-4" />}
            placeholder="Telegram"
            className="py-0"
            inputStyles="pl-9"
            value={userMedia?.tgUrl}
            onChange={onChangeTgField}
          />
          <Input
            icon={<LinkNone1Icon className="w-4 h-4" />}
            placeholder="Телефон"
            className="py-0"
            inputStyles="pl-9"
            value={userMedia?.phone}
            onChange={onChangePhoneField}
          />
          <Input
            icon={<VkSvgIcon className="w-4 h-4" />}
            placeholder="VK"
            className="py-0"
            inputStyles="pl-9"
            value={userMedia?.vkUrl}
            onChange={onChangeVkField}
          />
        </>
      );
    } else {
      return (
        <>
          {/* TODO переделать на линк теги */}
          <Typography
            className={"w-max flex gap-3 items-center"}
            affects={"link"}
          >
            <EnvelopeOpenIcon className="w-4 h-4" /> {userMedia?.email}
          </Typography>
          <Typography
            className={"w-max flex gap-3 items-center"}
            affects={"link"}
          >
            <PaperPlaneIcon className="w-4 h-4" /> {userMedia?.tgUrl}
          </Typography>
          <Typography
            className={"w-max flex gap-3 items-center"}
            affects={"link"}
          >
            {/* TODO поменять иконку */}
            <LinkNone1Icon className="w-4 h-4" /> {userMedia?.phone}
          </Typography>
          <Typography
            className={"w-max flex gap-3 items-center"}
            affects={"link"}
          >
            <VkSvgIcon className="w-4 h-4" /> {userMedia?.vkUrl}
          </Typography>
        </>
      );
    }
  }, [
    isEdit,
    onChangeEmailField,
    onChangePhoneField,
    onChangeTgField,
    onChangeVkField,
    userMedia?.email,
    userMedia?.phone,
    userMedia?.tgUrl,
    userMedia?.vkUrl,
  ]);

  const buttons = useMemo(() => {
    if (!editable) return null;
    if (isEdit) {
      return (
        <div className="ml-auto">
          <Button
            onClick={onCancelClick}
            size={"sm"}
            variant={"ghost"}
            className="mr-2 hover:text-red-700"
          >
            <CrossCircledIcon className="w-5 h-5" />
          </Button>
          <Button
            className="hover:text-green-700"
            onClick={onSaveContacts}
            size="sm"
            variant={"ghost"}
          >
            <CheckCircledIcon className="w-5 h-5" />
          </Button>
        </div>
      );
    } else {
      return (
        <Button
          size="sm"
          variant={"ghost"}
          onClick={onChangeIsEdit}
          className="absolute right-4 top-4"
        >
          <Pencil2Icon className="w-5 h-5" />
        </Button>
      );
    }
  }, []);

  if (!userMedia) {
    return null;
  }

  return (
    <Box className={"w-full flex flex-col gap-2 relative"}>
      <div className="flex">
        <Typography variant={"h3"}>Контакты</Typography>
        {buttons}
      </div>
      {content}
    </Box>
  );
};
