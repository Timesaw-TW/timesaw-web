import { act, renderHook } from "@testing-library/react";
import useMenu from "../useMenu";

describe("#useMenu", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize with menu closed", () => {
    const { result } = renderHook(() => useMenu());
    expect(result.current.opened).toBeFalsy();
  });

  it("should set menu opened correctly", () => {
    const { result } = renderHook(() => useMenu());

    act(() => {
      result.current.setOpened(true);
    });

    expect(result.current.opened).toBeTruthy;

    act(() => {
      result.current.setOpened(false);
    });

    expect(result.current.opened).toBeFalsy();
  });
});
