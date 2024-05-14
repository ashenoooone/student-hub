import {Page} from "@/shared/ui/page";
import {RegistrationForm} from "@/features/user/registration";
import {UsersFilter} from "@/features/users/filters/ui/filter";
import {UsersListWithFilters} from "@/widgets/users/ui/users-list-with-filters";
import {TokensResponseType, UserType} from "@/entities/user/model/types";
import {UsersService} from "@/entities/user";
import {RoleService, RoleType} from "@/entities/role";
import {GetServerSideProps} from "next";

export const getServerSideProps = (async (context) => {
    try {
        const [roles] = await Promise.all([
            RoleService.instance.getAll(),
        ]);

        return {
            props: {
                rolesForProject: roles.data,
            },
        };
    } catch (e) {
        console.log(e);
        return {
            redirect: {
                destination: "500",
            },
        };
    }
    // @ts-ignore
}) satisfies GetServerSideProps<Props>;

type Props = {
    rolesForProject: RoleType[]
}

const Users = (props: Props) => {
    return (
        <Page className="gap-4">
            <UsersListWithFilters rolesForProject={props.rolesForProject} />
        </Page>
    );
}

export default Users