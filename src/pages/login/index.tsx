import { LoginForm } from "@/features/user/login";
import { Page } from "@/shared/ui/page";

export default function Login() {
  return (
    <Page className="items-center">
      <LoginForm className="max-w-[350px] w-full" />
    </Page>
  );
}
