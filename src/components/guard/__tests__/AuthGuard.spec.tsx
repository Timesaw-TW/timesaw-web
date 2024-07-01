import { fireEvent, render, waitFor } from "@testing-library/react";
import { usePathname, useRouter } from "next/navigation";
import useJWT from "@/hooks/useJWT";
import { useMe } from "@/gql-requests/user/user";
import useUser from "@/hooks/user/useUser";
import AuthGuard from "../AuthGuard";
import useModal from "@/hooks/useModal";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));
jest.mock("@/hooks/useJWT");
jest.mock("@/gql-requests/user/user");
jest.mock("@/hooks/user/useUser");
jest.mock("@/hooks/useModal");

describe("#AuthGuard", () => {
  const replaceMock = jest.fn();
  const mockSetModal = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ replace: replaceMock });
    (usePathname as jest.Mock).mockReturnValue("/");
    (useJWT as unknown as jest.Mock).mockReturnValue({
      token: null,
      removeToken: jest.fn(),
    });
    (useMe as jest.Mock).mockReturnValue([jest.fn(() => Promise.resolve({}))]);
    (useUser as unknown as jest.Mock).mockReturnValue({ setUser: jest.fn() });
    (useModal as unknown as jest.Mock).mockReturnValue({ setModal: jest.fn() });
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
    (useMe as jest.Mock).mockReturnValue([
      jest.fn(() =>
        Promise.resolve({
          data: { me: { id: 1, name: "Test User" } },
        })
      ),
    ]);

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
    (useMe as jest.Mock).mockReturnValue([
      jest.fn(() => Promise.resolve({ data: null })),
    ]);

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
    (useMe as jest.Mock).mockReturnValue([
      jest.fn(() =>
        Promise.resolve({
          data: { me: { id: 1, name: "Test User", emailVerified: true } },
        })
      ),
    ]);

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
    (useMe as jest.Mock).mockReturnValue([
      jest.fn(() =>
        Promise.resolve({
          data: { me: { id: 1, name: "Test User", emailVerified: false } },
        })
      ),
    ]);
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
