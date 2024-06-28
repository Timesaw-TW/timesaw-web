import { render, fireEvent, waitFor } from "@testing-library/react";
import useLogin from "@/hooks/user/useLogin";
import LoginPanel from "../LoginPanel";

jest.mock("@/hooks/user/useLogin");

const mockUseLogin = useLogin as jest.Mock;

describe("#LoginPanel", () => {
  beforeEach(() => {
    mockUseLogin.mockReturnValue({
      login: jest.fn(() => Promise.resolve(true)),
    });
  });

  it("should render form fields", () => {
    const { getByPlaceholderText, getByText } = render(<LoginPanel />);

    expect(getByPlaceholderText("信箱")).toBeInTheDocument();
    expect(getByPlaceholderText("密碼")).toBeInTheDocument();
    expect(getByText("登入")).toBeInTheDocument();
  });

  it("should show validation errors on submit", async () => {
    const { getByText } = render(<LoginPanel />);

    fireEvent.click(getByText("登入"));

    await waitFor(() => {
      expect(getByText("請填寫信箱")).toBeInTheDocument();
      expect(getByText("請填寫密碼")).toBeInTheDocument();
    });
  });

  it("should call login and onSuccess after successful login", async () => {
    const onSuccess = jest.fn();
    const loginMock = jest.fn(() => Promise.resolve(true));
    mockUseLogin.mockReturnValue({ login: loginMock });

    const { getByPlaceholderText, getByText } = render(
      <LoginPanel onSuccess={onSuccess} />
    );

    fireEvent.change(getByPlaceholderText("信箱"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(getByPlaceholderText("密碼"), {
      target: { value: "password" },
    });

    fireEvent.click(getByText("登入"));

    await waitFor(() => {
      expect(loginMock).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password",
      });
      expect(onSuccess).toHaveBeenCalled();
    });
  });

  it("should toggle password visibility", () => {
    const { getByPlaceholderText } = render(<LoginPanel />);

    const passwordInput = getByPlaceholderText("密碼");
    const toggleButton = passwordInput.nextSibling as HTMLElement;

    expect(passwordInput).toHaveAttribute("type", "password");

    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "text");

    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "password");
  });
});
