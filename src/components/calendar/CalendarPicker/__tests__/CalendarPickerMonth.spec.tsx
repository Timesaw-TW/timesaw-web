import { render, fireEvent } from "@testing-library/react";
import dayjs from "dayjs";
import CalendarPickerMonth from "../CalendarPickerMonth";

describe("#CalendarPickerMonth", () => {
  const mockOnChange = jest.fn();
  const searchDate = dayjs("2024-07-01");
  const value = dayjs("2024-07-15");

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render date correctly including previous and next month dates", () => {
    const { getByText, getAllByText } = render(
      <CalendarPickerMonth
        value={value}
        searchDate={searchDate}
        onChange={mockOnChange}
      />
    );

    // month 6,7
    expect(getAllByText("30")).toHaveLength(2);

    // month 7
    expect(getByText("15")).toBeInTheDocument();

    // month 7,8
    expect(getAllByText("1")).toHaveLength(2);
  });

  it("should highlight selected date", () => {
    const { getByText } = render(
      <CalendarPickerMonth
        value={value}
        searchDate={searchDate}
        onChange={mockOnChange}
      />
    );

    const selectedDateElement = getByText("15");
    expect(selectedDateElement.parentElement).toHaveClass("bg-soda-80");
  });

  it("should call onChange when date is clicked", () => {
    const { getByText } = render(
      <CalendarPickerMonth
        value={value}
        searchDate={searchDate}
        onChange={mockOnChange}
      />
    );

    fireEvent.click(getByText("20"));
    expect(mockOnChange).toHaveBeenCalledWith(dayjs("2024-07-20"));
  });

  it("should apply custom className", () => {
    const { container } = render(
      <CalendarPickerMonth
        value={value}
        searchDate={searchDate}
        onChange={mockOnChange}
        className="custom-class"
      />
    );

    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("should display dates outside of the current month with correct style", () => {
    const { getAllByText } = render(
      <CalendarPickerMonth
        value={value}
        searchDate={searchDate}
        onChange={mockOnChange}
      />
    );

    const previousMonthDate = getAllByText("30")[0];
    const nextMonthDate = getAllByText("1")[1];

    expect(previousMonthDate.parentElement).toHaveClass("text-caption");
    expect(nextMonthDate.parentElement).toHaveClass("text-caption");
  });
});
