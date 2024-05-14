import { TopEvent } from "@/entities/events";
import { EventType } from "@/entities/events/model/types";
import { Box } from "@/shared/ui/box";
import { Typography } from "@/shared/ui/typography";
import { cn } from "@/shared/utils";
import React from "react";

type AboutUsProps = {
  className?: string;
  topEvent?: EventType;
};

export const AboutUs = React.memo((props: AboutUsProps) => {
  const { className, topEvent } = props;
  return (
    <Box className={cn("flex flex-col ", className)}>
      <div className="flex gap-4 w-full">
        <div className="flex basis-1/2 flex-col">
          <Box className="border text-md mb-4">
            <span className="text-3xl">✋</span>{" "}
            <span className="font-bold text-lg">
              Приветствуем вас на студенческом хабе!
            </span>{" "}
            <br />
            <span>
              Мы создали эту платформу для студентов, где они могут делиться
              своими проектами, находить интересные идеи и партнеров для
              совместных проектов.
            </span>
          </Box>
          <Box className="border text-md mb-4 self-end">
            <span className="text-3xl">🎯</span>{" "}
            <span className="font-bold text-lg">Наша цель </span>
            <br />
            Помочь студентам раскрыть свой потенциал, найти единомышленников и
            претворить в жизнь самые смелые идеи. Мы стремимся к тому, чтобы наш
            хаб стал местом, где каждый студент может найти поддержку,
            вдохновение и новые возможности для роста и развития.
          </Box>
          <Box className="border text-md">
            <span className="text-3xl">🤝</span>{" "}
            <span className="font-bold text-lg">
              Мы верим в силу коллективного творчества{" "}
            </span>{" "}
            <br />И хотим сделать этот процесс максимально удобным и доступным
            для всех студентов. Присоединяйтесь к нашему сообществу уже сегодня
            и начните свой творческий путь вместе с нами!
          </Box>
        </div>
        <TopEvent event={topEvent} className="basis-1/2" />
      </div>
    </Box>
  );
});

AboutUs.displayName = "AboutUs";
