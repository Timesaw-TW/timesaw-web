import { render } from "@testing-library/react";
import Test from "../page";

describe("#Test", () => {
  it("should render success", () => {
    const { getByTestId } = render(
      <div data-testid="test">
        <Test />
      </div>
    );

    expect(getByTestId("test")).toBeTruthy();
  });
});
