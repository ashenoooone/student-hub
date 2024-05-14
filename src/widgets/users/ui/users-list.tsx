import React from 'react';
import {UserType} from "@/entities/user/model/types";
import CardUser from "@/entities/user/ui/card-user";

type Props = {
    content: UserType[] | undefined
}

const UsersList = (props: Props) => {
    const {content} = props
    console.log(content?.length + " ffffffffffffffffffff")
    return (
        <div className={"mt-4"}>
            <div className={"text-2xl font-medium my-8"}>
                Найденные пользователи:
            </div>
            <div className={"grid grid-cols-3 gap-5"}>
                {
                    content?.map((item, index) => {
                        return (
                            <CardUser
                                user={item}
                                key={`${item.id}${index}`}
                            />
                        )
                    })
                }
            </div>
        </div>
    );
};

export default UsersList;