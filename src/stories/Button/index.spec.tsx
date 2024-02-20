import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { Button } from ".";

describe("#Button", () => {
  it("should render with default props", () => {
    const { getByText } = render(<Button>Click me</Button>);
    const button = getByText("Click me");
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("text-neutral-primary");
    expect(button).toHaveClass("bg-primary-100");
  });

  it("should render with custom theme and level", () => {
    const { getByText } = render(
      <Button theme="secondary" level={60}>
        Submit
      </Button>
    );
    const button = getByText("Submit");
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("text-neutral-primary");
    expect(button).toHaveClass("bg-secondary-60");
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
    const { getByText } = render(
      <Button className="custom-class">Custom Button</Button>
    );
    const button = getByText("Custom Button");
    expect(button).toHaveClass("custom-class");
  });
});
