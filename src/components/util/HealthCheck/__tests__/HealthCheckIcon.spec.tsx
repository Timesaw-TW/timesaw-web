import { render } from "@testing-library/react";
import HealthCheckIcon, { HealthCheckState } from "../HealthCheckIcon";

jest.mock("@/stories/Icons", () => ({
  IconShieldCheckOutline: jest.fn(() => <div>IconShieldCheckOutline</div>),
  IconShieldExclamationOutline: jest.fn(() => (
    <div>IconShieldExclamationOutline</div>
  )),
}));

jest.mock("@/stories/Typography/Text", () => {
  return jest.fn(({ children }) => <div>{children}</div>);
});

describe("#HealthCheckIcon", () => {
  const renderComponent = (status: HealthCheckState) => {
    return render(<HealthCheckIcon status={status} />);
  };

  it("should render success icon when status is success", () => {
    const { getByText } = renderComponent("success");
    expect(getByText("IconShieldCheckOutline")).toBeInTheDocument();
  });

  it("should render failed icon when status is failed", () => {
    const { getByText } = renderComponent("failed");
    expect(getByText("IconShieldExclamationOutline")).toBeInTheDocument();
  });

  it("should render pending text when status is pending", () => {
    const { getByText } = renderComponent("pending");
    expect(getByText("-")).toBeInTheDocument();
  });
});
