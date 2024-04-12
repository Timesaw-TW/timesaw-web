import { render, fireEvent } from "@testing-library/react";
import DateTimePickerYearView from "../year-view";
import dayjs from "dayjs";

describe("#DateTimePicker > DateTimePickerYearView", () => {
  const onChange = jest.fn();

  it("should render correctly", () => {
    const startYear = 2021;
    const { getByText } = render(
      <DateTimePickerYearView
        value={dayjs(`${startYear}/4/13`)}
        year={startYear}
        onChange={onChange}
      />
    );

    for (let i = startYear; i < startYear + 12; i++) {
      expect(getByText(i)).toBeInTheDocument();
    }
  });

  it("should trigger onChange when click a year ", () => {
    const { getByText } = render(
      <DateTimePickerYearView
        value={dayjs("2024/4/13")}
        year={2024}
        onChange={onChange}
      />
    );
    const year = getByText("2021");
    fireEvent.click(year);
    expect(onChange).toHaveBeenCalledWith(2021);
  });

  it("should disable outside min and max range years", () => {
    const { getByText } = render(
      <DateTimePickerYearView
        value={dayjs("2024/4/13")}
        year={2024}
        onChange={onChange}
        min={dayjs("2022-01-01")}
        max={dayjs("2025-12-31")}
      />
    );
    expect(getByText("2021").parentElement).toBeDisabled();
    expect(getByText("2022").parentElement).not.toBeDisabled();
    expect(getByText("2023").parentElement).not.toBeDisabled();
    expect(getByText("2024").parentElement).not.toBeDisabled();
    expect(getByText("2025").parentElement).not.toBeDisabled();
    expect(getByText("2026").parentElement).toBeDisabled();
    expect(getByText("2027").parentElement).toBeDisabled();
    expect(getByText("2028").parentElement).toBeDisabled();
    expect(getByText("2029").parentElement).toBeDisabled();
    expect(getByText("2030").parentElement).toBeDisabled();
  });

  it("should highlight current year", () => {
    const { getByText } = render(
      <DateTimePickerYearView
        value={dayjs("2024/4/13")}
        year={2024}
        onChange={onChange}
      />
    );
    const currentYear = getByText("2024");
    expect(currentYear.parentElement).toHaveClass("bg-primary-40");
  });
});
