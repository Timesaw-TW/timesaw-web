"use client";

import { FC, useEffect, useState } from "react";
import Button from "@/stories/Button";
import TextField from "@/stories/Form/TextField";
import { IconEyeOutline, IconEyeSlashOutline } from "@/stories/Icons";
import Text from "@/stories/Typography/Text";
import { useFormik } from "formik";

interface Props {
  email: string;
  onSuccess: () => unknown;
}

interface forgotProgressField {
  email: string;
}
const ForgetPasswordPanel: FC<Props> = ({ email, onSuccess }) => {
  const [formError, setFormError] = useState<{
    [T in keyof forgotProgressField]?: string;
  }>({});
  const { errors, values, handleChange, handleSubmit } =
    useFormik<forgotProgressField>({
      initialValues: { email: email },
      validateOnBlur: false,
      validateOnChange: false,
      onSubmit: () => {
        if (onSuccess) {
          onSuccess();
        }
      },
    });

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        id="email"
        name="email"
        placeholder="信箱"
        value={email}
        onChange={handleChange}
        errorMessage={{ message: errors.email ?? formError.email }}
        showButton
        button={{
          allowClear: true,
        }}
      ></TextField>
    </form>
  );
};

export default ForgetPasswordPanel;
