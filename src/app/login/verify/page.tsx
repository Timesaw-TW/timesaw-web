import VerifyEmailBox from "@/components/auth/login/VerifyEmailBox";
import { Suspense } from "react";

const VerifyPage = () => {
  return (
    <Suspense>
      <VerifyEmailBox className="min-h-[70vh]" />
    </Suspense>
  );
};

export default VerifyPage;
