import {Typography} from "@/shared/ui/typography";
import {Button} from "@/shared/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/shared/ui/card";
import {Input} from "@/shared/ui/input";
import {cn} from "@/shared/utils";
import Link from "next/link";
import {ROUTES} from "@/shared/conts";
import {usePostLoginUserMutation, UsersService, useUserProfileStore, useUserStore,} from "@/entities/user";
import {useCallback, useState} from "react";
import {useToast} from "@/shared/ui/use-toast";
import {isApiError} from "@/shared/api/utils";
import {useRouter} from "next/router";

type LoginFormProps = {
  className?: string;
};

export const LoginForm = (props: LoginFormProps) => {
  const { className } = props;
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const loginUser = usePostLoginUserMutation();
  const { toast } = useToast();
  const setUser = useUserStore.use.setUser();
  const router = useRouter();
  const setProfile = useUserProfileStore.use.setProfile();

  const onLoginChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setLogin(e.target.value);
    },
    []
  );

  const onPasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
    },
    []
  );

  const onLoginSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await loginUser.mutateAsync({
        params: {
          login,
          password,
        },
      });
      setUser(response.data);
      const { data: profile } = await UsersService.instance.getUserData();
      setProfile(profile);
      await router.replace(ROUTES.main);
    } catch (error: unknown) {
      if (isApiError(error)) {
        toast({
          title: "Произошла ошибка",
          description: error.response?.data?.message,
          variant: "destructive",
        });
      } else {
        console.error(error);
      }
    }
  };

  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <CardTitle>Авторизация</CardTitle>
        <CardDescription>Введите логин и пароль</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onLoginSubmit} className="flex flex-col gap-2">
          <Input
            value={login}
            onChange={onLoginChange}
            required
            label="Логин"
            placeholder="Логин"
            type="text"
          />
          <Input
            value={password}
            onChange={onPasswordChange}
            required
            label="Пароль"
            placeholder="Пароль"
            type="password"
          />
          <Button className="mt-4">Авторизоваться</Button>
          <Typography>
            Нет аккаунта?
            <Button className="ml-2 p-0" variant={"link"}>
              <Link href={ROUTES.registration}>Зарегистрироваться</Link>
            </Button>
          </Typography>
        </form>
      </CardContent>
    </Card>
  );
};
