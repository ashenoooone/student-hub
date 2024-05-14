import React from 'react';
import {UserRatingMapper, UserType} from "@/entities/user/model/types";
import {Avatar, AvatarFallback} from "@/shared/ui/avatar";
import Image from "next/image";
import {Badge} from "@/shared/ui/badge";
import {Compliment} from "@/pages-composite/profile-page/ui/compliment";

type Props = {
    user: UserType
}

const CardUser = (props: Props) => {
    const { user } = props

    return (
        <div className={"bg-white p-5 rounded-2xl flex flex-row items-start gap-4"}>
            <Avatar className={"w-[100px] h-[100px]"}>
                {user.avatar ? (
                    <Image src={user.avatar} alt={user.login} width={1000} height={1000} className={"w-[100px] h-[100px]"}/>
                ) : (
                    <AvatarFallback className={"w-[100px] h-[100px]"}>{user.login.slice(0, 2)}</AvatarFallback>
                )}
            </Avatar>
            <div className={" flex flex-col mt-2 ml-2"}>
                <div className={"text-md font-medium"}>
                    {user.lastName} {user.firstName} {user.middleName}
                </div>
                <div className={"flex flex-row gap-2 mt-2"}>
                    {user.rolesForProject.slice(0, 2).map((role, index) => (
                                <Badge className={'w-max max-w-[83px] text-ellipsis text-[12px] hover:bg-blue-400 select-none'} key={index}>{role.name}</Badge>
                            ))}
                    {user.rolesForProject.length > 2 && <Badge className={'w-max hover:bg-blue-400 select-none'}>...</Badge>}
                </div>
                <div className={"flex flex-row gap-2 mt-2"}>
                    <Compliment
                        icon={"🤝"}
                        text={UserRatingMapper.politeness}
                        count={user.ratings.politeness}
                    />
                </div>
            </div>
        </div>
    );
};

export default CardUser;