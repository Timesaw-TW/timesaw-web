import { merge } from "@/libs/tailwind";
import LoginBox from "@/components/auth/login/LoginBox";

const LoginPage = () => {
  return (
    <LoginBox
      className={merge("sm:w-[30rem] lg:w-[22.5rem]", "px-4 pt-6 lg:px-0")}
    />
  );
};

export default LoginPage;
