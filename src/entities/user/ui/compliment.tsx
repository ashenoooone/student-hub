import React, {ReactNode} from 'react';

type Props = {
    icon: ReactNode;
    text: string
    count: number
}

const ComplimentMini = (props: Props) => {
    const {icon, text, count} = props
    return (
        <div className={"flex flex-row gap-2 items-center bg-muted px-2 py-1 rounded-md cursor-pointer"}>
            <div>{icon}</div>
            <div className={"text-xs font-bold"}>{count}</div>
        </div>
    );
};

export default ComplimentMini;