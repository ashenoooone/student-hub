import { cn } from "@/shared/utils";
import React, { ChangeEvent, useCallback, useState } from "react";
import { UserMediaType } from "../model/types";
import { Box } from "@/shared/ui/box";
import { Typography } from "@/shared/ui/typography";
import { Button } from "@/shared/ui/button";
import {
  CheckCircledIcon,
  CrossCircledIcon,
  Pencil2Icon,
} from "@radix-ui/react-icons";
import { Textarea } from "@/shared/ui/textarea";
import { usePutUserAboutMutation } from "../api";
import { useToast } from "@/shared/ui/use-toast";
import { isApiError } from "@/shared/api/utils";

type AboutUserProps = {
  className?: string;
  about?: UserMediaType;
};

export const AboutUser = React.memo((props: AboutUserProps) => {
  const { className, about } = props;
  const [isRedacting, setIsRedacting] = useState(false);
  const [lastNameChanged, setLastAbout] = useState(about?.about);
  const [aboutText, setAboutText] = useState(about?.about);
  const putUserAboutUser = usePutUserAboutMutation().mutateAsync;
  const { toast } = useToast();

  const onRedactClick = useCallback(() => {
    setIsRedacting(!isRedacting);
  }, [isRedacting]);

  const onChangeAboutText = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      setAboutText(event.target.value);
    },
    []
  );

  const onSaveNewAboutMe = useCallback(async () => {
    try {
      await putUserAboutUser({
        params: {
          about: aboutText ?? "",
        },
      });
      toast({
        title: "«О себе» успешно обновлено",
      });
      setLastAbout(aboutText);
      setIsRedacting(false);
    } catch (e) {
      if (isApiError(e)) {
        toast({
          title: "Произошла ошибка",
          description: "Попробуйте еще раз позже",
          variant: "destructive",
        });
      }
    }
  }, [aboutText, putUserAboutUser, toast]);

  const onCancelClick = useCallback(() => {
    setAboutText(lastNameChanged);
    setIsRedacting(false);
  }, [lastNameChanged]);

  if (!about) return null;

  return (
    <Box className={cn("relative", className)}>
      <div className="flex gap-2">
        <Typography variant={"h3"}>О себе</Typography>
        {isRedacting ? (
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
              variant={"ghost"}
              className="hover:text-green-700"
              onClick={onSaveNewAboutMe}
              size="sm"
            >
              <CheckCircledIcon className="w-5 h-5" />
            </Button>
          </div>
        ) : (
          <Button
            size="sm"
            variant={"ghost"}
            onClick={onRedactClick}
            className="absolute right-4 top-4"
          >
            <Pencil2Icon className="w-5 h-5" />
          </Button>
        )}
      </div>
      {isRedacting ? (
        <Textarea
          onChange={onChangeAboutText}
          className="mt-4"
          value={aboutText}
        />
      ) : (
        <Typography
          className={"flex gap-3 items-center mt-4 break-words"}
          affects={"muted"}
        >
          {aboutText}
        </Typography>
      )}
    </Box>
  );
});

AboutUser.displayName = "AboutUser";
