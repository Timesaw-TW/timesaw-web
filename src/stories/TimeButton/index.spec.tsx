import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TimeButton from ".";
import { TimeButtonProps, Periods } from "./type";

jest.mock("./Button", () => ({
  __esModule: true,
  default: jest.fn(() => null), // Mock Button component for testing isolation
}));

describe("TimeButton component", () => {
  const mockClickEvent = jest.fn();
  const periods: Periods[] = [
    { time: "1 Minute", value: "1" },
    { time: "15 Minutes", value: "15" },
    { time: "30 Minutes", value: "30" },
    { time: "1 Hour", value: "60" },
    { time: "1.5 Hours", value: "90" },
  ];

  // ... rest of the tests remain the same ...

  it("should render buttons for each time period", () => {
    render(<TimeButton timePeriods={periods} clickEvent={mockClickEvent} />);

    expect(screen.getAllByRole("button")).toHaveLength(periods.length);
  });

  it("should display the time for each button", () => {
    render(<TimeButton timePeriods={periods} clickEvent={mockClickEvent} />);

    periods.forEach((period, index) => {
      expect(screen.getByText(period.time)).toBeInTheDocument();
    });
  });

  it("should initially select no button", () => {
    render(<TimeButton timePeriods={periods} clickEvent={mockClickEvent} />);

    expect(screen.queryByText(/level: 100/i)).not.toBeInTheDocument(); // Check for level 100 (selected)
  });

  it("should set button level to 100 (selected) on click", () => {
    render(<TimeButton timePeriods={periods} clickEvent={mockClickEvent} />);

    const firstButton = screen.getAllByRole("button")[0];
    fireEvent.click(firstButton);

    expect(screen.getByText(periods[0].time)).toHaveStyle({ level: "100" }); // Assert level using inline style
  });

  it("should call clickEvent with the clicked time value", () => {
    render(<TimeButton timePeriods={periods} clickEvent={mockClickEvent} />);

    const secondButton = screen.getAllByRole("button")[1];
    fireEvent.click(secondButton);

    expect(mockClickEvent).toHaveBeenCalledWith(periods[1].value); // Assert clickEvent call with value
  });

  it("should only have one button selected at a time", () => {
    render(<TimeButton timePeriods={periods} clickEvent={mockClickEvent} />);

    const firstButton = screen.getAllByRole("button")[0];
    const secondButton = screen.getAllByRole("button")[1];

    fireEvent.click(firstButton);
    expect(screen.getByText(periods[0].time)).toHaveStyle({ level: "100" });

    fireEvent.click(secondButton);
    expect(screen.getByText(periods[0].time)).not.toHaveStyle({ level: "100" }); // First button unselected
    expect(screen.getByText(periods[1].time)).toHaveStyle({ level: "100" });
  });
});
