"use client";
import ResetPassWordBox from "@/components/auth/reset/password/ResetPassWordBox";
import { Suspense } from "react";

const ForgetPage = () => {
  return (
    <Suspense>
      <div className="h-100vh ">
        <ResetPassWordBox />
      </div>
    </Suspense>
  );
};

export default ForgetPage;
