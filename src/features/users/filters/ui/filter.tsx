import { Box } from "@/shared/ui/box";
import {RoleSmall, RoleType, useRolesFroProject} from "@/entities/role";
import { Input } from "@/shared/ui/input";
import React, {ChangeEventHandler, useCallback, useEffect, useState} from "react";
import { useDebounce } from "@/shared/utils/useDebaunce";
import {MagnifyingGlassIcon, PlusCircledIcon} from "@radix-ui/react-icons";
import {
    GetAllProjectsParams,
    useProjectFiltersStore,
} from "@/entities/project";
import { Select } from "@/shared/ui/select";
import {EventStatus} from "@/entities/events/model/types";
import { Checkbox } from "@/shared/ui/checkbox";
import { cn } from "@/shared/utils";
import {GetAllUsersParams} from "@/entities/user/model/types";
import {Item, SearchCombobox} from "@/shared/ui/search-combobox";
import {Button} from "@/shared/ui/button";
import {isAxiosError} from "axios";


interface UsersFilterProps {
    className?: string;
    filters: GetAllUsersParams;
    onUpdateSearchValue: (str: string) => void;
    rolesForProject: RoleType[]
    addRolesChange: (str: RoleType) => void
    removeRolesChange: (str: RoleType) => void
}

export const UsersFilter = (props: UsersFilterProps) => {
    const {
        filters,
        className,
        onUpdateSearchValue,
        rolesForProject,
        addRolesChange,
        removeRolesChange
    } = props;

    console.log(rolesForProject)
    let rolesForProjectToComboBox: Item[] = rolesForProject.map((item, index) => {
        let obj: Item = {
            label: item.name,
            value: item.id.toString(),
            isSelected: index === 0
        }
        return obj
    })

    const [value, setValue] = useState<string | undefined>(filters?.search ?? "");

    const handleValueChange: ChangeEventHandler<HTMLInputElement> = (e) =>
        setValue(e.currentTarget.value);

    const search = useDebounce(value, 500);

    useEffect(() => {
        onUpdateSearchValue?.(search ?? "");
    }, [onUpdateSearchValue, search]);

    const onAddToleClick = useCallback(
        async (role: string) => {
            addRolesChange(rolesForProject.find(item => item.id == +role)!)
        },
        [addRolesChange, rolesForProject]
    );

    const onDeleteRole = useCallback((id: number) => {
        removeRolesChange(filters.roles.find(item => item.id === id)!)
    }, [filters.roles, removeRolesChange])

    return (
        <div className={cn(className, "flex flex-col gap-2")}>
            <Input
                placeholder={"Введите ФИО пользователя"}
                icon={<MagnifyingGlassIcon className="w-4 h-4" />}
                inputStyles="bg-white px-9 py-7 border-0"
                value={value}
                onChange={handleValueChange}
            />
            <div className={"flex flex-row gap-5 items-stretch mt-2"}>
                <div className={"flex flex-row gap-5 bg-white p-4 rounded text-md items-center font-medium"}>
                    <div>
                        Вам требуется роли:
                    </div>
                    {
                        filters.roles.map((item, index) => {
                            return (
                                <RoleSmall role={item} key={`${item.id}${index}`} onRemoveClick={onDeleteRole}/>
                            )
                        })
                    }
                    <SearchCombobox
                        onItemClick={onAddToleClick}
                        items={rolesForProjectToComboBox}
                        closeOnClick
                        trigger={
                        <Button size={"sm"} className="max-h-5" variant={"ghost"}>
                            <PlusCircledIcon className="w-5 h-5" />
                        </Button>
                        }
                    />
                </div>
            </div>
        </div>
    );
};
