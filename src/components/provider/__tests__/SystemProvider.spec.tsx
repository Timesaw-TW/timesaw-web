import { render } from "@testing-library/react";
import { ThemeProvider } from "next-themes";
import SystemProvider from "../SystemProvider";

// Mocking next-themes ThemeProvider
jest.mock("next-themes", () => ({
  ThemeProvider: jest.fn(({ children }) => <div>{children}</div>),
}));

describe("#SystemProvider", () => {
  it("should render children correctly", () => {
    const { getByText } = render(
      <SystemProvider>
        <div>Test Child</div>
      </SystemProvider>
    );

    expect(getByText("Test Child")).toBeInTheDocument();
  });

  it("should pass correct props to ThemeProvider", () => {
    render(
      <SystemProvider>
        <div>Test Child</div>
      </SystemProvider>
    );

    expect(ThemeProvider).toHaveBeenCalledWith(
      expect.objectContaining({
        attribute: "class",
        themes: ["light", "dark"],
        enableSystem: false,
      }),
      expect.anything()
    );
  });
});
