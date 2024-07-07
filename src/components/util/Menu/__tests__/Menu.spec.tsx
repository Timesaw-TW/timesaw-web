import { render, fireEvent } from "@testing-library/react";
import { useRouter } from "next/navigation";
import Menu from "../Menu";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("#Menu", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render all menu items", () => {
    const { getByText } = render(<Menu />);

    expect(getByText("首頁")).toBeInTheDocument();
    expect(getByText("類別標籤")).toBeInTheDocument();
    expect(getByText("雜亂箱")).toBeInTheDocument();
    expect(getByText("儀表板")).toBeInTheDocument();
    expect(getByText("設定")).toBeInTheDocument();
  });

  it("should redirect to the correct path when a menu item is clicked", () => {
    const { getByText } = render(<Menu />);

    fireEvent.click(getByText("首頁"));
    expect(mockPush).toHaveBeenCalledWith("/");

    // fireEvent.click(getByText("類別標籤"));
    // expect(mockPush).toHaveBeenCalledWith("/categories");

    // fireEvent.click(getByText("雜亂箱"));
    // expect(mockPush).toHaveBeenCalledWith("/archive");

    // fireEvent.click(getByText("儀表板"));
    // expect(mockPush).toHaveBeenCalledWith("/dashboard");

    // fireEvent.click(getByText("設定"));
    // expect(mockPush).toHaveBeenCalledWith("/settings");
  });
});
