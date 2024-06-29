import { render, fireEvent, waitFor } from "@testing-library/react";
import { useRegister } from "@/gql-requests/user/auth";
import RegisterPanel from "../RegisterPanel";
import { ErrorCodeGQL } from "@/gql-requests/error-code";
import useJWT from "@/hooks/useJWT";

jest.mock("@/gql-requests/user/auth");
jest.mock("@/hooks/useJWT", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockUseRegister = useRegister as jest.Mock;

describe("#RegisterPanel", () => {
  const mockSetToken = jest.fn();

  beforeEach(() => {
    mockUseRegister.mockReturnValue([jest.fn(() => Promise.resolve({}))]);
    (useJWT as unknown as jest.Mock).mockReturnValue({
      setToken: mockSetToken,
    });
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

  it("should call setToken and onSuccess after successful registration", async () => {
    const onSuccess = jest.fn();
    mockUseRegister.mockReturnValue([
      jest.fn(() => Promise.resolve({ data: { register: "mock-token" } })),
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
      expect(mockSetToken).toHaveBeenCalled();
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

  it("should show email exist error when get register email exist error code", async () => {
    mockUseRegister.mockReturnValue([
      jest.fn(() =>
        Promise.reject({
          graphQLErrors: [
            { extensions: [{ code: ErrorCodeGQL.EMAIL_EXISTS }] },
          ],
        })
      ),
    ]);

    const { getByPlaceholderText, getByText } = render(<RegisterPanel />);

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
    waitFor(() => {
      expect(getByText("信箱已註冊，請使用登入")).toBeInTheDocument();
    });
  });
});
