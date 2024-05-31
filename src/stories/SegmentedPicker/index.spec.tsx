import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { SegmentedPicker } from "."; // Adjust the import if the file path is different
import { SegmentedPickerProps } from "./type";

describe("SegmentedPicker", () => {
  const segments = ["Task", "Puzzle", "MessyBox"];
  const onChangeMock = jest.fn();

  const defaultProps: SegmentedPickerProps = {
    className: "",
    segments: segments,
    onSelect: onChangeMock,
  };

  test("should render correctly with given segments", () => {
    render(
      <SegmentedPicker {...defaultProps} className="h-[40px] w-[320px]" />
    );

    segments.forEach((segment) => {
      expect(screen.getByText(segment)).toBeInTheDocument();
    });
  });

  test("should call onSelect when a segment is clicked", () => {
    render(<SegmentedPicker {...defaultProps} />);

    const taskButton = screen.getByText("Task");
    fireEvent.click(taskButton);

    expect(onChangeMock).toHaveBeenCalledWith("Task");
    expect(onChangeMock).toHaveBeenCalledTimes(1);
  });

  test("should update the selected segment when clicked", () => {
    render(<SegmentedPicker {...defaultProps} />);

    const puzzleButton = screen.getByText("Puzzle");
    fireEvent.click(puzzleButton);

    expect(puzzleButton).toHaveClass("font-bold");

    const taskButton = screen.getByText("Task");
    expect(taskButton).toHaveClass("font-normal");
  });
});
