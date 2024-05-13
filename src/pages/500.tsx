import { Box } from "@/shared/ui/box";
import { Typography } from "@/shared/ui/typography";

export default function Custom500() {
  return (
    <Box className="flex flex-col justify-center items-center min-h-[240px]">
      <Typography variant={"h2"} affects={"error"}>
        Internal Server Error
      </Typography>
    </Box>
  );
}
