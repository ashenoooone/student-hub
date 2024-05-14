import { Badge } from "@/shared/ui/badge";
import { cn } from "@/shared/utils";
import React, { useCallback } from "react";
import { RoleType } from "../model/types";
import { Button } from "@/shared/ui/button";
import { Cross1Icon, CrossCircledIcon } from "@radix-ui/react-icons";

type RoleSmallProps = {
  className?: string;
  role: RoleType;
  onRemoveClick?: (roleId: number) => void;
};

export const RoleSmall = React.memo((props: RoleSmallProps) => {
  const { className, role, onRemoveClick } = props;

  const onRemoveClickHandler = useCallback(() => {
    onRemoveClick?.(role.id);
  }, [onRemoveClick, role.id]);

  return (
    <Badge
      variant={"outline"}
      className={cn(
        "group py-1 relative px-4 transition-all flex items-center",
        {
          "hover:pr-7 hover:pl-2": onRemoveClick,
        },
        className
      )}
    >
      {role.name}
      {onRemoveClick && (
        <Cross1Icon
          onClick={onRemoveClickHandler}
          className="w-3 h-3 transition-all cursor-pointer opacity-0 group-hover:opacity-100 hidden px-0 group-hover:block absolute right-2 hover:text-red-800"
        />
      )}
    </Badge>
  );
});

RoleSmall.displayName = "RoleSmall";
