import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TimeButton from ".";
import { TimeButtonProps } from "./type";

describe("TimeButton", () => {
  const TIMEOPTIONS: number[] = [1, 15, 30, 60, 90];

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
    const timePeriods = [15, 30, 60]; // Example time periods
    const onTimeSelect = jest.fn();
    const { getByTestId } = render(
      <TimeButton timePeriods={timePeriods} onTimeSelect={onTimeSelect} />
    );

    // Act
    const firstButton = getByTestId("button-15");
    const secondButton = getByTestId("button-30");
    const thirdButton = getByTestId("button-60");

    fireEvent.click(firstButton);

    // Assert
    expect(firstButton).toHaveClass("bg-primary-100"); // Selected button should have active class
    expect(secondButton).toHaveClass("bg-primary-40"); // Unselected buttons should have default class
    expect(thirdButton).toHaveClass("bg-primary-40"); // Unselected buttons should have default class

    fireEvent.click(secondButton);

    // Assert
    expect(firstButton).toHaveClass("bg-primary-60");
    expect(secondButton).toHaveClass("bg-primary-100");
    expect(thirdButton).toHaveClass("bg-primary-40");
  });

  it("renders with an empty array of time periods", () => {
    const emptyTimePeriods: number[] = [];
    const emptyProps: TimeButtonProps = {
      onTimeSelect: onChangeMock,
      timePeriods: emptyTimePeriods,
    };

    render(<TimeButton {...emptyProps} />);
    expect(screen.queryAllByRole("button")).toHaveLength(0);
  });
});
