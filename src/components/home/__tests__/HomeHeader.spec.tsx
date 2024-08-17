import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import dayjs from "dayjs";
import { CalendarType, getCalendarText, MONTH_CHINESE } from "@/libs/calendar";
import HomeHeader from "../HomeHeader";

describe("#HomeHeader", () => {
  const mockOnChange = jest.fn();
  const mockDate = dayjs("2023-08-17");
  const mockOrder: CalendarType[] = ["day", "week", "month"];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("render month and year correctly", () => {
    const { getByText } = render(
      <HomeHeader date={mockDate} order={mockOrder} onChange={mockOnChange} />
    );

    expect(
      getByText(`${MONTH_CHINESE[mockDate.month()]}月`)
    ).toBeInTheDocument();

    expect(getByText(`${mockDate.year()}`)).toBeInTheDocument();
  });

  it("should render calendar type button with correct text", () => {
    const { getByText } = render(
      <HomeHeader date={mockDate} order={mockOrder} onChange={mockOnChange} />
    );

    expect(getByText(getCalendarText(mockOrder[0]))).toBeInTheDocument();
  });

  it("should call onChange when the calendar type button is clicked", () => {
    const { getByText } = render(
      <HomeHeader date={mockDate} order={mockOrder} onChange={mockOnChange} />
    );

    fireEvent.click(getByText(getCalendarText(mockOrder[0])));
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });
});
