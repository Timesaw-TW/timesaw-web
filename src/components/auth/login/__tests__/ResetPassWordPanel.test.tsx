import { render, fireEvent, waitFor } from "@testing-library/react";
import ResetPassWordPanel from "../../reset/password/ResetPassWordPanel";

describe("#ResetPassWordPanel", () => {
  const mockOnSuccess = jest.fn();

  beforeEach(() => {
    mockOnSuccess.mockReset();
  });

  it("should render form fields and submit button", () => {
    const { getByPlaceholderText, getByText } = render(
      <ResetPassWordPanel onSuccess={mockOnSuccess} isLoading={false} />
    );

    expect(getByPlaceholderText("请输入新密码")).toBeInTheDocument();
    expect(getByPlaceholderText("请再次输入新密码")).toBeInTheDocument();
    expect(getByText("重設密碼")).toBeInTheDocument();
  });

  it("should show validation errors if fields are empty", async () => {
    const { getByText } = render(
      <ResetPassWordPanel onSuccess={mockOnSuccess} isLoading={false} />
    );

    fireEvent.click(getByText("重設密碼"));

    await waitFor(() => {
      expect(getByText("請輸入新密碼")).toBeInTheDocument();
      expect(getByText("請再次輸入新密碼")).toBeInTheDocument();
    });
  });

  it("should show password mismatch error", async () => {
    const { getByPlaceholderText, getByText } = render(
      <ResetPassWordPanel onSuccess={mockOnSuccess} isLoading={false} />
    );

    fireEvent.change(getByPlaceholderText("请输入新密码"), {
      target: { value: "Password123" },
    });
    fireEvent.change(getByPlaceholderText("请再次输入新密码"), {
      target: { value: "Password456" },
    });

    fireEvent.click(getByText("重設密碼"));

    await waitFor(() => {
      expect(getByText("兩次輸入的密碼不一致")).toBeInTheDocument();
    });
  });

  it("should call onSuccess if passwords match", async () => {
    const { getByPlaceholderText, getByText } = render(
      <ResetPassWordPanel onSuccess={mockOnSuccess} isLoading={false} />
    );

    fireEvent.change(getByPlaceholderText("请输入新密码"), {
      target: { value: "Password123" },
    });
    fireEvent.change(getByPlaceholderText("请再次输入新密码"), {
      target: { value: "Password123" },
    });

    fireEvent.click(getByText("重設密碼"));

    await waitFor(() => {
      expect(mockOnSuccess).toHaveBeenCalledWith("Password123");
    });
  });

  it("should display loading state when submitting", async () => {
    const { getByText } = render(
      <ResetPassWordPanel onSuccess={mockOnSuccess} isLoading={true} />
    );

    expect(getByText("重置中...")).toBeInTheDocument();
  });
});
