import { render } from "@testing-library/react";
import HeaderRight from "../HeaderRight";

describe("#HeaderRight", () => {
  it("should render correctly", () => {
    const { getByText, getByRole } = render(
      <HeaderRight>
        <div>Test Component</div>
      </HeaderRight>
    );

    expect(getByText("Test Component")).toBeInTheDocument();
    expect(getByRole("button")).toBeInTheDocument();
  });
});
