import React from "react";
import { render } from "@testing-library/react";
import Title from ".";

describe("#Title", () => {
  it("should render with default props", () => {
    const { getByText } = render(<Title>Hello</Title>);
    const titleElement = getByText("Hello");

    expect(titleElement).toBeInTheDocument();
    expect(titleElement.tagName).toBe("H1");
    expect(titleElement).toHaveClass("font-main", "text-xl", "font-normal");
  });

  it("should render with custom class name", () => {
    const { getByText } = render(<Title className="custom">Hello</Title>);
    const titleElement = getByText("Hello");

    expect(titleElement).toHaveClass("custom");
  });

  it("should render with bold font when bold prop is true", () => {
    const { getByText } = render(<Title bold>Hello</Title>);
    const titleElement = getByText("Hello");

    expect(titleElement).toHaveClass("font-semibold");
  });

  it("should render with custom element", () => {
    const { getByText } = render(<Title element="h2">Hello</Title>);
    const titleElement = getByText("Hello");

    expect(titleElement.tagName).toBe("H2");
  });
});
