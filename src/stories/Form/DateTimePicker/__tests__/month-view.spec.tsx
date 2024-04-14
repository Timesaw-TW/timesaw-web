import { render, fireEvent } from "@testing-library/react";
import DateTimePickerMonthView from "../month-view";
import dayjs from "dayjs";

describe("#DateTimePicker > DateTimePickerMonthView", () => {
  const onChange = jest.fn();

  it("should render correctly", () => {
    const { getByText } = render(
      <DateTimePickerMonthView
        value={dayjs()}
        year={2024}
        onChange={onChange}
      />
    );
    expect(getByText("Jan")).toBeInTheDocument();
    expect(getByText("Feb")).toBeInTheDocument();
    expect(getByText("Mar")).toBeInTheDocument();
    expect(getByText("Dec")).toBeInTheDocument();
  });

  it("should trigger onChange when clicking a month ", () => {
    const { getByText } = render(
      <DateTimePickerMonthView
        value={dayjs()}
        year={2024}
        onChange={onChange}
      />
    );
    const month = getByText("Jan");
    fireEvent.click(month);
    expect(onChange).toHaveBeenCalledWith(2024, 1);
  });

  it("should disable outside min and max range months", () => {
    const { getByText } = render(
      <DateTimePickerMonthView
        value={dayjs("2024/4/13")}
        year={2024}
        onChange={onChange}
        min={dayjs("2024/03/01")}
        max={dayjs("2024/08/01")}
      />
    );
    expect(getByText("Jan").parentElement).toBeDisabled();
    expect(getByText("Feb").parentElement).toBeDisabled();
    expect(getByText("Mar").parentElement).not.toBeDisabled();
    expect(getByText("Apr").parentElement).not.toBeDisabled();
    expect(getByText("Aug").parentElement).not.toBeDisabled();
    expect(getByText("Sep").parentElement).toBeDisabled();
    expect(getByText("Oct").parentElement).toBeDisabled();
    expect(getByText("Nov").parentElement).toBeDisabled();
    expect(getByText("Dec").parentElement).toBeDisabled();
  });

  it("should highlight current month", () => {
    const { getByText } = render(
      <DateTimePickerMonthView
        value={dayjs("2024/4/13")}
        year={2024}
        onChange={onChange}
      />
    );
    const currentMonth = getByText("Apr");
    expect(currentMonth.parentElement).toHaveClass("bg-soda-40");
  });
});
