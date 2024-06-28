"use client";

import { FC, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useFormik } from "formik";
import * as yup from "yup";
import { merge } from "@/libs/tailwind";
import Headline from "@/stories/Typography/Headline";
import Text from "@/stories/Typography/Text";
import ThirdPartyPanel from "./ThirdPartyPanel";
import ContentFooter from "./ContentFooter";
import TextField from "@/stories/Form/TextField";
import Button from "@/stories/Button";
import Caption from "@/stories/Typography/Caption";
import { PageType } from "./LoginBox";
import Link from "next/link";

interface Props {
  className?: string;
}

const VerifyEmailBox: FC<Props> = ({ className }) => {
  const searchParams = useSearchParams();
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

  const { errors, values, handleChange, handleSubmit } = useFormik({
    initialValues: { email: searchParams?.get("email") ?? "" },
    validationSchema: yup.object({
      email: yup.string().required("請填寫信箱").email("Email 格式錯誤"),
    }),
    onSubmit(value) {
      if (!disableSubmitSeconds) {
        setDisableSubmitSeconds(60);
      }
    },
  });

  return (
    <div className={merge("h-full w-full", "flex flex-col gap-6", className)}>
      <Headline bold>重新驗證信箱</Headline>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            id="email"
            name="email"
            value={values.email}
            placeholder="信箱"
            onChange={handleChange}
            errorMessage={{ message: errors.email }}
            showButton
            button={{
              allowClear: true,
            }}
          />
          <div className="py-2">
            <Button type="submit" disabled={disableSubmitSeconds !== 0}>
              <Text bold>
                寄送驗證信
                {disableSubmitSeconds !== 0 && ` (${disableSubmitSeconds}s)`}
              </Text>
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-end px-4">
          <Caption>還沒有帳號?</Caption>
          <Link
            href={{
              pathname: "/login",
              query: { type: "register" as PageType },
            }}
          >
            <Button className="h-8 w-12 bg-transparent px-3 py-2">
              <Caption className="text-soda-100" bold>
                註冊
              </Caption>
            </Button>
          </Link>
        </div>
      </form>
      <ThirdPartyPanel />
      <ContentFooter className="flex justify-center" />
    </div>
  );
};

export default VerifyEmailBox;
