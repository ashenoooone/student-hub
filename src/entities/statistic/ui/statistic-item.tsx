import { Box } from "@/shared/ui/box";
import { cn } from "@/shared/utils";
import React, { ReactNode } from "react";

type StatisticItemProps = {
  className?: string;
  icon: ReactNode;
  text: ReactNode;
};

export const StatisticItem = React.memo((props: StatisticItemProps) => {
  const { className, icon, text } = props;
  return (
    <Box
      className={cn(
        "hover:scale-[101%] transition-all cursor-pointer font-bold uppercase flex text-center flex-col items-center gap-2",
        className
      )}
    >
      <span className="text-3xl">{icon}</span>
      <span className="text-white">{text}</span>
    </Box>
  );
});

StatisticItem.displayName = "StatisticItem";
