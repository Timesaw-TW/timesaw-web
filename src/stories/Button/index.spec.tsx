import { fireEvent, render } from "@testing-library/react";
import Button from ".";

describe("#Button", () => {
  it("should render with default props", () => {
    const { getByRole } = render(<Button>Click me</Button>);
    const button = getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("text-primary");
    expect(button).toHaveClass("bg-soda-80");
  });

  it("should call onClick prop when clicked", () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <Button onClick={handleClick}>Click me</Button>
    );
    const button = getByText("Click me");
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("should apply custom className", () => {
    const { getByRole } = render(
      <Button className="custom-class">Custom Button</Button>
    );
    const button = getByRole("button");
    expect(button).toHaveClass("custom-class");
  });
});
