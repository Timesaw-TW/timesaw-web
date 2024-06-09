/* eslint-disable react/display-name */
import { render, fireEvent } from "@testing-library/react";
import LoginBox from "../LoginBox";

jest.mock("../RegisterPanel", () => () => <div>RegisterPanel</div>);
jest.mock("../LoginPanel", () => () => <div>LoginPanel</div>);
jest.mock("../ThirdPartyPanel", () => () => <div>ThirdPartyPanel</div>);
jest.mock("@/stories/SegmentedPicker", () => ({
  SegmentedPicker: ({ segments, value, onSelect }: any) => (
    <div>
      {segments.map((segment: any) => (
        <button key={segment.value} onClick={() => onSelect(segment.value)}>
          {segment.label}
        </button>
      ))}
      <div>Current Value: {value}</div>
    </div>
  ),
}));

describe("#LoginBox", () => {
  it("should render correctly", () => {
    const { getByText } = render(<LoginBox />);
    expect(getByText("RegisterPanel")).toBeInTheDocument();
    expect(getByText("ThirdPartyPanel")).toBeInTheDocument();
  });

  it("should switch to LoginPanel when login button is clicked", () => {
    const { getByRole, getByText } = render(<LoginBox />);
    fireEvent.click(getByRole("switch"));
    expect(getByText("LoginPanel")).toBeInTheDocument();
  });

  it("should switch back to RegisterPanel when register button is clicked", () => {
    const { getByRole, getByText } = render(<LoginBox />);
    const switchText = getByRole("switch");
    fireEvent.click(switchText);
    fireEvent.click(switchText);
    expect(getByText("RegisterPanel")).toBeInTheDocument();
  });
});
