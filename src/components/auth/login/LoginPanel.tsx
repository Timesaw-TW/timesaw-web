"use client";

import { useState } from "react";
import Button from "@/stories/Button";
import TextField from "@/stories/Form/TextField";
import { IconEyeOutline, IconEyeSlashOutline } from "@/stories/Icons";
import Text from "@/stories/Typography/Text";
import { useFormik } from "formik";
import * as yup from "yup";

const getEyeIcon = (show: boolean) => {
  const Icon = show ? IconEyeSlashOutline : IconEyeOutline;
  return <Icon />;
};

const LoginPanel = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { errors, values, handleChange, handleSubmit } = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: yup.object({
      email: yup.string().required("請填寫信箱").email("Email 格式錯誤"),
      password: yup.string().required("請填寫密碼"),
    }),
    onSubmit(value) {},
  });

  return (
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
  );
};

export default LoginPanel;