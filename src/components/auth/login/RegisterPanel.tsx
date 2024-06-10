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

const RegisterPanel = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

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
    onSubmit(value) {},
  });

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        className="w-full"
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
        className="w-full"
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
        className="w-full"
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
        <Button className="h-11 w-full" type="submit">
          <Text bold>註冊</Text>
        </Button>
      </div>
    </form>
  );
};

export default RegisterPanel;
