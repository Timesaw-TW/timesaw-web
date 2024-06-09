import { render } from "@testing-library/react";
import SubHeadline from ".";

describe("#SubHeadline", () => {
  it("should render with default props", () => {
    const { getByText } = render(<SubHeadline>Hello</SubHeadline>);
    const textElement = getByText("Hello");

    expect(textElement).toBeInTheDocument();
    expect(textElement.tagName).toBe("SPAN");
    expect(textElement).toHaveClass("font-main", "text-base", "font-normal");
  });

  it("should render with custom class name", () => {
    const { getByText } = render(
      <SubHeadline className="custom">Hello</SubHeadline>
    );
    const textElement = getByText("Hello");

    expect(textElement).toHaveClass("custom");
  });

  it("should render with bold font when bold prop is true", () => {
    const { getByText } = render(<SubHeadline bold>Hello</SubHeadline>);
    const textElement = getByText("Hello");

    expect(textElement).toHaveClass("font-semibold");
  });

  it("should render with custom element", () => {
    const { getByText } = render(<SubHeadline element="p">Hello</SubHeadline>);
    const textElement = getByText("Hello");

    expect(textElement.tagName).toBe("P");
  });
});
