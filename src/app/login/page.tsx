import LoginBox from "@/components/auth/login/LoginBox";
import { Suspense } from "react";

const LoginPage = () => {
  return (
    <Suspense>
      <LoginBox />
    </Suspense>
  );
};

export default LoginPage;
