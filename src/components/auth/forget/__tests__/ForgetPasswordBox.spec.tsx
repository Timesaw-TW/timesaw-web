import { render, fireEvent, waitFor } from "@testing-library/react";
import ForgetPasswordBox from "../ForgetPassWordBox";
import useModal from "@/hooks/useModal";
import useUrlQueryParam from "@/hooks/route/useUrlQueryParam";
import passwordResetModule from "@/gql-requests/password-reset/password-reset";

// Mock 相關的 hooks
jest.mock("@/hooks/useModal");
jest.mock("@/hooks/route/useUrlQueryParam");
jest.mock("@/gql-requests/password-reset/password-reset");

describe("ForgetPasswordBox", () => {
  const mockSetModal = jest.fn();
  const mockCloseModal = jest.fn();
  const mockSendResetPasswordEmail = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock useModal
    (useModal as unknown as jest.Mock).mockReturnValue({
      setModal: mockSetModal,
      closeModal: mockCloseModal,
    });

    // Mock useUrlQueryParam
    (useUrlQueryParam as jest.Mock).mockReturnValue("test@example.com");

    // Mock useSendResetPasswordEmail
    (
      passwordResetModule.useSendResetPasswordEmail as jest.Mock
    ).mockReturnValue([mockSendResetPasswordEmail]);
  });

  it("應該正確渲染 ForgetPasswordBox", () => {
    const { getByText } = render(<ForgetPasswordBox />);

    expect(getByText("忘記密碼")).toBeInTheDocument();
    expect(getByText("重設密碼")).toBeInTheDocument();
    expect(getByText("還沒有帳號?")).toBeInTheDocument();
  });

  it("應該成功發送重設密碼請求", async () => {
    mockSendResetPasswordEmail.mockResolvedValueOnce({
      data: { sendResetPasswordEmail: true },
    });

    const { getByText } = render(<ForgetPasswordBox />);
    const resetButton = getByText("重設密碼");

    fireEvent.click(resetButton);

    await waitFor(() => {
      expect(mockSendResetPasswordEmail).toHaveBeenCalledWith({
        variables: { email: "test@example.com" },
      });

      expect(mockSetModal).toHaveBeenCalledWith(
        expect.objectContaining({
          content: expect.anything(),
          successLabel: "確認",
        })
      );
    });
  });
  it("應該顯示錯誤訊息，當 email 未註冊時", async () => {
    mockSendResetPasswordEmail.mockResolvedValueOnce({
      data: { sendResetPasswordEmail: null },
    });

    const { getByText, queryByText, getByRole } = render(<ForgetPasswordBox />);
    const resetButton = getByText("重設密碼");

    fireEvent.click(resetButton);

    await waitFor(
      () => {
        expect(queryByText(/此電子郵件未註冊/)).toBeInTheDocument();
        // expect(getByRole("alert")).toHaveTextContent("此電子郵件未註冊，請檢查後再試。"); // ✅ 若有 role="alert"
      },
      { timeout: 3000 }
    );
  });

  it("應該顯示錯誤訊息，當請求失敗時", async () => {
    mockSendResetPasswordEmail.mockRejectedValueOnce(new Error("請求失敗"));

    const { getByText, queryByText } = render(<ForgetPasswordBox />);
    const resetButton = getByText("重設密碼");

    fireEvent.click(resetButton);

    await waitFor(() => {
      expect(queryByText(/請求失敗/)).toBeInTheDocument(); // 使用 regex 來確保部分匹配
    });
  });
});
