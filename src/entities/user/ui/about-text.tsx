import { cn } from "@/shared/utils";
import React, { ChangeEvent, useCallback, useMemo, useState } from "react";
import { usePutUserAboutMutation } from "../api";
import { useToast } from "@/shared/ui/use-toast";
import { UserMediaType } from "../model/types";
import { isApiError } from "@/shared/api/utils";
import { Box } from "@/shared/ui/box";
import { Typography } from "@/shared/ui/typography";
import { Button } from "@/shared/ui/button";
import {
  CheckCircledIcon,
  CrossCircledIcon,
  Pencil2Icon,
} from "@radix-ui/react-icons";
import { Textarea } from "@/shared/ui/textarea";

type AboutTextProps = {
  className?: string;
  about?: UserMediaType;
  editable?: boolean;
};

export const AboutText = React.memo((props: AboutTextProps) => {
  const { className, about, editable } = props;
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

  const buttons = useMemo(() => {
    if (!editable) return null;
    if (isRedacting) {
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
            variant={"ghost"}
            className="hover:text-green-700"
            onClick={onSaveNewAboutMe}
            size="sm"
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
          onClick={onRedactClick}
          className="absolute right-0 top-0"
        >
          <Pencil2Icon className="w-5 h-5" />
        </Button>
      );
    }
  }, [editable, isRedacting, onCancelClick, onRedactClick, onSaveNewAboutMe]);

  if (!about) return null;

  return (
    <div className={cn("relative", className)}>
      <div className="flex gap-2">
        <Typography variant={"h3"}>О себе</Typography>
        {buttons}
      </div>
      {!isRedacting ? (
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
          {aboutText && aboutText.length > 0 ? aboutText : "Пусто 🕵️‍♂️"}
        </Typography>
      )}
    </div>
  );
});

AboutText.displayName = "AboutText";
