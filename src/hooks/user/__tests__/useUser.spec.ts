import { act, renderHook } from "@testing-library/react";
import useUser from "../useUser";

describe("#useUser", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize with null user", () => {
    const { result } = renderHook(() => useUser());
    expect(result.current.user).toBeNull();
  });

  it("should set user correctly", () => {
    const { result } = renderHook(() => useUser());
    const mockUser = { id: "1", name: "John Doe", email: "john@example.com" };

    act(() => {
      result.current.setUser(mockUser);
    });

    expect(result.current.user).toEqual(mockUser);
  });

  it("should remove user correctly", () => {
    const { result } = renderHook(() => useUser());
    const mockUser = { id: "1", name: "John Doe", email: "john@example.com" };

    act(() => {
      result.current.setUser(mockUser);
    });

    expect(result.current.user).toEqual(mockUser);

    act(() => {
      result.current.removeUser();
    });

    expect(result.current.user).toBeNull();
  });
});
