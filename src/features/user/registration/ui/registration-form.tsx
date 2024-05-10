import {Typography} from "@/shared/ui/typography";
import {Button} from "@/shared/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/shared/ui/card";
import {Input} from "@/shared/ui/input";
import {cn} from "@/shared/utils";
import Link from "next/link";
import {ROUTES} from "@/shared/conts";

type RegistrationFormProps = {
  className?: string;
};

export const RegistrationForm = (props: RegistrationFormProps) => {
  const {className} = props;
  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <CardTitle>Авторизация</CardTitle>
        <CardDescription>Введите логин и пароль</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-2">
          <Input label="Логин" placeholder="Логин" type="text"/>
          <Input label="Пароль" placeholder="Пароль" type="password"/>
          <Button className="mt-4">Авторизоваться</Button>
          <Typography>
            Нет аккаунта?
            <Button className="ml-2 p-0" variant={"link"}>
              <Link href={ROUTES.login}>Войти</Link>
            </Button>
          </Typography>
        </form>
      </CardContent>
    </Card>
  );
};
