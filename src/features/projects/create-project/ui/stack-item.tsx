import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/utils";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import React from "react";

type StackItemProps = {
  className?: string;
  name: string;
  onRemove?: (name: string) => void;
};

export const StackItem = React.memo((props: StackItemProps) => {
  const { className, name, onRemove } = props;

  const onClick = () => {
    onRemove?.(name);
  };

  return (
    <Badge className={cn("flex gap-2", className)}>
      {name}
      {onRemove && (
        <Button onClick={onClick} variant={"no"} className="p-0">
          <CrossCircledIcon className="hover:text-red-600 hover:scale-[115%] transition-all cursor-pointer" />
        </Button>
      )}
    </Badge>
  );
});

StackItem.displayName = "StackItem";
