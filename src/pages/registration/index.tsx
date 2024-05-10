import {LoginForm} from "@/features/user/login";
import {Page} from "@/shared/ui/page";

const Register = () => {
  return (
    <Page className="items-center justify-center">
      <LoginForm className="max-w-[350px] w-full"/>
    </Page>
  );
};

export default Register