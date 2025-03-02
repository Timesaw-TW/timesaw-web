import { render, fireEvent, waitFor } from "@testing-library/react";
import ResetPassWordPanel from "../ResetPassWordPanel";
import { useFormik } from "formik";

jest.mock("formik", () => ({
  useFormik: jest.fn(),
}));

describe("ResetPassWordPanel", () => {
  const mockOnSuccess = jest.fn();
  const mockHandleSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    // 修正這裡 - 使用 newPassword 而不是 password
    (useFormik as jest.Mock).mockReturnValue({
      values: { newPassword: "Password123", confirmPassword: "Password123" },
      errors: {},
      touched: { newPassword: false, confirmPassword: false },
      isSubmitting: false,
      isValid: true,
      handleSubmit: mockHandleSubmit,
      handleBlur: jest.fn(),
      handleChange: jest.fn(),
      setFieldValue: jest.fn(),
      setFieldTouched: jest.fn(),
    });
  });

  it("應該正確渲染 ResetPassWordPanel", () => {
    const { getByPlaceholderText, getByText } = render(
      <ResetPassWordPanel onSuccess={mockOnSuccess} isLoading={false} />
    );

    expect(getByPlaceholderText("請輸入新密碼")).toBeInTheDocument();
    expect(getByPlaceholderText("請再次輸入新密碼")).toBeInTheDocument();
    expect(getByText("重設密碼")).toBeInTheDocument();
  });

  it("應該顯示密碼長度錯誤訊息", async () => {
    // 為這個測試特別設置 errors
    (useFormik as jest.Mock).mockReturnValue({
      values: { newPassword: "123", confirmPassword: "123" },
      errors: { newPassword: "密碼至少要八個字" },
      touched: { newPassword: true },
      isSubmitting: false,
      handleSubmit: mockHandleSubmit,
      handleBlur: jest.fn(),
      handleChange: jest.fn(),
      setFieldValue: jest.fn(),
      setFieldTouched: jest.fn(),
    });

    const { getByText } = render(
      <ResetPassWordPanel onSuccess={mockOnSuccess} isLoading={false} />
    );

    expect(getByText("密碼至少要八個字")).toBeInTheDocument();
  });

  it("應該顯示密碼格式錯誤訊息", async () => {
    // 為這個測試特別設置 errors
    (useFormik as jest.Mock).mockReturnValue({
      values: { newPassword: "password123", confirmPassword: "password123" },
      errors: { newPassword: "密碼需要包含大小寫字母跟數字" },
      touched: { newPassword: true },
      isSubmitting: false,
      handleSubmit: mockHandleSubmit,
      handleBlur: jest.fn(),
      handleChange: jest.fn(),
      setFieldValue: jest.fn(),
      setFieldTouched: jest.fn(),
    });

    const { getByText } = render(
      <ResetPassWordPanel onSuccess={mockOnSuccess} isLoading={false} />
    );

    expect(getByText("密碼需要包含大小寫字母跟數字")).toBeInTheDocument();
  });

  it("應該顯示兩次密碼不一致的錯誤訊息", async () => {
    // 為這個測試特別設置 errors
    (useFormik as jest.Mock).mockReturnValue({
      values: { newPassword: "Password123", confirmPassword: "Password321" },
      errors: { confirmPassword: "兩次輸入的密碼不一致" },
      touched: { newPassword: true, confirmPassword: true },
      isSubmitting: false,
      handleSubmit: mockHandleSubmit,
      handleBlur: jest.fn(),
      handleChange: jest.fn(),
      setFieldValue: jest.fn(),
      setFieldTouched: jest.fn(),
    });

    const { getByText } = render(
      <ResetPassWordPanel onSuccess={mockOnSuccess} isLoading={false} />
    );

    expect(getByText("兩次輸入的密碼不一致")).toBeInTheDocument();
  });

  it("應該成功提交表單", async () => {
    const submitHandler = jest.fn().mockImplementation(({ newPassword }) => {
      mockOnSuccess(newPassword);
    });

    (useFormik as jest.Mock).mockReturnValue({
      values: { newPassword: "Password123", confirmPassword: "Password123" },
      errors: {},
      touched: { newPassword: true, confirmPassword: true },
      isSubmitting: false,
      isValid: true,
      handleSubmit: submitHandler, // ✅ 模擬 Formik 的提交處理函數
      handleBlur: jest.fn(),
      handleChange: jest.fn(),
    });

    const { getByText } = render(
      <ResetPassWordPanel onSuccess={mockOnSuccess} isLoading={false} />
    );

    const submitButton = getByText("重設密碼");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(submitHandler).toHaveBeenCalled(); // ✅ 確保 handleSubmit 被調用
      expect(mockOnSuccess).toHaveBeenCalledWith("Password123"); // ✅ 確保 onSuccess 被正確調用
    });
  });

  it("應該在 isLoading 為 true 時禁用按鈕", () => {
    const { getByText } = render(
      <ResetPassWordPanel onSuccess={mockOnSuccess} isLoading={true} />
    );

    const submitButton = getByText("重置中...");
    expect(submitButton.closest("button")).toBeDisabled();
  });
});
