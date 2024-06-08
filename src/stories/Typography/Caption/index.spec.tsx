import { render } from "@testing-library/react";
import Caption from ".";

describe("#Caption", () => {
  it("should render with default props", () => {
    const { getByText } = render(<Caption>Hello</Caption>);
    const captionElement = getByText("Hello");

    expect(captionElement).toBeInTheDocument();
    expect(captionElement.tagName).toBe("SPAN");
    expect(captionElement).toHaveClass("font-main", "text-xs", "font-normal");
  });

  it("should render with custom class name", () => {
    const { getByText } = render(<Caption className="custom">Hello</Caption>);
    const captionElement = getByText("Hello");

    expect(captionElement).toHaveClass("custom");
  });

  it("should render with bold font when bold prop is true", () => {
    const { getByText } = render(<Caption bold>Hello</Caption>);
    const captionElement = getByText("Hello");

    expect(captionElement).toHaveClass("font-medium");
  });

  it("should render with custom element", () => {
    const { getByText } = render(<Caption element="p">Hello</Caption>);
    const captionElement = getByText("Hello");

    expect(captionElement.tagName).toBe("P");
  });
});
