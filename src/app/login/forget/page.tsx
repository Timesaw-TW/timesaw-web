import ForgetPasswordBox from "@/components/auth/forget/ForgetPassWordBox";
import { Suspense } from "react";

const ForgetPage = () => {
  return (
    <Suspense>
      <div className="h-100vh ">
        <ForgetPasswordBox />
      </div>
    </Suspense>
  );
};

export default ForgetPage;
