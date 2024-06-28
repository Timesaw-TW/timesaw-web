import { render, fireEvent, waitFor } from "@testing-library/react";
import { useRegister } from "@/gql-requests/user/auth";
import RegisterPanel from "../RegisterPanel";

jest.mock("@/gql-requests/user/auth");

const mockUseRegister = useRegister as jest.Mock;

describe("#RegisterPanel", () => {
  beforeEach(() => {
    mockUseRegister.mockReturnValue([jest.fn(() => Promise.resolve({}))]);
  });

  it("should render form fields", () => {
    const { getByText, getByPlaceholderText } = render(<RegisterPanel />);

    expect(getByPlaceholderText("信箱")).toBeInTheDocument();
    expect(getByPlaceholderText("密碼")).toBeInTheDocument();
    expect(getByPlaceholderText("確認密碼")).toBeInTheDocument();
    expect(getByText("註冊")).toBeInTheDocument();
  });

  it("should show validation errors on submit", async () => {
    const { getByText } = render(<RegisterPanel />);

    fireEvent.click(getByText("註冊"));

    await waitFor(() => {
      expect(getByText("請填寫信箱")).toBeInTheDocument();
      expect(getByText("請填寫密碼")).toBeInTheDocument();
      expect(getByText("請確認密碼")).toBeInTheDocument();
    });
  });

  it("should show password mismatch error", async () => {
    const { getByPlaceholderText, getByText } = render(<RegisterPanel />);

    fireEvent.change(getByPlaceholderText("密碼"), {
      target: { value: "password1" },
    });
    fireEvent.change(getByPlaceholderText("確認密碼"), {
      target: { value: "password2" },
    });

    fireEvent.click(getByText("註冊"));

    await waitFor(() => {
      expect(getByText("密碼不一致")).toBeInTheDocument();
    });
  });

  it("should call onSuccess after successful registration", async () => {
    const onSuccess = jest.fn();
    mockUseRegister.mockReturnValue([
      jest.fn(() => Promise.resolve({ errors: null })),
    ]);

    const { getByPlaceholderText, getByText } = render(
      <RegisterPanel onSuccess={onSuccess} />
    );

    fireEvent.change(getByPlaceholderText("信箱"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(getByPlaceholderText("密碼"), {
      target: { value: "password" },
    });
    fireEvent.change(getByPlaceholderText("確認密碼"), {
      target: { value: "password" },
    });

    fireEvent.click(getByText("註冊"));

    await waitFor(() => {
      expect(getByText("驗證電子郵件以完成註冊")).toBeInTheDocument();
    });

    fireEvent.click(getByText("確認"));

    expect(onSuccess).toHaveBeenCalled();
  });

  it("should toggle password visibility", () => {
    const { getByPlaceholderText } = render(<RegisterPanel />);

    const passwordInput = getByPlaceholderText("密碼");
    const toggleButton = passwordInput.nextSibling as HTMLElement;

    expect(passwordInput).toHaveAttribute("type", "password");

    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "text");

    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "password");
  });
});
