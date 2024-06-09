import { render } from "@testing-library/react";
import LoginPage from "../page";

jest.mock("@/components/auth/login/LoginBox", () =>
  jest.fn(() => <div>LoginBox Component</div>)
);

describe("#LoginPage", () => {
  it("should render correctly", () => {
    const { getByText } = render(<LoginPage />);
    expect(getByText("LoginBox Component")).toBeInTheDocument();
  });
});
