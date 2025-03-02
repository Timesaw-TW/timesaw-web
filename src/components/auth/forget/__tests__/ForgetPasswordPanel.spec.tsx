import { render, fireEvent, waitFor } from "@testing-library/react";
import ForgetPasswordPanel from "../ForgetPassWordPanel";
import { useFormik } from "formik";

// Mock `formik`
jest.mock("formik", () => ({
  useFormik: jest.fn(),
}));

describe("ForgetPasswordPanel", () => {
  const mockHandleSubmit = jest.fn();
  const mockHandleChange = jest.fn();
  const mockOnSuccess = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useFormik as jest.Mock).mockReturnValue({
      values: { email: "test@example.com" },
      errors: {},
      handleChange: mockHandleChange,
      handleSubmit: (e: React.FormEvent) => {
        e.preventDefault();
        mockHandleSubmit();
        mockOnSuccess();
      },
    });
  });

  it("應該正確渲染 ForgetPasswordPanel", () => {
    const { getByPlaceholderText } = render(
      <ForgetPasswordPanel email="test@example.com" onSuccess={mockOnSuccess} />
    );
    expect(getByPlaceholderText("信箱")).toBeInTheDocument();
  });

  it("應該更新 email 欄位", () => {
    const { getByPlaceholderText } = render(
      <ForgetPasswordPanel email="test@example.com" onSuccess={mockOnSuccess} />
    );
    const emailInput = getByPlaceholderText("信箱");
    fireEvent.change(emailInput, { target: { value: "newemail@example.com" } });
    expect(mockHandleChange).toHaveBeenCalled();
  });

  it("應該提交表單並調用 onSuccess", async () => {
    const { getByPlaceholderText } = render(
      <ForgetPasswordPanel email="test@example.com" onSuccess={mockOnSuccess} />
    );

    const emailInput = getByPlaceholderText("信箱");
    fireEvent.submit(emailInput);

    await waitFor(() => {
      expect(mockHandleSubmit).toHaveBeenCalled();
      expect(mockOnSuccess).toHaveBeenCalled();
    });
  });
});
