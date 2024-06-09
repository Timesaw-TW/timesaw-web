import { render } from "@testing-library/react";
import Footnote from ".";

describe("#Footnote", () => {
  it("should render with default props", () => {
    const { getByText } = render(<Footnote>Hello</Footnote>);
    const footnoteElement = getByText("Hello");

    expect(footnoteElement).toBeInTheDocument();
    expect(footnoteElement.tagName).toBe("SPAN");
    expect(footnoteElement).toHaveClass("font-main", "text-sm", "font-normal");
  });

  it("should render with custom class name", () => {
    const { getByText } = render(<Footnote className="custom">Hello</Footnote>);
    const footnoteElement = getByText("Hello");

    expect(footnoteElement).toHaveClass("custom");
  });

  it("should render with bold font when bold prop is true", () => {
    const { getByText } = render(<Footnote bold>Hello</Footnote>);
    const footnoteElement = getByText("Hello");

    expect(footnoteElement).toHaveClass("font-semibold");
  });

  it("should render with custom element", () => {
    const { getByText } = render(<Footnote element="div">Hello</Footnote>);
    const footnoteElement = getByText("Hello");

    expect(footnoteElement.tagName).toBe("DIV");
  });
});
