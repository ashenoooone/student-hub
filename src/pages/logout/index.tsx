import { useUserProfileStore, useUserStore } from "@/entities/user";
import { ROUTES } from "@/shared/conts";
import { useRouter } from "next/router";
import React from "react";

export default function Logout() {
  const router = useRouter();
  const removeUser = useUserStore.use.removeUser();
  const removeProfile = useUserProfileStore.use.removeProfile();

  React.useEffect(() => {
    removeUser();
    removeProfile();
    router.replace(ROUTES.login);
  }, [removeProfile, removeUser, router]);

  return null;
}
