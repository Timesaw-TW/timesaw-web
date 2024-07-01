import { act, renderHook } from "@testing-library/react";
import useModal from "../useModal";
import { ModalProps } from "@/components/util/Modal";

describe("#useModal", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize with null modal", () => {
    const { result } = renderHook(() => useModal());
    expect(result.current.modal).toBeNull();
  });

  it("should set modal correctly", () => {
    const { result } = renderHook(() => useModal());
    const mockModal: ModalProps = { content: "Content" };

    act(() => {
      result.current.setModal(mockModal);
    });

    expect(result.current.modal).toEqual(mockModal);
  });

  it("should close modal correctly", () => {
    const { result } = renderHook(() => useModal());
    const mockModal: ModalProps = { content: "Content" };

    act(() => {
      result.current.setModal(mockModal);
    });

    expect(result.current.modal).toEqual(mockModal);

    act(() => {
      result.current.closeModal();
    });

    expect(result.current.modal).toBeNull();
  });
});
