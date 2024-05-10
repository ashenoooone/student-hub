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
        "container flex flex-col gap-sm flex-grow overflow-y-auto flex-shrink px-[20px] pt-[20px] pb-[45px]",
        className
      )}
    >
      {children}
    </div>
  );
};
