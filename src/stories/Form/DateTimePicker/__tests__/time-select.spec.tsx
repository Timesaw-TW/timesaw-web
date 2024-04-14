import { render, fireEvent } from "@testing-library/react";
import Dayjs from "dayjs";
import TimeSelect from "../time-select";

describe("#DateTimePicker > TimeSelect", () => {
  const mockScrollIntoView = jest.fn();
  window.HTMLElement.prototype.scrollIntoView = mockScrollIntoView;

  it("should render with initial state", () => {
    const mockOnChange = jest.fn();
    const value = Dayjs("2024/04/13 12:00:00");
    const { getByText } = render(
      <TimeSelect value={value} type="hour" onChange={mockOnChange} />
    );

    expect(
      getByText(value.hour().toString().padStart(2, "0"))
    ).toBeInTheDocument();
  });

  it("should open option list when clicked", () => {
    const mockOnChange = jest.fn();
    const value = Dayjs("2024/04/13 12:00:00");
    const { getByRole } = render(
      <TimeSelect value={value} type="hour" onChange={mockOnChange} />
    );
    const selectButton = getByRole("button");
    fireEvent.click(selectButton);
    expect(getByRole("list")).toBeInTheDocument();
  });

  it("should trigger onChange when select an option ", () => {
    const mockOnChange = jest.fn();
    const value = Dayjs("2024/04/13 12:00:00");
    const { getByRole, getByText } = render(
      <TimeSelect value={value} type="hour" onChange={mockOnChange} />
    );
    const selectButton = getByRole("button");
    fireEvent.click(selectButton);
    fireEvent.click(getByText("01"));

    expect(mockOnChange).toHaveBeenCalledWith(value.set("hour", 1));
  });

  it("should disable options when min or max time is set", () => {
    const mockOnChange = jest.fn();
    const value = Dayjs("2024/04/13 12:00:00");
    const minTime = Dayjs("2024/04/13 09:00:00");
    const maxTime = Dayjs("2024/04/13 15:00:00");
    const { getByText, getByRole } = render(
      <TimeSelect
        value={value}
        type="hour"
        onChange={mockOnChange}
        min={minTime}
        max={maxTime}
      />
    );

    const selectButton = getByRole("button");
    fireEvent.click(selectButton);

    expect(getByText("08").parentElement).toBeDisabled();
    expect(getByText("16").parentElement).toBeDisabled();
    expect(getByText("14").parentElement).not.toBeDisabled();
  });
});
