"use client";

import { FC, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@/stories/Button";
import TextField from "@/stories/Form/TextField";
import { IconEyeOutline, IconEyeSlashOutline } from "@/stories/Icons";
import Text from "@/stories/Typography/Text";
import useLogin from "@/hooks/user/useLogin";
import { User } from "@/gql-requests/user/user";

const getEyeIcon = (show: boolean) => {
  const Icon = show ? IconEyeSlashOutline : IconEyeOutline;
  return <Icon />;
};

interface LoginField {
  email: string;
  password: string;
}

interface Props {
  onSuccess?: (user: User) => unknown;
  email?: string;
  onEmailChange?: (email: string) => void;
}

const LoginPanel: FC<Props> = ({ onSuccess, onEmailChange }) => {
  const { login } = useLogin();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formError, setFormError] = useState<{
    [T in keyof LoginField]?: string;
  }>({});

  const { errors, values, handleChange, handleSubmit } = useFormik<LoginField>({
    initialValues: { email: "", password: "" },
    validationSchema: yup.object({
      email: yup.string().required("請填寫信箱").email("Email 格式錯誤"),
      password: yup.string().required("請填寫密碼"),
    }),
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit({ email, password }) {
      login({ email, password })
        .then((user) => {
          if (user) {
            onSuccess?.(user);
          }
        })
        .catch(() => {
          setFormError({
            email: "信箱不存在或密碼輸入錯誤",
            password: "信箱不存在或密碼輸入錯誤",
          });
        });
    },
  });

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
    if (onEmailChange) {
      onEmailChange(e.target.value);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        id="email"
        name="email"
        placeholder="信箱"
        value={values.email}
        onChange={handleEmailChange}
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
        errorMessage={{ message: errors.password ?? formError.password }}
      />
      <div className="py-2">
        <Button type="submit">
          <Text bold>登入</Text>
        </Button>
      </div>
    </form>
  );
};

export default LoginPanel;
