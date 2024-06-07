import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProgressCircle from ".";

describe("#ProgressCircle", () => {
  it("should render with default props", () => {
    const { container } = render(<ProgressCircle percentage={50} />);
    const svgElement = container.getElementsByTagName("svg");
    expect(svgElement).toHaveLength(1);
    expect(svgElement[0]).toHaveAttribute("width", "16");
    expect(svgElement[0]).toHaveAttribute("height", "16");
  });

  it("should render with custom size and strokeWidth", () => {
    const { container } = render(
      <ProgressCircle percentage={50} size={32} strokeWidth={3} />
    );
    const svgElement = container.getElementsByTagName("svg");
    expect(svgElement).toHaveLength(1);
    expect(svgElement[0]).toHaveAttribute("width", "32");
    expect(svgElement[0]).toHaveAttribute("height", "32");
  });

  it("should render checkmark when percentage is 100 or more", () => {
    const { container } = render(<ProgressCircle percentage={100} />);
    const svgElement = container.getElementsByTagName("svg");
    expect(svgElement).toHaveLength(1);
    expect(svgElement[0].parentElement).toHaveClass("rounded-[50%]");
  });
});
