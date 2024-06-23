import { render } from "@testing-library/react";
import VerifyEmailBox from "../page";

jest.mock("@/components/auth/login/VerifyEmailBox", () =>
  jest.fn(() => <div>VerifyEmailBox Component</div>)
);

describe("#Login > VerifyPage", () => {
  it("should render correctly", () => {
    const { getByText } = render(<VerifyEmailBox />);
    expect(getByText("VerifyEmailBox Component")).toBeInTheDocument();
  });
});
