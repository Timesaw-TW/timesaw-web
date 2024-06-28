/* eslint-disable react/display-name */
import { render, fireEvent } from "@testing-library/react";
import LoginBox from "../LoginBox";
import { useRouter, useSearchParams } from "next/navigation";

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
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe("#LoginBox", () => {
  const mockReplace = jest.fn();
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      replace: mockReplace,
    });
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn,
    });
  });

  it("should render correctly", () => {
    const { getByText } = render(<LoginBox />);
    expect(getByText("RegisterPanel")).toBeInTheDocument();
    expect(getByText("ThirdPartyPanel")).toBeInTheDocument();
  });

  it("should render component with login tab active", () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn(() => "login"),
    });
    const { getByText } = render(<LoginBox />);

    expect(getByText("LoginPanel")).toBeInTheDocument();
  });

  it("should render component with register tab active", () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn(() => "register"),
    });
    const { getByText } = render(<LoginBox />);

    expect(getByText("RegisterPanel")).toBeInTheDocument();
  });

  it("should call replace with type login query string", () => {
    const { getByRole } = render(<LoginBox />);
    fireEvent.click(getByRole("switch"));
    expect(mockReplace).toHaveBeenCalledTimes(1);
    expect(mockReplace).toHaveBeenCalledWith(`/login?type=login`);
  });
});
