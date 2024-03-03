import React from "react";
import { render } from "@testing-library/react";
import Headline from ".";

describe("#Headline", () => {
  it("should render with default props", () => {
    const { getByText } = render(<Headline>Hello</Headline>);
    const headlineElement = getByText("Hello");

    expect(headlineElement).toBeInTheDocument();
    expect(headlineElement.tagName).toBe("SPAN");
    expect(headlineElement).toHaveClass(
      "font-main",
      "text-lg",
      "font-semibold"
    );
  });

  it("should render with custom class name", () => {
    const { getByText } = render(<Headline className="custom">Hello</Headline>);
    const headlineElement = getByText("Hello");

    expect(headlineElement).toHaveClass("custom");
  });

  it("should render with bold font when bold prop is true", () => {
    const { getByText } = render(<Headline bold>Hello</Headline>);
    const headlineElement = getByText("Hello");

    expect(headlineElement).toHaveClass("font-bold");
  });

  it("should render with custom element", () => {
    const { getByText } = render(<Headline element="h2">Hello</Headline>);
    const headlineElement = getByText("Hello");

    expect(headlineElement.tagName).toBe("H2");
  });
});
