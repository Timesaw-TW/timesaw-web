import { render } from "@testing-library/react";
import Tim from "../Tim";

describe("#Tim", () => {
  it("should render correctly", () => {
    const { container } = render(<Tim />);
    expect(container).toBeInTheDocument();
  });

  it("should accept additional props", () => {
    const { container } = render(<Tim className="custom-class" />);
    const svgElement = container.querySelector("svg");
    expect(svgElement).toHaveClass("custom-class");
  });
});
