import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TimeButton from ".";
import { TimeButtonProps, Periods } from "./type";

describe("TimeButton", () => {
  const TIMEOPTIONS: Periods[] = [
    { label: "1 Minute", value: 1 },
    { label: "15 Minutes", value: 15 },
    { label: "30 Minutes", value: 30 },
    { label: "1 Hour", value: 60 },
    { label: "1.5 Hours", value: 90 },
  ];

  const onChangeMock = jest.fn();

  const defaultProps: TimeButtonProps = {
    onTimeSelect: onChangeMock,
    timePeriods: TIMEOPTIONS,
  };

  it("renders all time periods", () => {
    render(<TimeButton {...defaultProps} />);
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBe(TIMEOPTIONS.length);
  });

  it("calls onChange on button click", () => {
    render(<TimeButton {...defaultProps} />);
    const firstButton = screen.getByTestId("button-1");
    fireEvent.click(firstButton);
    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalledWith(1);
  });

  it("updates button styles based on selection", () => {
    const onTimeSelect = jest.fn();
    const { getByTestId } = render(
      <TimeButton timePeriods={TIMEOPTIONS} onTimeSelect={onTimeSelect} />
    );

    const firstButton = getByTestId("button-15");
    const secondButton = getByTestId("button-30");
    const thirdButton = getByTestId("button-60");

    fireEvent.click(firstButton);

    expect(firstButton).toHaveClass("bg-soda-100"); // Selected button should have active class
    expect(secondButton).toHaveClass("bg-soda-40"); // Unselected buttons should have default class
    expect(thirdButton).toHaveClass("bg-soda-40"); // Unselected buttons should have default class

    fireEvent.click(secondButton);

    // Assert
    expect(firstButton).toHaveClass("bg-soda-60");
    expect(secondButton).toHaveClass("bg-soda-100");
    expect(thirdButton).toHaveClass("bg-soda-40");
  });

  it("renders with an empty array of time periods", () => {
    const emptyTimePeriods: Periods[] = [];
    const emptyProps: TimeButtonProps = {
      onTimeSelect: onChangeMock,
      timePeriods: emptyTimePeriods,
    };

    render(<TimeButton {...emptyProps} />);
    expect(screen.queryAllByRole("button")).toHaveLength(0);
  });
});
