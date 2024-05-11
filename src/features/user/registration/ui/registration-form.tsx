import { Typography } from "@/shared/ui/typography";
import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { cn } from "@/shared/utils";
import Link from "next/link";
import { ROUTES } from "@/shared/conts";
import { FormEventHandler } from "react";
import { UsersService } from "@/entities/user";
import { PostRegisterUserParams } from "@/entities/user/model/types";
import { useUserStore } from "@/entities/user";
import { isApiError } from "@/shared/api/utils";
import { useToast } from "@/shared/ui/use-toast";
import { useRouter } from "next/router";

type RegistrationFormProps = {
  className?: string;
};

export const RegistrationForm = (props: RegistrationFormProps) => {
  const { className } = props;
  const router = useRouter();
  const setUser = useUserStore.use.setUser();
  const setProfile = useUserStore.use.setProfile();
  const { toast } = useToast();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    Object.fromEntries(formData);
    try {
      const { data: tokens } = await UsersService.instance.register(
        Object.fromEntries(formData) as PostRegisterUserParams
      );
      setUser(tokens);
      const { data: profile } = await UsersService.instance.getUserData();
      setProfile(profile);
      await router.replace(ROUTES.main);
    } catch (e) {
      if (isApiError(e)) {
        toast({
          title: "Произошла ошибка",
          description: e.response?.data?.message,
          variant: "destructive",
        });
      }
    }
  };

  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <CardTitle>Регистрация</CardTitle>
        <CardDescription>Введите логин, почту и пароль</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <Input
            name="login"
            label="Логин"
            placeholder="Логин"
            type="text"
            required
            minLength={4}
          />
          <Input
            name="email"
            label="Почта"
            placeholder="Почта"
            type="email"
            required
            minLength={5}
          />
          <Input
            name="password"
            label="Пароль"
            placeholder="Пароль"
            type="password"
            required
            minLength={3}
          />
          <div className="flex gap-2">
            <Input
              name="lastName"
              label="Фамилия"
              placeholder="Фамилия"
              type="text"
              required
              minLength={2}
              className="basis-3/5"
            />
            <Input
              name="firstName"
              label="Имя"
              placeholder="Имя"
              type="text"
              required
              minLength={3}
              className="basis-2/5"
            />
          </div>
          <Input
            name="middleName"
            label="Отчество"
            placeholder="Отчество"
            type="text"
            minLength={3}
          />
          <Button className="mt-4">Зарегистрироваться</Button>
          <Typography>
            Есть аккаунт?
            <Button type={"submit"} className="ml-2 p-0" variant={"link"}>
              <Link href={ROUTES.login}>Войти</Link>
            </Button>
          </Typography>
        </form>
      </CardContent>
    </Card>
  );
};
