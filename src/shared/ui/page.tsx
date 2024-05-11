import { cn } from "@/shared/utils";

type PageProps = {
  className?: string;
  children?: React.ReactNode;
};

export const Page = (props: PageProps) => {
  const { className, children } = props;
  return (
    <div
      className={cn(
        "max-w-[1280px] flex flex-col flex-grow flex-shrink-0 box-border gap-sm overflow-y-auto",
        className
      )}
    >
      {children}
    </div>
  );
};
