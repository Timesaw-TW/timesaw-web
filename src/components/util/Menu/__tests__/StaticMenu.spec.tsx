/* eslint-disable react/display-name */
import { render } from "@testing-library/react";
import StaticMenu from "../StaticMenu";

jest.mock("../Menu", () => () => <div data-testid="menu-component" />);

describe("#StaticMenu", () => {
  it("should include the Menu component", () => {
    const { getByTestId } = render(<StaticMenu />);
    expect(getByTestId("menu-component")).toBeInTheDocument();
  });
});
