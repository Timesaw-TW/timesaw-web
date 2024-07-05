/* eslint-disable react/display-name */
import { render, fireEvent } from "@testing-library/react";
import useMenu from "@/hooks/useMenu";
import SlideMenu from "../SlideMenu";

jest.mock("../Menu", () => () => <div data-testid="menu-component" />);
jest.mock("@/hooks/useMenu");

describe("#SlideMenu", () => {
  beforeEach(() => {
    (useMenu as unknown as jest.Mock).mockReturnValue({
      opened: true,
      setOpened: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render Menu component", () => {
    const { getByTestId } = render(<SlideMenu />);
    expect(getByTestId("menu-component")).toBeInTheDocument();
  });

  it("should apply correct class when opened is true", () => {
    (useMenu as unknown as jest.Mock).mockReturnValue({
      opened: true,
      setOpened: jest.fn(),
    });
    const { getByRole } = render(<SlideMenu />);

    const overlay = getByRole("menu");
    expect(overlay).toHaveClass("translate-x-0");
    expect(overlay).not.toHaveClass("-translate-x-full");
  });

  it("should apply correct class when opened is false", () => {
    (useMenu as unknown as jest.Mock).mockReturnValue({
      opened: false,
      setOpened: jest.fn(),
    });
    const { getByRole } = render(<SlideMenu />);

    const overlay = getByRole("menu");
    expect(overlay).toHaveClass("-translate-x-full");
    expect(overlay).not.toHaveClass("translate-x-0");
  });
});
