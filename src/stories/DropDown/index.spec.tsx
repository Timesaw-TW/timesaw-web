import React from "react";
import {
  fireEvent,
  getByText,
  render,
  renderHook,
  waitFor,
} from "@testing-library/react";
import { DropDown, SelectOption } from ".";
import { useState } from "react";
import { mock } from "node:test";

describe("#DropDown", () => {
  const optionList = [
    {
      label: "item1",
      value: "item1",
    },
    {
      label: "item2",
      value: "item2",
    },
  ];
  it("should render with default props", () => {
    const { container } = render(
      <DropDown
        options={optionList}
        label="Enter or Select a category"
        value={undefined}
        onChange={() => {}}
      />
    );
    expect(container).toBeInTheDocument();
  });

  it("should change the DropDown Outcome Value", () => {
    const { result } = renderHook(() => {
      const [value, setValue] = useState<SelectOption>();
      const handleChange = (option: SelectOption) => setValue(option);

      return { value, handleChange };
    });

    const { container } = render(
      <DropDown
        options={optionList}
        label="Enter or Select a category"
        value={result.current.value}
        onChange={result.current.handleChange}
      />
    );

    const dropDown = container;
    fireEvent.click(dropDown);
    fireEvent.click(getByText(container, "item2"));

    expect(result.current.value).toEqual(optionList[1]);
  });

  it("should indicate selected option", () => {
    const mockClick = jest.fn();
    const { container } = render(
      <DropDown
        options={optionList}
        value={optionList[0]}
        label="Select an option"
        onChange={mockClick}
      />
    );
    optionList.forEach((option: SelectOption) => {
      const optionElements = container.querySelectorAll(
        `[data-value="${option.value}"]`
      );
      optionElements.forEach((optionElement) => {
        expect(optionElement.classList.contains("bg-gray-300")).toBeTruthy();
        expect(optionElement.classList.contains("text-black")).toBeTruthy();
      });
    });
  });

  it("should call onChange when a different option", () => {
    const mockOnChange = jest.fn();

    const SELECTEDOPTION: SelectOption = {
      label: "item2",
      value: "item2",
    };
    const { getByText } = render(
      <DropDown
        options={optionList}
        value={optionList[0]}
        label="Select an option"
        onChange={mockOnChange}
      />
    );

    fireEvent.click(getByText(SELECTEDOPTION.label));

    expect(mockOnChange).toHaveBeenCalledWith(optionList[1]);
  });

  it("clicking the dropdown toggles isOpen state", async () => {
    const mockClick = jest.fn();
    const { queryByText, container } = render(
      <DropDown
        options={optionList}
        value={optionList[0]}
        label="Select an option"
        onChange={mockClick}
      />
    );

    const dropdown = container;
    fireEvent.click(dropdown);

    expect(queryByText("Select an option or create one")).toBeInTheDocument();
  });

  it("blurring the dropdown sets isOpen state to false", () => {
    const mockClick = jest.fn();

    const { container, queryByText } = render(
      <DropDown
        options={optionList}
        value={optionList[0]}
        label="Select an option"
        onChange={mockClick}
      />
    );

    const dropdown = container;
    fireEvent.click(dropdown);
    expect(queryByText("Select an option or create one")).toBeInTheDocument();

    fireEvent.blur(dropdown);

    setTimeout(() => {
      expect(queryByText("Select an option or create one")).toBeNull();
    }, 1000);
  });
});
