import { render } from "@testing-library/react";
import LoginLayout from "../layout";

// Mock the imported components
jest.mock("@/stories/Icons", () => ({
  IconLogoText: jest.fn(() => <div>IconLogoText</div>),
}));

jest.mock("@/components/design/Tim", () => jest.fn(() => <div>Tim</div>));

describe("#LoginLayout", () => {
  it("should render correctly", () => {
    const { getByText } = render(<LoginLayout>Test Content</LoginLayout>);
    expect(getByText("Test Content")).toBeInTheDocument();
  });

  it("should render IconLogoText component", () => {
    const { getByText } = render(<LoginLayout>Test Content</LoginLayout>);
    expect(getByText("IconLogoText")).toBeInTheDocument();
  });

  it("should render Tim component", () => {
    const { getByText } = render(<LoginLayout>Test Content</LoginLayout>);
    expect(getByText("Tim")).toBeInTheDocument();
  });

  it("should render children content", () => {
    const { getByText } = render(
      <LoginLayout>
        <div>Child Content</div>
      </LoginLayout>
    );
    expect(getByText("Child Content")).toBeInTheDocument();
  });
});
