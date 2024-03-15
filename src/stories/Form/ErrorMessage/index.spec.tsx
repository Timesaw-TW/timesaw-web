import React from "react";
import { render } from "@testing-library/react";
import ErrorMessage from ".";

describe("#ErrorMessage", () => {
  it("should render message correctly", () => {
    const { getByText } = render(<ErrorMessage message="Test message" />);
    const messageElement = getByText("Test message");
    expect(messageElement).toBeInTheDocument();
  });

  it("should render message and custom element correctly", () => {
    const customElement = <div>Custom Element</div>;
    const { getByText } = render(
      <ErrorMessage message="Test message" element={customElement} />
    );
    const messageElement = getByText("Test message");
    const customElementNode = getByText("Custom Element");
    expect(messageElement).toBeInTheDocument();
    expect(customElementNode).toBeInTheDocument();
  });

  it("should apply custom className correctly", () => {
    const { container } = render(
      <ErrorMessage message="Test message" className="custom-class" />
    );
    const errorMessageContainer = container.querySelector(".custom-class");
    expect(errorMessageContainer).toBeInTheDocument();
  });
});
