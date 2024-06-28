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

const getEyeIcon = (show: boolean) => {
  const Icon = show ? IconEyeSlashOutline : IconEyeOutline;
  return <Icon />;
};

interface Props {
  onSuccess?: () => unknown;
}

const RegisterPanel: FC<Props> = ({ onSuccess }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [modalProps, setModalProps] = useState<ModalProps | null>(null);

  const { errors, values, handleChange, handleSubmit } = useFormik({
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
      }).then((res) => {
        if (!res.errors) {
          setModalProps({
            content: (
              <div className="flex flex-col gap-1">
                <Headline bold>驗證電子郵件以完成註冊</Headline>
                <SubHeadline>
                  已寄送驗證信至您的信箱，請點選信件中的鏈接以完成註冊。
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
            allowClosed: true,
            onClosed: () => onSuccess?.(),
          });
        }
        // TODO: Register failed
      });
    },
  });

  const [register] = useRegister();

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextField
          id="email"
          name="email"
          placeholder="信箱"
          value={values.email}
          onChange={handleChange}
          errorMessage={{ message: errors.email }}
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
