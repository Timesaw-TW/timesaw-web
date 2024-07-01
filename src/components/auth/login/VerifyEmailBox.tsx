"use client";

import { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { merge } from "@/libs/tailwind";
import Headline from "@/stories/Typography/Headline";
import Text from "@/stories/Typography/Text";
import ThirdPartyPanel from "./ThirdPartyPanel";
import ContentFooter from "./ContentFooter";
import TextField from "@/stories/Form/TextField";
import Button from "@/stories/Button";
import {
  useEmailVerify,
  useResendVerificationEmail,
} from "@/gql-requests/user/auth";
import { ApolloError } from "@apollo/client";
import { ErrorCodeGQL } from "@/gql-requests/error-code";
import { useRouter } from "next/navigation";
import useModal from "@/hooks/useModal";
import SubHeadline from "@/stories/Typography/SubHeadline";
import useLogin from "@/hooks/user/useLogin";

interface FormField {
  code: string;
}

interface Props {
  className?: string;
}

const VerifyEmailBox: FC<Props> = ({ className }) => {
  const { fetchUser } = useLogin();
  const [verify] = useEmailVerify();
  const [resend] = useResendVerificationEmail();
  const { replace } = useRouter();
  const { setModal, closeModal } = useModal();
  const [formError, setFormError] = useState<{
    [key in keyof FormField]?: string;
  }>({});
  const [disableSubmitSeconds, setDisableSubmitSeconds] = useState<number>(0);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (disableSubmitSeconds) {
      timeout = setTimeout(() => {
        setDisableSubmitSeconds((x) => x - 1);
      }, 1000);
    }
    return () => clearTimeout(timeout);
  }, [disableSubmitSeconds]);

  const { errors, values, handleChange, handleSubmit } = useFormik<FormField>({
    initialValues: { code: "" },
    validationSchema: yup.object({
      code: yup.string().required("請填寫驗證碼"),
    }),
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit(value) {
      verify({ variables: { token: value.code } })
        .then(({ data }) => {
          if (data?.verifyEmail) {
            fetchUser().then(({ data: userData }) => {
              if (userData?.me) {
                replace("/");
                setModal({
                  content: (
                    <div className="flex flex-col gap-1">
                      <Headline bold>電子郵件驗證成功</Headline>
                      <SubHeadline>
                        已完成註冊流程，開始規劃時間吧！
                      </SubHeadline>
                    </div>
                  ),
                  successLabel: "開始使用",
                  onSuccess: () => {
                    closeModal();
                  },
                });
              }
            });
          } else {
            setFormError({ code: "驗證失敗" });
          }
        })
        .catch(({ graphQLErrors }: ApolloError) => {
          if (
            graphQLErrors.length &&
            graphQLErrors.some(
              (e) => e.extensions?.code === ErrorCodeGQL.INVALID_CODE
            )
          ) {
            setFormError({ code: "驗證碼錯誤" });
          }
        });
    },
  });

  const resendEmail = () => {
    if (disableSubmitSeconds) {
      return;
    }

    resend().then(({ data }) => {
      if (data?.resendVerificationEmail) {
        setDisableSubmitSeconds(60);
      }
    });
  };

  return (
    <div className={merge("h-full w-full", "flex flex-col gap-6", className)}>
      <Headline bold>驗證信箱</Headline>
      <form onSubmit={handleSubmit}>
        <TextField
          id="code"
          name="code"
          value={values.code}
          placeholder="請輸入驗證碼"
          onChange={handleChange}
          errorMessage={{ message: errors.code ?? formError.code }}
          showButton
          button={{
            allowClear: true,
          }}
        />
        <div className="flex flex-col gap-2 py-2">
          <Button type="submit">
            <Text bold>驗證信箱</Text>
          </Button>
          <Button
            disabled={disableSubmitSeconds !== 0}
            className="bg-transparent"
            onClick={resendEmail}
          >
            <Text
              bold
              className={merge(
                "text-soda-100",
                disableSubmitSeconds && "text-secondary"
              )}
            >
              重新寄送驗證碼
              {disableSubmitSeconds !== 0 && ` (${disableSubmitSeconds}s)`}
            </Text>
          </Button>
        </div>
      </form>
      <ThirdPartyPanel />
      <ContentFooter className="flex justify-center" />
    </div>
  );
};

export default VerifyEmailBox;
