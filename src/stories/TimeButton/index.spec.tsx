import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TimeButton from ".";
import { TimeButtonProps, Periods } from "./type";

describe("TimeButton", () => {
  const TIMEOPTIONS: Periods[] = [
    {
      time: "1分鐘",
      value: "1",
    },
    {
      time: "15分鐘",
      value: "15",
    },
    {
      time: "30分鐘",
      value: "30",
    },
    {
      time: "1小時",
      value: "60",
    },
    {
      time: "1.5小時",
      value: "90",
    },
  ];

  const onChangeMock = jest.fn();

  const defaultProps: TimeButtonProps = {
    clickEvent: onChangeMock,
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

  it("updates button styles based on selection", () => {
    render(<TimeButton {...defaultProps} />);
    const firstButton = screen.getByText(/1分鐘/i);
    const secondButton = screen.getByText(/15分鐘/i);

    expect(firstButton).not.toHaveClass("bg-primary-100"); // Initially not selected
    expect(secondButton).not.toHaveClass("bg-primary-100");

    fireEvent.click(firstButton);

    expect(firstButton).toHaveClass("bg-primary-100");
    expect(secondButton).not.toHaveClass("bg-primary-100");
  });

  it("renders with an empty array of time periods", () => {
    const emptyTimePeriods: Periods[] = [];
    const emptyProps: TimeButtonProps = {
      clickEvent: onChangeMock,
      timePeriods: emptyTimePeriods,
    };

    render(<TimeButton {...emptyProps} />);
    expect(screen.queryAllByRole("button")).toHaveLength(0);
  });
});
