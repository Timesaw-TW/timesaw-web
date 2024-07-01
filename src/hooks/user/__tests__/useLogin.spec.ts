import { useLogin as useLoginGQL } from "@/gql-requests/user/auth";
import { User, useMe as useMeGQL } from "@/gql-requests/user/user";
import useJWT from "@/hooks/useJWT";
import useUser from "../useUser";
import { act, renderHook } from "@testing-library/react";
import useLogin from "../useLogin";

jest.mock("@/gql-requests/user/auth");
jest.mock("@/gql-requests/user/user");
jest.mock("../useUser");
jest.mock("@/hooks/useJWT");

const mockSetToken = jest.fn();
const mockRemoveToken = jest.fn();
const mockSetUser = jest.fn();
const mockRemoveUser = jest.fn();
const mockLoginFn = jest.fn();
const mockMe = jest.fn();

describe("#useLogin", () => {
  beforeEach(() => {
    (useJWT as unknown as jest.Mock).mockReturnValue({
      token: "mock-token",
      setToken: mockSetToken,
      removeToken: mockRemoveToken,
    });

    (useUser as unknown as jest.Mock).mockReturnValue({
      setUser: mockSetUser,
      removeUser: mockRemoveUser,
    });

    (useLoginGQL as jest.Mock).mockReturnValue([mockLoginFn]);
    (useMeGQL as jest.Mock).mockReturnValue([mockMe]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should login successfully", async () => {
    const user = { id: "1", name: "John Doe", email: "john.doe@example.com" };
    const token = "mock-token";

    mockLoginFn.mockResolvedValueOnce({
      data: { login: token },
    });

    mockMe.mockResolvedValueOnce({
      data: { me: user },
    });

    const { result } = renderHook(() => useLogin());

    await act(async () => {
      const returnedUser = await result.current.login({
        email: "john.doe@example.com",
        password: "password123",
      });

      expect(returnedUser).toEqual(user);
      expect(mockSetToken).toHaveBeenCalledWith(token);
      expect(mockSetUser).toHaveBeenCalledWith(user);
    });
  });

  it("should handle login failure", async () => {
    mockLoginFn.mockResolvedValueOnce({
      data: null,
    });

    const { result } = renderHook(() => useLogin());

    await act(async () => {
      const returnedUser = await result.current.login({
        email: "john.doe@example.com",
        password: "wrong-password",
      });

      expect(returnedUser).toBeUndefined();
      expect(mockSetToken).not.toHaveBeenCalled();
      expect(mockSetUser).not.toHaveBeenCalled();
    });
  });

  it("should logout successfully", () => {
    const { result } = renderHook(() => useLogin());

    act(() => {
      result.current.logout();
    });

    expect(mockRemoveToken).toHaveBeenCalled();
    expect(mockRemoveUser).toHaveBeenCalled();
  });

  it("should fetch user with token successfully and set in user store", async () => {
    let user: User = {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      emailVerified: false,
    };

    mockMe.mockResolvedValueOnce({
      data: { me: user },
    });

    const { result } = renderHook(() => useLogin());

    await act(async () => {
      const returnedUser = await result.current.fetchUser();
      expect(mockSetUser).toHaveBeenCalledWith(returnedUser.data?.me);
    });
  });

  it("should remove use and token when fetch user failed", async () => {
    mockMe.mockRejectedValueOnce(new Error("Fetch user failed"));

    const { result } = renderHook(() => useLogin());

    await act(async () => {
      try {
        await result.current.fetchUser();
      } catch (error) {}
    });
    expect(mockRemoveToken).toHaveBeenCalled();
    expect(mockRemoveUser).toHaveBeenCalled();
  });
});
