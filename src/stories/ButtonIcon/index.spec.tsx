import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Icon from ".";

describe("#ButtonIcon", () => {
  const mockOnClick = jest.fn();

  const renderComponent = (props = {}) => {
    return render(
      <Icon {...props} onClick={mockOnClick}>
        <span>Mock</span>
      </Icon>
    );
  };

  it("should render with the provided", () => {
    const { getByText } = renderComponent();
    const iconElement = getByText("Mock");
    expect(iconElement).toBeInTheDocument();
  });

  it("should render additional props", () => {
    const { container } = renderComponent({ className: "custom-class" });
    const buttonElement = container.querySelector("button");
    expect(buttonElement).toHaveClass("custom-class");
  });

  it("should trigger onClick when clicked", () => {
    const { container } = renderComponent();
    const buttonElement = container.querySelector("button");

    fireEvent.click(buttonElement!);

    expect(mockOnClick).toHaveBeenCalled();
  });

  it("should render with label text", () => {
    const { getByText } = render(<Icon label="Label">Click me</Icon>);
    const labelTextElement = getByText("Label");

    expect(labelTextElement).toBeInTheDocument();
    expect(labelTextElement.tagName).toBe("SPAN");
    expect(labelTextElement).toHaveClass("text-base");
  });

  it("renders with custom label element", () => {
    const CustomLabel = () => <span>Custom Label</span>;
    const { getByText } = render(<Icon label={<CustomLabel />}>Click me</Icon>);
    const labelTextElement = getByText("Custom Label");

    expect(labelTextElement).toBeInTheDocument();
    expect(labelTextElement.tagName).toBe("SPAN");
  });
});
