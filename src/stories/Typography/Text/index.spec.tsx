import { render } from "@testing-library/react";
import Text from ".";

describe("#Text", () => {
  it("should render with default props", () => {
    const { getByText } = render(<Text>Hello</Text>);
    const textElement = getByText("Hello");

    expect(textElement).toBeInTheDocument();
    expect(textElement.tagName).toBe("SPAN");
    expect(textElement).toHaveClass("font-main", "text-base", "font-normal");
  });

  it("should render with custom class name", () => {
    const { getByText } = render(<Text className="custom">Hello</Text>);
    const textElement = getByText("Hello");

    expect(textElement).toHaveClass("custom");
  });

  it("should render with bold font when bold prop is true", () => {
    const { getByText } = render(<Text bold>Hello</Text>);
    const textElement = getByText("Hello");

    expect(textElement).toHaveClass("font-semibold");
  });

  it("should render with custom element", () => {
    const { getByText } = render(<Text element="p">Hello</Text>);
    const textElement = getByText("Hello");

    expect(textElement.tagName).toBe("P");
  });
});
