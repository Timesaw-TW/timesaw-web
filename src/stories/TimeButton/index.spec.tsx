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
    const firstButton = screen.getByText(/1分鐘/i);
    fireEvent.click(firstButton);
    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalledWith("1");
  });

  it("updates button styles based on selection", async () => {
    render(<TimeButton {...defaultProps} />);
    const firstButton = screen.getByText(/1 分鐘/i);
    const secondButton = screen.getByText(/15 分鐘/i);

    expect(firstButton).not.toHaveClass("bg-primary-100"); // Initially not selected
    expect(secondButton).not.toHaveClass("bg-primary-100");

    fireEvent.click(firstButton);

    await new Promise((resolve) => setTimeout(resolve, 10)); // Adjust timeout if necessary

    expect(firstButton).toHaveStyle({
      backgroundColor: "var(--bs-primary-100)",
    });
    expect(secondButton).not.toHaveClass("bg-primary-100");
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
