"use client";

import { FC } from "react";
import Button from "@/stories/Button";
import TextField from "@/stories/Form/TextField";
import { useFormik } from "formik";
import * as Yup from "yup";

interface Props {
  onSuccess: (newPassword: string) => Promise<void>;
  isLoading: boolean;
}

interface ResetPasswordFields {
  newPassword: string;
  confirmPassword: string;
}

const validationSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(8, "密碼至少要八個字")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "密碼需要包含大小寫字母跟數字")
    .required("請輸入新密碼"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "兩次輸入的密碼不一致")
    .required("請再次輸入新密碼"),
});

const ResetPassWordPanel: FC<Props> = ({ onSuccess, isLoading }) => {
  const formik = useFormik<ResetPasswordFields>({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    onSubmit: (values) => {
      onSuccess(values.newPassword);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <TextField
        id="newPassword"
        name="newPassword"
        type="password"
        placeholder="请输入新密码"
        value={formik.values.newPassword}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        errorMessage={{
          message: formik.touched.newPassword && formik.errors.newPassword,
        }}
        showButton
        button={{
          allowClear: true,
        }}
      />
      <TextField
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        placeholder="请再次输入新密码"
        value={formik.values.confirmPassword}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        errorMessage={{
          message:
            formik.touched.confirmPassword && formik.errors.confirmPassword,
        }}
        showButton
        button={{
          allowClear: true,
        }}
      />
      <Button type="submit" className="h-10 w-full px-3 py-2">
        {isLoading ? "重置中..." : "重設密碼"}
      </Button>
    </form>
  );
};

export default ResetPassWordPanel;
