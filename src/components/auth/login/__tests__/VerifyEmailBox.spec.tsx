import { fireEvent, render, waitFor, within } from "@testing-library/react";
import {
  useEmailVerify,
  useResendVerificationEmail,
} from "@/gql-requests/user/auth";
import useLogin from "@/hooks/user/useLogin";
import useModal from "@/hooks/useModal";
import { useRouter } from "next/navigation";
import VerifyEmailBox from "../VerifyEmailBox";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));
jest.mock("@/hooks/user/useLogin");
jest.mock("@/hooks/useModal");
jest.mock("@/gql-requests/user/auth");

describe("VerifyEmailBox", () => {
  const mockFetchUser = jest.fn();
  const mockVerifyEmail = jest.fn();
  const mockResendVerificationEmail = jest.fn();
  const mockSetModal = jest.fn();
  const mockCloseModal = jest.fn();
  const mockReplace = jest.fn();

  beforeEach(() => {
    (useLogin as jest.Mock).mockReturnValue({ fetchUser: mockFetchUser });
    (useEmailVerify as jest.Mock).mockReturnValue([mockVerifyEmail]);
    (useResendVerificationEmail as jest.Mock).mockReturnValue([
      mockResendVerificationEmail,
    ]);
    (useModal as unknown as jest.Mock).mockReturnValue({
      setModal: mockSetModal,
      closeModal: mockCloseModal,
    });
    (useRouter as jest.Mock).mockReturnValue({
      replace: mockReplace,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render component correctly", () => {
    const { getByPlaceholderText, getByText, container } = render(
      <VerifyEmailBox />
    );

    expect(getByPlaceholderText("請輸入驗證碼")).toBeInTheDocument();
    expect(
      within(container.getElementsByTagName("form")[0]).getByText("驗證信箱")
    ).toBeInTheDocument();
    expect(getByText("重新寄送驗證碼")).toBeInTheDocument();
  });

  it("should call verify email and fetch user on form submit", async () => {
    mockVerifyEmail.mockResolvedValueOnce({ data: { verifyEmail: true } });
    mockFetchUser.mockResolvedValueOnce({ data: { me: true } });

    const { getByPlaceholderText, container } = render(<VerifyEmailBox />);

    fireEvent.change(getByPlaceholderText("請輸入驗證碼"), {
      target: { value: "123456" },
    });
    const submitBtn = within(
      container.getElementsByTagName("form")[0]
    ).getByText("驗證信箱");
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(mockVerifyEmail).toHaveBeenCalledWith({
        variables: { token: "123456" },
      });
      expect(mockFetchUser).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith("/");
      expect(mockSetModal).toHaveBeenCalledWith({
        content: expect.anything(),
        successLabel: "開始使用",
        onSuccess: expect.any(Function),
      });
    });
  });

  it("should display error message on invalid code", async () => {
    mockVerifyEmail.mockRejectedValueOnce({
      graphQLErrors: [{ extensions: { code: "INVALID_CODE" } }],
    });

    const { getByPlaceholderText, container, getByText } = render(
      <VerifyEmailBox />
    );

    fireEvent.change(getByPlaceholderText("請輸入驗證碼"), {
      target: { value: "invalid" },
    });
    const submitBtn = within(
      container.getElementsByTagName("form")[0]
    ).getByText("驗證信箱");
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(getByText("驗證碼錯誤")).toBeInTheDocument();
    });
  });

  it("should resend verification email and start countdown", async () => {
    mockResendVerificationEmail.mockResolvedValueOnce({
      data: { resendVerificationEmail: true },
    });

    const { getByText } = render(<VerifyEmailBox />);

    fireEvent.click(getByText("重新寄送驗證碼"));

    await waitFor(() => {
      expect(mockResendVerificationEmail).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(getByText("重新寄送驗證碼 (60s)")).toBeInTheDocument();
    });
  });
});
