import { render, fireEvent } from "@testing-library/react";
import UserInfo from "../UserInfo";
import useLogin from "@/hooks/user/useLogin";
import useJWT from "@/hooks/useJWT";
import useUser from "@/hooks/user/useUser";

jest.mock("@/hooks/useJWT", () => ({
  __esModule: true,
  default: jest.fn(),
}));
jest.mock("@/hooks/user/useUser", () => ({
  __esModule: true,
  default: jest.fn(),
}));
jest.mock("@/hooks/user/useLogin", () => ({
  __esModule: true,
  default: jest.fn(),
}));
jest.mock("@/components/auth/login/LoginPanel", () => ({
  __esModule: true,
  default: jest.fn(() => <div>LoginPanel</div>),
}));

describe("#UserInfo", () => {
  beforeEach(() => {
    (useJWT as unknown as jest.Mock).mockReturnValue({ token: "test-token" });
    (useUser as unknown as jest.Mock).mockReturnValue({
      user: { name: "John Doe", email: "john@example.com" },
    });
    (useLogin as jest.Mock).mockReturnValue({
      login: jest.fn(),
      logout: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render user information when user is logged in", () => {
    const { getByText } = render(<UserInfo />);

    expect(getByText("User Info")).toBeInTheDocument();
    expect(getByText("name: John Doe")).toBeInTheDocument();
    expect(getByText("email: john@example.com")).toBeInTheDocument();
    expect(getByText("Copy JWT")).toBeInTheDocument();
    expect(getByText("Logout")).toBeInTheDocument();
  });

  it("should show login panel when user is not logged in", () => {
    (useJWT as unknown as jest.Mock).mockReturnValue({
      token: undefined,
    });
    (useUser as unknown as jest.Mock).mockReturnValue({
      user: null,
    });

    const { getByText } = render(<UserInfo />);

    expect(getByText("LoginPanel")).toBeInTheDocument();
  });

  it("should copy JWT token when copy button is clicked", () => {
    jest.useFakeTimers();
    const { getByText, rerender } = render(<UserInfo />);

    const copyButton = getByText("Copy JWT");
    fireEvent.click(copyButton);

    expect(copyButton).toHaveTextContent("Copy!");

    jest.advanceTimersByTime(1000);

    rerender(<UserInfo />);
    expect(copyButton).toHaveTextContent("Copy JWT");
  });

  it("should call logout function when logout button is clicked", () => {
    const mockLogout = jest.fn();
    (useLogin as jest.Mock).mockReturnValue({ logout: mockLogout });

    const { getByText } = render(<UserInfo />);

    const logoutButton = getByText("Logout");
    fireEvent.click(logoutButton);

    expect(mockLogout).toHaveBeenCalledTimes(1);
  });
});
