import { render, fireEvent } from "@testing-library/react";
import FAB from ".";
import { SVGProps } from "react";

describe("#FAB", () => {
  it("should render with default props", () => {
    const { getByRole, queryByText, container } = render(<FAB />);
    const button = getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(
      "h-full w-full rounded-[50%] bg-soda-100 shadow-fab border-[0.5px] border-[#0900000A] flex items-center justify-center"
    );

    const icon = container.getElementsByTagName("svg");
    expect(icon).toHaveLength(1);

    const label = queryByText("Continue");
    expect(label).not.toBeInTheDocument();
  });

  it("should render with custom label", () => {
    const { getByText } = render(<FAB showLabel label="Click Me" />);
    const label = getByText("Click Me");
    expect(label).toBeInTheDocument();
  });

  it("should render with custom icon", () => {
    const CustomIcon = (props: SVGProps<SVGSVGElement>) => (
      <svg {...props} data-testid="custom-icon">
        <circle cx="12" cy="12" r="10" />
      </svg>
    );
    const { getByTestId } = render(<FAB icon={CustomIcon} />);
    const icon = getByTestId("custom-icon");
    expect(icon).toBeInTheDocument();
  });

  it("should render children when provided", () => {
    const { getByText } = render(<FAB>Child Content</FAB>);
    const childContent = getByText("Child Content");
    expect(childContent).toBeInTheDocument();
  });

  it("should handle onClick event", () => {
    const handleClick = jest.fn();
    const { getByRole } = render(<FAB onClick={handleClick} />);
    const button = getByRole("button");
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("should apply additional classNames", () => {
    const { getByRole } = render(<FAB className="extra-class" />);
    const button = getByRole("button");
    expect(button).toHaveClass("extra-class");
  });
});
