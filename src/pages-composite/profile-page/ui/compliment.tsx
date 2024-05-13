import { Badge } from "@/shared/ui/badge";
import { Box } from "@/shared/ui/box";
import { Typography } from "@/shared/ui/typography";
import { ReactNode } from "react";

export type ComplimentProps = {
  icon: ReactNode;
  text: ReactNode;
  count: number;
};

export const Compliment = (props: ComplimentProps) => {
  const { icon, text, count } = props;
  return (
    <Box className={"flex flex-col relative gap-2 items-center"}>
      <Badge className="absolute top-2 right-2 bg-muted text-muted-foreground font-bold">
        {count ?? 0}
      </Badge>
      <Typography className="text-4xl m-0">{icon}</Typography>
      <Typography affects={"large"} className={"text-md m-0"}>
        {text}
      </Typography>
    </Box>
  );
};
