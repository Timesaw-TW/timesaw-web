import { merge } from "@/libs/tailwind";
import LoginBox from "@/components/auth/login/LoginBox";
import { Suspense } from "react";

const LoginPage = () => {
  return (
    <Suspense>
      <LoginBox
        className={merge(
          "sm:w-[30rem] lg:w-[22.5rem]",
          "px-4 lg:px-0",
          "sx:py-10 py-6"
        )}
      />
    </Suspense>
  );
};

export default LoginPage;
