import VerifyEmailBox from "@/components/auth/login/VerifyEmailBox";
import { Suspense } from "react";

const VerifyPage = () => {
  return (
    <Suspense>
      <VerifyEmailBox />
    </Suspense>
  );
};

export default VerifyPage;
