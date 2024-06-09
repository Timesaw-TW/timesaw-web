import { render } from "@testing-library/react";
import SplashPage from "../page";

jest.mock("@/components/design/Splash", () =>
  jest.fn(() => <div>Splash Component</div>)
);

describe("#SplashPage", () => {
  it("should render correctly", () => {
    const { getByText } = render(<SplashPage />);
    expect(getByText("Splash Component")).toBeInTheDocument();
  });
});
