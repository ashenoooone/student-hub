import { useQueryClient } from "@tanstack/react-query";

export const useGetFromCache = (query_key: string) => {
  const queryClient = useQueryClient();

  return queryClient.getQueryData([query_key]);
};
