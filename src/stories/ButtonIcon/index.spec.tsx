import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Icon from ".";

describe("#Icon", () => {
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
});
