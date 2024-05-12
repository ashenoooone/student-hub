import { FC, PropsWithChildren } from "react";
import { cn } from "@/shared/utils";
import { VariantProps, cva } from "class-variance-authority";

const boxVariants = cva(" rounded-[10px] w-full p-4", {
  variants: {
    variant: {
      default: "bg-white",
      blue: "bg-blue-400/20",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type BoxProps = React.ComponentProps<"div"> &
  PropsWithChildren &
  VariantProps<typeof boxVariants> & {
    className?: string;
  };

export const Box: FC<BoxProps> = (props) => {
  const { children, className, variant, ...rest } = props;

  return (
    <div className={cn("", boxVariants({ variant, className }))} {...rest}>
      {children}
    </div>
  );
};
