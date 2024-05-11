import {FC, PropsWithChildren} from "react";
import {cn} from "@/shared/utils";

type BoxProps = PropsWithChildren & {
  className?: string;
}

export const Box: FC<BoxProps> = (props) => {
  return (
    <div className={cn('bg-white rounded-[10px] w-full p-4', props.className)}>
      {props.children}
    </div>
  );
};