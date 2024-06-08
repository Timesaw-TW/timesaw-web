import { render, fireEvent } from "@testing-library/react";
import { SegmentedPicker } from ".";
import { SegmentedPickerProps, Segment } from "./type";

describe("SegmentedPicker", () => {
  const segmentsArray: Segment<string>[] = [
    { value: "Task", label: "Task" },
    { value: "Puzzle", label: "Puzzle" },
    { value: "MessyBox", label: "MessyBox" },
  ];
  const onChangeMock = jest.fn();

  const defaultProps: SegmentedPickerProps<string> = {
    className: "",
    segments: segmentsArray,
    onSelect: onChangeMock,
  };

  test("should render correctly with given segments", () => {
    const { getByText } = render(<SegmentedPicker {...defaultProps} />);

    segmentsArray.forEach((segment) => {
      expect(getByText(segment.label)).toBeInTheDocument();
    });
  });

  test("should call onSelect when a segment is clicked", () => {
    const { getByText } = render(<SegmentedPicker {...defaultProps} />);
    const taskButton = getByText("Task");

    fireEvent.click(taskButton);

    expect(onChangeMock).toHaveBeenCalledWith("Task");
    expect(onChangeMock).toHaveBeenCalledTimes(1);
  });
});
