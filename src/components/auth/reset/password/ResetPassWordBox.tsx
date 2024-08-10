"use client";

import { merge } from "@/libs/tailwind";
import { FC, useState } from "react";
import ResetPassWordPanel from "./ResetPassWordPanel";
import Caption from "@/stories/Typography/Caption";
import { useResetPassword } from "@/gql-requests/ password-reset/password-reset";
import useUrlQueryParam from "@/hooks/route/useUrlQueryParam";
import { useRouter } from "next/navigation";

interface Props {
  className?: string;
}

const ResetPassWordBox: FC<Props> = ({ className }) => {
  const [resetPassword] = useResetPassword();
  const token = useUrlQueryParam("token");
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleResetPassword = async (newPassword: string) => {
    if (!token) {
      setMessage("無效的token");
      return;
    }

    setIsLoading(true);
    try {
      const result = await resetPassword({
        variables: { token, newPassword },
      });

      if (result.data?.resetPassword) {
        setMessage("密碼重置成功！");
        setTimeout(() => router.push("/login"), 2000);
      } else {
        setMessage("密碼重置失敗，請重試。");
      }
    } catch (error) {
      console.error("密碼重置出錯", error);
      setMessage("密碼重設過程中發生錯誤，請稍後重試。");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={merge("h-full w-full", "flex flex-col gap-6 p-4", className)}
    >
      <Caption className="text-lg" bold>
        重設密碼
      </Caption>
      <div className="flex flex-col gap-4">
        <ResetPassWordPanel
          onSuccess={handleResetPassword}
          isLoading={isLoading}
        />
        {message && (
          <Caption
            className="text-center"
            // color={message.includes("成功") ? "text-green-500" : "text-red-500"}
          >
            {message}
          </Caption>
        )}
      </div>
    </div>
  );
};

export default ResetPassWordBox;
