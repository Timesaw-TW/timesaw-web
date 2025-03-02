import { render, fireEvent, waitFor } from "@testing-library/react";
import ResetPassWordBox from "../ResetPassWordBox";
import passwordResetModule from "@/gql-requests/password-reset/password-reset";
import useUrlQueryParam from "@/hooks/route/useUrlQueryParam";
import { useRouter } from "next/navigation";

// Mock 相關的 hooks
// 修正 password-reset 模組的模擬
jest.mock("@/gql-requests/password-reset/password-reset", () => ({
  __esModule: true,
  default: {
    useResetPassword: jest.fn(),
    useSendResetPasswordEmail: jest.fn(),
  },
  useResetPassword: jest.fn(),
  useSendResetPasswordEmail: jest.fn(),
}));
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/hooks/route/useUrlQueryParam");

describe("ResetPassWordBox", () => {
  const mockResetPassword = jest.fn();
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    const { useResetPassword } = passwordResetModule;
    // Mock reset password hook
    (useResetPassword as jest.Mock).mockReturnValue([mockResetPassword]);

    // Mock router
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

    // Mock token
    (useUrlQueryParam as jest.Mock).mockReturnValue("valid-token");
  });

  it("應該正確渲染 ResetPassWordBox", () => {
    const { getByText } = render(<ResetPassWordBox />);

    expect(getByText("重設密碼")).toBeInTheDocument();
  });

  it("應該在沒有 token 時顯示錯誤訊息", async () => {
    (useUrlQueryParam as jest.Mock).mockReturnValue(null);

    const { getByText } = render(<ResetPassWordBox />);
    const button = getByText("重設密碼");

    fireEvent.click(button);

    await waitFor(() => {
      expect(getByText("無效的token")).toBeInTheDocument();
    });
  });

  it("應該成功重設密碼並顯示成功訊息", async () => {
    mockResetPassword.mockResolvedValue({
      data: { resetPassword: true },
    });

    const { getByText, getByPlaceholderText } = render(<ResetPassWordBox />);
    const passwordInput = getByPlaceholderText("新密碼");
    const button = getByText("重設密碼");

    fireEvent.change(passwordInput, { target: { value: "newpassword123" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(getByText("密碼重置成功！")).toBeInTheDocument();
      expect(mockPush).toHaveBeenCalledWith("/login");
    });
  });

  it("應該成功重設密碼並顯示成功訊息", async () => {
    mockResetPassword.mockResolvedValue({
      data: { resetPassword: true },
    });

    const { getByText, getByPlaceholderText } = render(<ResetPassWordBox />);
    const passwordInput = getByPlaceholderText("請輸入新密碼");
    const button = getByText("重設密碼");

    fireEvent.change(passwordInput, { target: { value: "newpassword123" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(getByText("密碼重置成功！")).toBeInTheDocument();
      expect(mockPush).toHaveBeenCalledWith("/login");
    });
  });

  it("應該在請求錯誤時顯示錯誤訊息", async () => {
    mockResetPassword.mockRejectedValue(new Error("Internal Server Error"));

    const { getByText, getByPlaceholderText } = render(<ResetPassWordBox />);
    const passwordInput = getByPlaceholderText("新密碼");
    const button = getByText("重設密碼");

    fireEvent.change(passwordInput, { target: { value: "newpassword123" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(
        getByText("密碼重設過程中發生錯誤，請稍後重試。")
      ).toBeInTheDocument();
    });
  });
});
