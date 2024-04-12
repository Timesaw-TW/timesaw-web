import { render, fireEvent } from "@testing-library/react";
import dayjs from "dayjs";
import DateTimePicker from "..";

describe("#DateTimePicker", () => {
  it("should render correctly", () => {
    const { getByText } = render(
      <DateTimePicker
        id="time"
        name="time"
        value={dayjs("2024/4/13 12:30").toISOString()}
        onChange={() => {}}
      />
    );
    expect(getByText("Apr 13, 2024 12:30")).toBeInTheDocument();
  });

  it("should open modal when click", () => {
    const { getByText } = render(
      <DateTimePicker
        id="time"
        name="time"
        value={dayjs("2024/4/13 12:30").toISOString()}
        onChange={() => {}}
      />
    );
    fireEvent.click(getByText("Apr 13, 2024 12:30"));
    expect(getByText("Apr 2024")).toBeInTheDocument();
  });
});
