import { render, fireEvent, waitFor } from "@testing-library/react";
import { useSearchParams } from "next/navigation";
import { useFormik } from "formik";

import VerifyEmailBox from "../VerifyEmailBox";

jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(),
}));

jest.mock("formik", () => ({
  __esModule: true,
  useFormik: jest.fn(),
}));

describe("#VerifyEmailBox", () => {
  const getParam = jest.fn();
  const mockUseSearchParams = { get: getParam };

  beforeEach(() => {
    (useSearchParams as jest.Mock).mockReturnValue(mockUseSearchParams);
    (useFormik as jest.Mock).mockReturnValue({
      errors: {},
      values: { email: "test@example.com" },
      handleChange: jest.fn(),
      handleSubmit: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly", () => {
    const { getByText, getByPlaceholderText } = render(<VerifyEmailBox />);

    expect(getByText("重新驗證信箱")).toBeInTheDocument();
    expect(getByPlaceholderText("信箱")).toBeInTheDocument();
  });

  it("should attach email with query parameter", () => {
    const testEmail = "test@example.com";
    getParam.mockReturnValue(testEmail);
    const { getByPlaceholderText } = render(<VerifyEmailBox />);
    expect(getByPlaceholderText("信箱")).toHaveValue(testEmail);
    expect(getParam).toHaveBeenCalledWith("email");
    expect(getParam).toHaveBeenCalledTimes(1);
  });

  it("should show error message when email format invalid", async () => {
    const mockHandleSubmit = jest.fn();
    const mockHandleChange = jest.fn();

    (useFormik as jest.Mock).mockReturnValue({
      errors: { email: "Email 格式錯誤" },
      values: { email: "invalid-email" },
      handleChange: mockHandleChange,
      handleSubmit: mockHandleSubmit,
    });

    const { getByPlaceholderText, getByRole, getByText } = render(
      <VerifyEmailBox />
    );
    fireEvent.change(getByPlaceholderText("信箱"), {
      target: { value: "invalid-email" },
    });
    fireEvent.submit(getByRole("button", { name: /寄送驗證信/i }));

    await waitFor(() => {
      expect(getByText("Email 格式錯誤")).toBeInTheDocument();
    });
  });
});
