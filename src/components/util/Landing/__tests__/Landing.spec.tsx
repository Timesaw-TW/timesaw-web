import { render } from "@testing-library/react";
import Landing from "../Landing";

describe("#Landing", () => {
  it("should render correctly", () => {
    const { getByText } = render(<Landing />);
    expect(getByText("Landing Component (not login)")).toBeInTheDocument();
  });
});
