import { render, fireEvent } from "@testing-library/react";
import TimeButton from ".";
import { TimeButtonProps, Periods } from "./type";

describe("#TimeButton", () => {
  const TIME_OPTIONS: Periods<number>[] = [
    { label: "1 Minute", value: 1 },
    { label: "15 Minutes", value: 15 },
    { label: "30 Minutes", value: 30 },
    { label: "1 Hour", value: 60 },
    { label: "1.5 Hours", value: 90 },
  ];

  const onChangeMock = jest.fn();

  const defaultProps: TimeButtonProps<number> = {
    onChange: onChangeMock,
    options: TIME_OPTIONS,
  };

  it("should render all time periods", () => {
    const { getAllByRole } = render(<TimeButton {...defaultProps} />);
    const buttons = getAllByRole("button");
    expect(buttons.length).toBe(TIME_OPTIONS.length);
  });

  it("should call onChange when button click", () => {
    const { getByTestId } = render(<TimeButton {...defaultProps} />);
    const firstButton = getByTestId("time-btn-1");
    fireEvent.click(firstButton);
    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalledWith(1);
  });
});
