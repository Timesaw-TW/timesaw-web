import { render, fireEvent } from "@testing-library/react";
import DateTimePickerDateView from "../date-view";
import dayjs from "dayjs";

describe("#DateTimePicker > DateTimePickerDateView", () => {
  const onChange = jest.fn();
  const onMonthChange = jest.fn();

  it("should render correctly", () => {
    const { getByText } = render(
      <DateTimePickerDateView
        value={dayjs("2024/04/13 12:00:00")}
        onChange={onChange}
      />
    );
    expect(getByText("SUN")).toBeInTheDocument();
    expect(getByText("MON")).toBeInTheDocument();
    expect(getByText("TUE")).toBeInTheDocument();
    expect(getByText("WED")).toBeInTheDocument();
    expect(getByText("THU")).toBeInTheDocument();
    expect(getByText("FRI")).toBeInTheDocument();
    expect(getByText("SAT")).toBeInTheDocument();
    expect(getByText("15")).toBeInTheDocument();
  });

  it("should trigger onChange when click a date ", () => {
    const { getByText } = render(
      <DateTimePickerDateView
        value={dayjs("2024/04/13 12:00:00")}
        onChange={onChange}
      />
    );
    const date = getByText("15");
    fireEvent.click(date);
    expect(onChange).toHaveBeenCalled();
  });

  it("should trigger onMonthChange when click outside current month date", () => {
    const { getByText } = render(
      <DateTimePickerDateView
        value={dayjs("2024/04/13 12:00:00")}
        onMonthChange={onMonthChange}
      />
    );
    const date = getByText("31");
    fireEvent.click(date);
    expect(onMonthChange).toHaveBeenCalled();
  });
});
