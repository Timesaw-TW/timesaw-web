"use client";

import { merge } from "@/libs/tailwind";
import Button from "@/stories/Button";
import { FC, useMemo, useState } from "react";
import ForgetPasswordPanel from "./ForgetPassWordPanel";
import Caption from "@/stories/Typography/Caption";
import ContentFooter from "../login/ContentFooter";
import ThirdPartyPanel from "../login/ThirdPartyPanel";
import useModal from "@/hooks/useModal";
import useUrlQueryParam from "@/hooks/route/useUrlQueryParam";
import { useSendResetPasswordEmail } from "@/gql-requests/ password-reset/password-reset";
interface Props {
  className?: string;
}
const ForgetPasswordBox: FC<Props> = ({ className }) => {
  const { setModal, closeModal } = useModal();
  const [error, setError] = useState("");
  const email = useUrlQueryParam("email");
  const [sendResetPasswordEmail] = useSendResetPasswordEmail(email);

  const handleResetPassword = () => {
    setModal({
      content: (
        <div className="flex flex-col gap-6">
          <Caption bold className="text-lg ">
            至電子郵件重設密碼
          </Caption>
          <Caption className="text-base">
            已寄送電子郵件至您的信箱，請點選信件中的鏈接以重設密碼。
          </Caption>
        </div>
      ),
      successLabel: "確認",
      onSuccess: async () => {
        try {
          const res = await sendResetPasswordEmail({ variables: { email } });
          if (res.data?.sendResetPasswordEmail === null) {
            setError("此電子郵件未註冊，請檢查後再試。");
          }
          closeModal();
        } catch (error) {
          setError("請求失敗，請稍後再試。");
        }
      },
      onCancel: () => {},
      modalClassName:
        "absolute top-[43vh] left-1/2 transform -translate-x-1/2 w-[328px]",
    });
  };
  return (
    <div
      className={merge(
        "h-full w-full",
        "flex flex-col gap-6 px-4 pb-4 pt-1",
        className
      )}
    >
      <Caption className="text-lg" bold>
        忘記密碼
      </Caption>
      <div className="flex flex-col gap-4">
        <ForgetPasswordPanel email={email} onSuccess={handleResetPassword} />
        <Button
          className="h-10 w-full px-3 py-2"
          onClick={() => {
            handleResetPassword();
          }}
        >
          <Caption className="text-black" bold>
            重設密碼
          </Caption>
        </Button>
        <div className="flex items-center justify-end">
          <Caption>還沒有帳號?</Caption>
          <Button
            role="switch"
            className="h-8 w-12 bg-transparent px-3 py-2"
            onClick={() => {}}
          >
            <Caption className="text-soda-100" bold>
              註冊
            </Caption>
          </Button>
        </div>
      </div>
      <ThirdPartyPanel />
      <ContentFooter className="mt-4 flex  justify-center" />
    </div>
  );
};

export default ForgetPasswordBox;
