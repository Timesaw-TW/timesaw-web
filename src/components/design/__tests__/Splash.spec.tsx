import { render } from "@testing-library/react";
import Splash from "../Splash";

jest.mock("react-lottie", () => {
  // eslint-disable-next-line react/display-name
  return ({
    width,
    height,
  }: {
    options: any;
    width: number;
    height: number;
  }) => (
    <div data-testid="lottie" style={{ width, height }}>
      Lottie Animation
    </div>
  );
});

describe("#Splash", () => {
  it("should render correctly", () => {
    const { container } = render(<Splash />);
    expect(container).toBeInTheDocument();
  });

  it("should have correct default width and height", () => {
    const { getByTestId } = render(<Splash />);
    const lottieElement = getByTestId("lottie");
    expect(lottieElement).toHaveStyle("width: 5rem");
    expect(lottieElement).toHaveStyle("height: 5rem");
  });

  it("should accept and apply custom width and height", () => {
    const { getByTestId } = render(<Splash width={100} height={100} />);
    const lottieElement = getByTestId("lottie");
    expect(lottieElement).toHaveStyle("width: 100px");
    expect(lottieElement).toHaveStyle("height: 100px");
  });

  it("should apply correct classes to the container div", () => {
    const { container } = render(<Splash />);
    const divElement = container.firstChild;
    expect(divElement).toHaveClass("h-screen w-screen bg-soda-100");
    expect(divElement).toHaveClass("flex items-center justify-center");
  });
});
