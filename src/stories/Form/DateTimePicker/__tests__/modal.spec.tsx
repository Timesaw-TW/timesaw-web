import { render, fireEvent } from "@testing-library/react";
import dayjs from "dayjs";
import DateTimePickerModal from "../modal";

describe("#DateTimePicker > DateTimePickerModal", () => {
  it("should render correctly", () => {
    const { getByText } = render(
      <DateTimePickerModal value={dayjs("2024-04-13")} onChange={() => {}} />
    );
    expect(getByText("Apr 2024")).toBeInTheDocument();
  });

  it("should switch mode correctly", () => {
    const { getByText, queryByText } = render(
      <DateTimePickerModal value={dayjs("2024-04-13")} onChange={() => {}} />
    );
    expect(getByText("Apr 2024")).toBeInTheDocument();

    fireEvent.click(getByText("Apr 2024"));
    expect(queryByText("Apr 2024")).not.toBeInTheDocument();
    expect(getByText("2024")).toBeInTheDocument();

    fireEvent.click(getByText("2024"));
    expect(getByText("2021-2030")).toBeInTheDocument();
  });
});
