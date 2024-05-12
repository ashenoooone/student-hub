import { ImageIcon } from "@radix-ui/react-icons";
import { cn } from "../utils";

type NoImageAvailableProps = {
  className?: string;
};
// TODO сделать чтобы была оптимизированна

export const NoImageAvailable = (props: NoImageAvailableProps) => {
  const { className } = props;
  return (
    <div
      className={cn(
        "bg-muted rounded-md flex items-center justify-center",
        className
      )}
    >
      <ImageIcon className="w-10 h-10 text-muted-foreground" />
    </div>
  );
};
