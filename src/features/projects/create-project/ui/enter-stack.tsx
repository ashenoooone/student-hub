import { Box } from "@/shared/ui/box";
import { Typography } from "@/shared/ui/typography";
import { cn } from "@/shared/utils";
import React from "react";
import { StackItem } from "./stack-item";
import { Input } from "@/shared/ui/input";

type EnterStackProps = {
  className?: string;
  stack?: string[];
  onAddToStack?: (stackItem: string) => void;
  onRemoveFromStack?: (stackItem: string) => void;
};

export const EnterStack = React.memo((props: EnterStackProps) => {
  const { className, onAddToStack, stack, onRemoveFromStack } = props;

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const notEmpty = e.currentTarget.value.trim().length > 0;
    const enterPressed = e.key === "Enter";
    const spacePressed = e.key === " ";
    const valueLength = e.currentTarget.value.length > 0;
    const notInStack = !stack?.includes(
      e.currentTarget.value.trim().toLowerCase()
    );

    if (enterPressed || spacePressed) {
      if (notEmpty && valueLength && notInStack) {
        onAddToStack?.(e.currentTarget.value.trim().toLowerCase());
        e.currentTarget.value = "";
      } else {
        e.preventDefault();
      }
    }
  };

  return (
    <div className={cn("", className)}>
      <Typography variant={"h3"} className="text-lg">
        Стек (разделяйте через пробел):
      </Typography>
      <Box className="border flex items-stretch gap-2">
        {stack?.map((stackItem) => (
          <StackItem
            key={stackItem}
            name={stackItem}
            onRemove={onRemoveFromStack}
          />
        ))}
        <Input
          inputStyles="h-full"
          onKeyDown={onInputKeyDown}
          placeholder="Добавить в стек"
          className="max-w-[150px]"
        />
      </Box>
    </div>
  );
});

EnterStack.displayName = "EnterStack";
