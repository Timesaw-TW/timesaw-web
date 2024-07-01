import { render, waitFor } from "@testing-library/react";
import { usePathname, useRouter } from "next/navigation";
import useJWT from "@/hooks/useJWT";
import AuthGuard from "../AuthGuard";
import useModal from "@/hooks/useModal";
import useLogin from "@/hooks/user/useLogin";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));
jest.mock("@/hooks/useJWT");
jest.mock("@/hooks/useModal");
jest.mock("@/hooks/user/useLogin");

describe("#AuthGuard", () => {
  const replaceMock = jest.fn();
  const mockSetModal = jest.fn();
  const mockFetchUser = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ replace: replaceMock });
    (usePathname as jest.Mock).mockReturnValue("/");
    (useJWT as unknown as jest.Mock).mockReturnValue({
      token: null,
      removeToken: jest.fn(),
    });
    (useModal as unknown as jest.Mock).mockReturnValue({ setModal: jest.fn() });
    (useLogin as jest.Mock).mockReturnValue({ fetchUser: mockFetchUser });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should redirect to login if no token and not on a whitelist route", () => {
    (usePathname as jest.Mock).mockReturnValue("/need-redirect");
    render(
      <AuthGuard>
        <div>Protected Content</div>
      </AuthGuard>
    );

    expect(replaceMock).toHaveBeenCalledWith("/login");
  });

  it("should render children if token is valid", () => {
    (useJWT as unknown as jest.Mock).mockReturnValue({ token: "valid-token" });
    mockFetchUser.mockResolvedValueOnce({
      data: { me: { id: 1, name: "Test User" } },
    });

    const { getByText } = render(
      <AuthGuard>
        <div>Protected Content</div>
      </AuthGuard>
    );

    waitFor(() => {
      expect(getByText("Protected Content")).toBeInTheDocument();
    });
  });

  it("should redirect to login if token is invalid", () => {
    (useJWT as unknown as jest.Mock).mockReturnValue({
      token: "invalid-token",
      removeToken: jest.fn(),
    });
    mockFetchUser.mockResolvedValueOnce({
      data: null,
    });

    render(
      <AuthGuard>
        <div>Protected Content</div>
      </AuthGuard>
    );

    waitFor(() => {
      expect(replaceMock).toHaveBeenCalledWith("/login");
    });
  });

  it("should not redirect if on a whitelist route", () => {
    (useRouter as jest.Mock).mockReturnValue({ replace: replaceMock });
    (usePathname as jest.Mock).mockReturnValue("/");
    render(
      <AuthGuard>
        <div>Protected Content</div>
      </AuthGuard>
    );

    expect(replaceMock).not.toHaveBeenCalled();
  });

  it("should redirect to home if logged in and verify email before", async () => {
    (useRouter as jest.Mock).mockReturnValue({ replace: replaceMock });
    (usePathname as jest.Mock).mockReturnValue("/login");
    (useJWT as unknown as jest.Mock).mockReturnValue({ token: "valid-token" });
    mockFetchUser.mockResolvedValueOnce({
      data: { me: { id: 1, name: "Test User", emailVerified: true } },
    });

    render(
      <AuthGuard>
        <div>Protected Content</div>
      </AuthGuard>
    );

    await waitFor(() => {
      expect(replaceMock).toHaveBeenCalledWith("/");
    });
  });

  it("should call setModal to open alert modal if not verify email", async () => {
    (useRouter as jest.Mock).mockReturnValue({ replace: replaceMock });
    (usePathname as jest.Mock).mockReturnValue("/login");
    (useJWT as unknown as jest.Mock).mockReturnValue({ token: "valid-token" });
    mockFetchUser.mockResolvedValueOnce({
      data: { me: { id: 1, name: "Test User", emailVerified: false } },
    });

    (useModal as unknown as jest.Mock).mockReturnValue({
      setModal: mockSetModal,
    });

    render(
      <AuthGuard>
        <div>Protected Content</div>
      </AuthGuard>
    );

    await waitFor(() => {
      expect(mockSetModal).toHaveBeenCalled();
    });
  });
});
