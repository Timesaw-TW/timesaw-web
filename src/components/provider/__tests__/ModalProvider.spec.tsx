import { ModalProps } from "@/components/util/Modal";
import useModal from "@/hooks/useModal";
import { render } from "@testing-library/react";
import ModalProvider from "../ModalProvider";

jest.mock("@/hooks/useModal", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    modal: null,
  })),
}));

jest.mock("../../util/Modal", () => ({
  Modal: jest.fn(({ className }) => (
    <div data-testid="modal" className={className} />
  )),
}));

describe("#ModalProvider", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render Modal when modal data is exist", () => {
    const modalData: ModalProps = {
      content: <>Content</>,
      className: "test-class",
    };
    (useModal as unknown as jest.Mock).mockReturnValue({ modal: modalData });

    const { getByTestId } = render(<ModalProvider />);

    const modal = getByTestId("modal");
    expect(modal).toBeInTheDocument();
    expect(modal).toHaveClass("z-[500]");
  });

  it("should not render Modal when modal data is null", () => {
    (useModal as unknown as jest.Mock).mockReturnValue({ modal: null });
    const { queryByTestId } = render(<ModalProvider />);

    const modal = queryByTestId("modal");
    expect(modal).not.toBeInTheDocument();
  });
});
