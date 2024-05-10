import {Page} from "@/shared/ui/page";
import {RegistrationForm} from "@/features/user/registration";

const Register = () => {
  return (
    <Page className="items-center justify-center">
      <RegistrationForm className="max-w-[350px] w-full"/>
    </Page>
  );
};

export default Register