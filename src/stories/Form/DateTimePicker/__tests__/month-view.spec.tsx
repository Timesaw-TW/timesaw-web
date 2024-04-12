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
    expect(getByText("Jan").parentElement).toHaveClass("text-neutral-divider");
    expect(getByText("Feb").parentElement).toHaveClass("text-neutral-divider");
    expect(getByText("Mar").parentElement).not.toHaveClass(
      "text-neutral-divider"
    );
    expect(getByText("Apr").parentElement).not.toHaveClass(
      "text-neutral-divider"
    );
    expect(getByText("Aug").parentElement).not.toHaveClass(
      "text-neutral-divider"
    );
    expect(getByText("Sep").parentElement).toHaveClass("text-neutral-divider");
    expect(getByText("Oct").parentElement).toHaveClass("text-neutral-divider");
    expect(getByText("Nov").parentElement).toHaveClass("text-neutral-divider");
    expect(getByText("Dec").parentElement).toHaveClass("text-neutral-divider");
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
    expect(currentMonth.parentElement).toHaveClass("bg-primary-40");
  });
});
