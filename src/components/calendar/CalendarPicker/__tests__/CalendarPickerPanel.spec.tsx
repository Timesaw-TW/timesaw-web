import { render } from "@testing-library/react";
import dayjs from "dayjs";
import CalendarPickerPanel from "../CalendarPickerPanel";

jest.mock("@/libs/calendar", () => ({
  getWeekDays: () => ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
}));

jest.mock("../CalendarPickerWeek", () => () => (
  <div>
    <span>CalendarPickerWeek Mock</span>
  </div>
));
jest.mock("../CalendarPickerMonth", () => () => (
  <div>
    <span>CalendarPickerMonth Mock</span>
  </div>
));

describe("#CalendarPickerPanel", () => {
  const mockOnChange = jest.fn();
  const value = dayjs("2024-08-15");
  const searchDate = dayjs("2024-08-01");

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render week days correctly", () => {
    const { getByText } = render(
      <CalendarPickerPanel
        type="month"
        value={value}
        searchDate={searchDate}
        onChange={mockOnChange}
      />
    );

    ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].forEach((day) => {
      expect(getByText(day)).toBeInTheDocument();
    });
  });

  it("should render CalendarPickerWeek component when type is 'week'", () => {
    const { getByText } = render(
      <CalendarPickerPanel
        type="week"
        value={value}
        searchDate={searchDate}
        onChange={mockOnChange}
      />
    );

    expect(getByText("CalendarPickerWeek Mock")).toBeInTheDocument();
  });

  it("should render CalendarPickerMonth component when type is 'month'", () => {
    const { getByText } = render(
      <CalendarPickerPanel
        type="month"
        value={value}
        searchDate={searchDate}
        onChange={mockOnChange}
      />
    );

    expect(getByText("CalendarPickerMonth Mock")).toBeInTheDocument();
  });

  it("should apply custom className", () => {
    const { container } = render(
      <CalendarPickerPanel
        type="month"
        value={value}
        searchDate={searchDate}
        onChange={mockOnChange}
        className="custom-class"
      />
    );

    expect(container.firstChild).toHaveClass("custom-class");
  });
});
