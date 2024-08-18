import { render, fireEvent } from "@testing-library/react";
import dayjs from "dayjs";
import CalendarPickerWeek from "../CalendarPickerWeek";

describe("#CalendarPickerWeek", () => {
  const mockOnChange = jest.fn();
  const searchDate = dayjs("2024-08-18");
  const value = dayjs("2024-08-19");

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render week dates correctly", () => {
    const { getByText } = render(
      <CalendarPickerWeek
        value={value}
        searchDate={searchDate}
        onChange={mockOnChange}
      />
    );

    expect(getByText("18")).toBeInTheDocument();
    expect(getByText("19")).toBeInTheDocument();
    expect(getByText("20")).toBeInTheDocument();
    expect(getByText("21")).toBeInTheDocument();
    expect(getByText("22")).toBeInTheDocument();
    expect(getByText("23")).toBeInTheDocument();
    expect(getByText("24")).toBeInTheDocument();
  });

  it("should highlight selected date", () => {
    const { getByText } = render(
      <CalendarPickerWeek
        value={value}
        searchDate={searchDate}
        onChange={mockOnChange}
      />
    );

    expect(getByText("19").parentElement).toHaveClass("bg-soda-80");
  });

  it("should call onChange when date is clicked", () => {
    const { getByText } = render(
      <CalendarPickerWeek
        value={value}
        searchDate={searchDate}
        onChange={mockOnChange}
      />
    );

    fireEvent.click(getByText("20"));
    expect(mockOnChange).toHaveBeenCalledWith(dayjs("2024-08-20"));
  });

  it("should apply custom className", () => {
    const { container } = render(
      <CalendarPickerWeek
        value={value}
        searchDate={searchDate}
        onChange={mockOnChange}
        className="custom-class"
      />
    );

    expect(container.firstChild).toHaveClass("custom-class");
  });
});
