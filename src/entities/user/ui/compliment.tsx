import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/ui/tooltip";
import React, { ReactNode } from "react";

type Props = {
  icon: ReactNode;
  text: string;
  count: number;
};

const ComplimentMini = (props: Props) => {
  const { icon, text, count } = props;
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={
              "flex flex-row gap-2 items-center bg-muted px-2 py-1 rounded-md cursor-pointer"
            }
          >
            <div>{icon}</div>
            <div className={"text-xs font-bold"}>{count}</div>
          </div>
        </TooltipTrigger>
        <TooltipContent className="bg-muted-foreground text-muted">
          {text}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ComplimentMini;
