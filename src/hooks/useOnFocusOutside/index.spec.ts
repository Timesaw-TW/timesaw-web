import { act, renderHook } from "@testing-library/react";
import { useRef } from "react";
import useOnFocusOutside from ".";

describe("#useOnFocusOutside", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it("should not call handler if click is inside ref", () => {
    const handler = jest.fn();
    const { result } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(document.createElement("div"));
      useOnFocusOutside(ref, handler);
      return ref;
    });

    act(() => {
      const event = new MouseEvent("mousedown", { bubbles: true });
      result.current.current.dispatchEvent(event);
    });

    jest.advanceTimersByTime(100);
    expect(handler).not.toHaveBeenCalled();
  });

  it("should call handler if click is outside ref", () => {
    const handler = jest.fn();
    renderHook(() => {
      const ref = useRef<HTMLDivElement>(document.createElement("div"));
      useOnFocusOutside(ref, handler);
      return ref;
    });

    act(() => {
      const event = new MouseEvent("mousedown", { bubbles: true });
      document.body.dispatchEvent(event);
    });

    jest.advanceTimersByTime(100);
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("should clean up event listeners on unmount", () => {
    const handler = jest.fn();
    const addEventListenerSpy = jest.spyOn(window, "addEventListener");
    const removeEventListenerSpy = jest.spyOn(window, "removeEventListener");

    const { unmount } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(null);
      useOnFocusOutside(ref, handler);
    });

    unmount();

    expect(addEventListenerSpy).toHaveBeenCalledTimes(3);
    expect(removeEventListenerSpy).toHaveBeenCalledTimes(3);
    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });
});
