import { render, fireEvent, waitFor } from "@testing-library/react";
import ResetPassWordBox from "../../reset/password/ResetPassWordBox";
import { useResetPassword } from "@/gql-requests/ password-reset/password-reset";
import useUrlQueryParam from "@/hooks/route/useUrlQueryParam";
import { useRouter } from "next/navigation";

jest.mock("@/gql-requests/password-reset/password-reset");
jest.mock("@/hooks/route/useUrlQueryParam");
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

const mockUseResetPassword = useResetPassword as jest.Mock;
const mockUseRouter = useRouter as jest.Mock;
const mockUseUrlQueryParam = useUrlQueryParam as jest.Mock;

describe("#ResetPassWordBox", () => {
  beforeEach(() => {
    mockUseResetPassword.mockReturnValue([
      jest.fn(() => Promise.resolve({ data: { resetPassword: true } })),
    ]);
    mockUseUrlQueryParam.mockReturnValue("mock-token");
    mockUseRouter.mockReturnValue({ push: jest.fn() });
  });

  it("should display success message on password reset", async () => {
    const { getByText, getByPlaceholderText } = render(<ResetPassWordBox />);

    fireEvent.change(getByPlaceholderText("请输入新密码"), {
      target: { value: "Password123" },
    });
    fireEvent.change(getByPlaceholderText("请再次输入新密码"), {
      target: { value: "Password123" },
    });
    fireEvent.click(getByText("重設密碼"));

    await waitFor(() => {
      expect(getByText("密码重置成功！")).toBeInTheDocument();
    });
  });

  it("should display error message if token is missing", async () => {
    mockUseUrlQueryParam.mockReturnValue(null);
    const { getByText, getByPlaceholderText } = render(<ResetPassWordBox />);

    fireEvent.change(getByPlaceholderText("请输入新密码"), {
      target: { value: "Password123" },
    });
    fireEvent.change(getByPlaceholderText("请再次输入新密码"), {
      target: { value: "Password123" },
    });
    fireEvent.click(getByText("重設密碼"));

    await waitFor(() => {
      expect(getByText("無效的token")).toBeInTheDocument();
    });
  });

  it("should display error message if password reset fails", async () => {
    mockUseResetPassword.mockReturnValue([
      jest.fn(() => Promise.resolve({ data: { resetPassword: false } })),
    ]);
    const { getByText, getByPlaceholderText } = render(<ResetPassWordBox />);

    fireEvent.change(getByPlaceholderText("请输入新密码"), {
      target: { value: "Password123" },
    });
    fireEvent.change(getByPlaceholderText("请再次输入新密码"), {
      target: { value: "Password123" },
    });
    fireEvent.click(getByText("重設密碼"));

    await waitFor(() => {
      expect(getByText("密码重置失败，请重试。")).toBeInTheDocument();
    });
  });
});
