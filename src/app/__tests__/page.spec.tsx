import { render } from "@testing-library/react";
import Home from "../page";

describe("#Index", () => {
  it("should render success", () => {
    const { getByTestId } = render(
      <div data-testid="home">
        <Home />
      </div>
    );

    expect(getByTestId("home")).toBeTruthy();
  });
});
