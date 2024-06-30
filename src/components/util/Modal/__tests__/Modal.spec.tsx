import { render, fireEvent } from "@testing-library/react";
import Modal, { ModalProps } from "../Modal";

const renderModal = (props: Partial<ModalProps> = {}) => {
  const defaultProps: ModalProps = {
    content: <div>Modal Content</div>,
    successLabel: "Confirm",
    onSuccess: jest.fn(),
    cancelLabel: "Cancel",
    onCancel: jest.fn(),
    allowClosed: true,
    onClosed: jest.fn(),
  };

  return render(<Modal {...defaultProps} {...props} />);
};

describe("#Modal", () => {
  it("should render modal content", () => {
    const { getByText } = renderModal();
    expect(getByText("Modal Content")).toBeInTheDocument();
  });

  it("should render success and cancel buttons", () => {
    const { getByText } = renderModal();
    expect(getByText("Confirm")).toBeInTheDocument();
    expect(getByText("Cancel")).toBeInTheDocument();
  });

  it("should call onSuccess when success button is clicked", () => {
    const onSuccess = jest.fn();
    const { getByText } = renderModal({ onSuccess });

    fireEvent.click(getByText("Confirm"));

    expect(onSuccess).toHaveBeenCalledTimes(1);
  });

  it("should call onCancel when cancel button is clicked", () => {
    const onCancel = jest.fn();
    const { getByText } = renderModal({ onCancel });

    fireEvent.click(getByText("Cancel"));

    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it("should call onClosed when close button is clicked", () => {
    const onClosed = jest.fn();
    const { container } = renderModal({ onClosed });

    fireEvent.click(container.getElementsByTagName("svg")[0]);

    expect(onClosed).toHaveBeenCalledTimes(1);
  });

  it("should not render close button if allowClosed is false", () => {
    const { container } = renderModal({ allowClosed: false });
    expect(container.getElementsByTagName("svg")).toHaveLength(0);
  });

  it("should render custom footer if provided", () => {
    const { getByText } = renderModal({ footer: <div>Custom Footer</div> });
    expect(getByText("Custom Footer")).toBeInTheDocument();
  });
});
