import { FC, PropsWithChildren } from "react";
import { cn } from "@/shared/utils";

type BoxProps = React.ComponentProps<"div"> &
  PropsWithChildren & {
    className?: string;
  };

export const Box: FC<BoxProps> = (props) => {
  const { children, className, ...rest } = props;

  return (
    <div
      className={cn("bg-white rounded-[10px] w-full p-4", className)}
      {...rest}
    >
      {children}
    </div>
  );
};
