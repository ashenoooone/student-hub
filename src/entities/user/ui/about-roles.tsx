import { cn } from "@/shared/utils";
import React, { useCallback, useMemo, useState } from "react";
import { UserType } from "../model/types";
import { Typography } from "@/shared/ui/typography";
import { RoleSmall, RoleType } from "@/entities/role";
import { Badge } from "@/shared/ui/badge";
import { PlusCircledIcon, PlusIcon } from "@radix-ui/react-icons";
import { Button } from "@/shared/ui/button";
import { useDeleteUserRolesMutation, usePatchUserRolesMutation } from "../api";
import { useToast } from "@/shared/ui/use-toast";
import { isAxiosError } from "axios";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Item, SearchCombobox } from "@/shared/ui/search-combobox";

type AboutRolesProps = {
  className?: string;
  profile: UserType;
  roles?: RoleType[];
  editable?: boolean;
};

export const AboutRoles = React.memo((props: AboutRolesProps) => {
  const { className, profile, roles: defaultRoles, editable } = props;
  const [roles, setRoles] = useState(profile.rolesForProject);
  const removeRole = useDeleteUserRolesMutation().mutateAsync;
  const addRole = usePatchUserRolesMutation().mutateAsync;
  const { toast } = useToast();

  const rolesItems = useMemo<Item[]>(() => {
    return (
      defaultRoles?.map((i) => ({
        label: i.name,
        value: `${i.id}`,
      })) ?? []
    );
  }, [defaultRoles]);

  const onAddToleClick = useCallback(
    async (id: string) => {
      try {
        await addRole({
          params: {
            roleId: +id,
          },
        });
        setRoles((roles) => [
          ...roles,
          defaultRoles?.find((i) => i.id === +id)!,
        ]);
        toast({
          title: "Успешно",
          description: "Роль была добавлена",
        });
      } catch (e) {
        if (isAxiosError(e)) {
          toast({
            title: "Произошла ошибка",
            description: e.response?.data.message,
            variant: "destructive",
          });
        }
      }
    },
    [addRole, defaultRoles, toast]
  );

  const onRemoveClick = useCallback(async (id: number) => {
    try {
      await removeRole({
        params: {
          roleId: id,
        },
      });
      setRoles((roles) => roles.filter((i) => i.id !== id));
      toast({
        title: "Успешно",
        description: "Роль была удалена",
      });
    } catch (e) {
      if (isAxiosError(e)) {
        toast({
          title: "Произошла ошибка",
          description: e.response?.data.message,
          variant: "destructive",
        });
      }
    }
  }, []);

  return (
    <div className={cn("", className)}>
      <Typography variant={"h3"}>Роли</Typography>
      <div className="flex gap-2 flex-wrap mt-2 items-center">
        {roles.map((role, index) => (
          <RoleSmall
            onRemoveClick={editable ? onRemoveClick : undefined}
            role={role}
            key={`role${role.id}${role.name}`}
          />
        ))}
        {editable && (
          <SearchCombobox
            onItemClick={onAddToleClick}
            className="ml-2"
            closeOnClick
            hasSearch
            trigger={
              <Button size={"sm"} className="max-h-5" variant={"ghost"}>
                <PlusCircledIcon className="w-5 h-5" />
              </Button>
            }
            items={rolesItems}
          />
        )}
      </div>
    </div>
  );
});

AboutRoles.displayName = "AboutRoles";
