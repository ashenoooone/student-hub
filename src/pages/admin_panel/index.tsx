import { UsersService } from "@/entities/user";
import { TokensResponseType, UserType } from "@/entities/user/model/types";
import { Page } from "@/shared/ui/page";
import { AdminPanel } from "@/widgets/admin-panel";
import { GetServerSideProps } from "next";

export const getServerSideProps = (async (context) => {
  try {
    if (!context.req.cookies.cookie_user) return { notFound: true };

    const token = JSON.parse(
      context.req.cookies.cookie_user
    ) as TokensResponseType;

    const authConfig = {
      config: {
        headers: {
          Authorization: `${token.type} ${token.accessToken}`,
        },
      },
    };
    const profile = await UsersService.instance.getUserData(authConfig);

    if (!profile.data.roles.includes("ADMIN")) {
      // TODO подумать над тем, чтобы выводить сообщение об ошибке юзеру который попробует попасть в админку
      throw new Error("хорошая попытка");
    }

    return {
      props: {
        profile: profile.data,
      },
    };
  } catch (e) {
    console.log(e);
    return {
      notFound: true,
    };
  }
}) satisfies GetServerSideProps<Props>;

interface Props {
  profile: UserType;
}

export default function AdminPanelPage(props: Props) {
  return (
    <Page>
      <AdminPanel />
    </Page>
  );
}
