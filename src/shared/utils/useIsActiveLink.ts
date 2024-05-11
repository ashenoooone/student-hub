import { useRouter } from "next/router";

export const isActiveLink = (linkName: string) => {
  // eslint-disable-next-line
  const router = useRouter();
  return router.pathname === linkName;
};
