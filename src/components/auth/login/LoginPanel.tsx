"use client";

import { FC, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@/stories/Button";
import TextField from "@/stories/Form/TextField";
import { IconEyeOutline, IconEyeSlashOutline } from "@/stories/Icons";
import Text from "@/stories/Typography/Text";
import useLogin from "@/hooks/user/useLogin";

const getEyeIcon = (show: boolean) => {
  const Icon = show ? IconEyeSlashOutline : IconEyeOutline;
  return <Icon />;
};

interface Props {
  onSuccess?: () => unknown;
}

const LoginPanel: FC<Props> = ({ onSuccess }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { login } = useLogin();

  const { errors, values, handleChange, handleSubmit } = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: yup.object({
      email: yup.string().required("請填寫信箱").email("Email 格式錯誤"),
      password: yup.string().required("請填寫密碼"),
    }),
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit({ email, password }) {
      login({ email, password }).then((user) => {
        if (user) {
          onSuccess?.();
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
        <div className="py-2">
          <Button type="submit">
            <Text bold>登入</Text>
          </Button>
        </div>
      </form>
      {/* <Modal /> */}
    </>
  );
};

export default LoginPanel;
