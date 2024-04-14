import { render, fireEvent } from "@testing-library/react";
import DateTimePickerMenu from "../menu";
import dayjs from "dayjs";

describe("#DateTimePicker > DateTimePickerMenu", () => {
  const onModeChange = jest.fn();
  const onChange = jest.fn();

  it("should render correctly", () => {
    const { getByText } = render(
      <DateTimePickerMenu
        mode="date"
        year={2024}
        month={3}
        onModeChange={onModeChange}
        onChange={onChange}
      />
    );
    expect(getByText("Mar 2024")).toBeInTheDocument();
  });

  it("should trigger onModeChange when click title button ", () => {
    const { getByText } = render(
      <DateTimePickerMenu
        mode="date"
        year={2024}
        month={3}
        onModeChange={onModeChange}
        onChange={onChange}
      />
    );
    const modeButton = getByText("Mar 2024");
    fireEvent.click(modeButton);
    expect(onModeChange).toHaveBeenCalled();
  });

  it("should invisible previous button when year/month is at min limit", () => {
    const { queryAllByRole } = render(
      <DateTimePickerMenu
        mode="date"
        year={2024}
        month={1}
        onModeChange={onModeChange}
        onChange={onChange}
        min={dayjs("2024/01/01")}
      />
    );
    const button = queryAllByRole("button")[0];
    expect(button).toHaveClass("invisible");
  });

  it("should invisible next button when year/month is at max limit", () => {
    const { queryAllByRole } = render(
      <DateTimePickerMenu
        mode="date"
        year={2024}
        month={12}
        onModeChange={onModeChange}
        onChange={onChange}
        max={dayjs("2024-12-31")}
      />
    );
    const button = queryAllByRole("button")[2];
    expect(button).toHaveClass("invisible");
  });

  it("should trigger onChange with type previous when click previous button ", () => {
    const { queryAllByRole } = render(
      <DateTimePickerMenu
        mode="date"
        year={2024}
        month={3}
        onModeChange={onModeChange}
        onChange={onChange}
        min={dayjs("2024-01-01")}
      />
    );
    const previousButton = queryAllByRole("button")[0];
    fireEvent.click(previousButton);

    expect(onChange).toHaveBeenCalledWith({ type: "previous", mode: "date" });
  });

  it("should trigger onChange with type next when click next button", () => {
    const { queryAllByRole } = render(
      <DateTimePickerMenu
        mode="date"
        year={2024}
        month={3}
        onModeChange={onModeChange}
        onChange={onChange}
        max={dayjs("2024-12-31")}
      />
    );
    const nextButton = queryAllByRole("button")[2];
    fireEvent.click(nextButton);

    expect(onChange).toHaveBeenCalledWith({ type: "next", mode: "date" });
  });
});
