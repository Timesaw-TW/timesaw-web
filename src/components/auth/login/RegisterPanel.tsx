"use client";

import { FC, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@/stories/Button";
import TextField from "@/stories/Form/TextField";
import { IconEyeOutline, IconEyeSlashOutline } from "@/stories/Icons";
import Text from "@/stories/Typography/Text";
import { useRegister } from "@/gql-requests/user/auth";
import { Modal, ModalProps } from "@/components/util/Modal";
import Headline from "@/stories/Typography/Headline";
import SubHeadline from "@/stories/Typography/SubHeadline";
import { ApolloError } from "@apollo/client";
import { ErrorCodeGQL } from "@/gql-requests/error-code";
import useJWT from "@/hooks/useJWT";

const getEyeIcon = (show: boolean) => {
  const Icon = show ? IconEyeSlashOutline : IconEyeOutline;
  return <Icon />;
};

interface RegisterField {
  email: string;
  password: string;
  confirmPassword: string;
}

interface Props {
  onSuccess?: () => unknown;
}

const RegisterPanel: FC<Props> = ({ onSuccess }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [modalProps, setModalProps] = useState<ModalProps | null>(null);
  const [formError, setFormError] = useState<{
    [T in keyof RegisterField]?: string;
  }>({});
  const [register] = useRegister();
  const { setToken } = useJWT();

  const { errors, values, handleChange, handleSubmit } =
    useFormik<RegisterField>({
      initialValues: { email: "", password: "", confirmPassword: "" },
      validationSchema: yup.object({
        email: yup.string().required("請填寫信箱").email("Email 格式錯誤"),
        password: yup.string().required("請填寫密碼"),
        confirmPassword: yup
          .string()
          .required("請確認密碼")
          .oneOf([yup.ref("password")], "密碼不一致"),
      }),
      validateOnBlur: false,
      validateOnChange: false,
      onSubmit({ email, password }) {
        register({
          variables: {
            email,
            password,
          },
        })
          .then(({ data }) => {
            if (!data?.register) {
              return;
            }

            setToken(data.register);
            setModalProps({
              content: (
                <div className="flex flex-col gap-1">
                  <Headline bold>驗證電子郵件以完成註冊</Headline>
                  <SubHeadline>
                    已寄送驗證碼至您註冊 Timesaw 的信箱，請輸入信件中的 6
                    碼驗證碼以完成註冊
                  </SubHeadline>
                </div>
              ),
              footer: (
                <div className="flex justify-end gap-4">
                  <Button className="w-[5.5rem]" onClick={onSuccess}>
                    <SubHeadline>確認</SubHeadline>
                  </Button>
                </div>
              ),
            });
          })
          .catch(({ graphQLErrors }: ApolloError) => {
            if (
              graphQLErrors.length &&
              graphQLErrors.some(
                (e) => e.extensions?.code === ErrorCodeGQL.EMAIL_EXISTS
              )
            ) {
              setFormError({ email: "信箱已註冊，請使用登入" });
            }
          });
      },
    });

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextField
          id="email"
          name="email"
          placeholder="信箱"
          value={values.email}
          onChange={handleChange}
          errorMessage={{ message: errors.email ?? formError.email }}
          showButton
          button={{
            allowClear: true,
          }}
        />
        <TextField
          id="password"
          name="password"
          placeholder="密碼"
          showButton
          type={showPassword ? "text" : "password"}
          button={{
            element: getEyeIcon(showPassword),
            onClick: () => setShowPassword(!showPassword),
          }}
          value={values.password}
          onChange={handleChange}
          errorMessage={{ message: errors.password }}
        />
        <TextField
          id="confirmPassword"
          name="confirmPassword"
          placeholder="確認密碼"
          showButton
          type={showConfirmPassword ? "text" : "password"}
          button={{
            element: getEyeIcon(showConfirmPassword),
            onClick: () => setShowConfirmPassword(!showConfirmPassword),
          }}
          value={values.confirmPassword}
          onChange={handleChange}
          errorMessage={{ message: errors.confirmPassword }}
        />
        <div className="py-2">
          <Button type="submit">
            <Text bold>註冊</Text>
          </Button>
        </div>
      </form>
      {modalProps && <Modal {...modalProps} />}
    </>
  );
};

export default RegisterPanel;
