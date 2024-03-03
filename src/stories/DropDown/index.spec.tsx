import React from "react";
import {
  fireEvent,
  getByText,
  render,
  renderHook,
  act,
} from "@testing-library/react";
import { DropDown, SelectOption } from ".";
import { useState } from "react";

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
  const defaultLabel = "Select an option";
  it("should render DropDown Component with default props", () => {
    const { container } = render(
      <DropDown
        isOpen={false}
        options={optionList}
        setIsOpen={undefined}
        label={defaultLabel}
        value={undefined}
        onChange={() => {}}
      />
    );
    expect(container).toBeInTheDocument();
  });

  it("should change the DropDown Outcome Value", () => {
    const { result } = renderHook(() => {
      const [value, setValue] = useState<SelectOption<any>>();
      const handleChange = (option: SelectOption<any>) => setValue(option);

      return { value, handleChange };
    });

    const { container } = render(
      <DropDown
        isOpen={false}
        setIsOpen={undefined}
        options={optionList}
        label={defaultLabel}
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
        isOpen={false}
        setIsOpen={undefined}
        options={optionList}
        value={optionList[0]}
        label={defaultLabel}
        onChange={mockClick}
      />
    );
    optionList.forEach((option: SelectOption<any>) => {
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
    const SELECTEDOPTION: SelectOption<any> = {
      label: "item2",
      value: "item2",
    };
    const { getByText } = render(
      <DropDown
        isOpen={false}
        setIsOpen={undefined}
        options={optionList}
        value={optionList[0]}
        label={defaultLabel}
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
        label={defaultLabel}
        onChange={mockClick}
      />
    );

    const dropdown = container;
    fireEvent.click(dropdown);
    expect(queryByText("Select an option or create one")).toBeInTheDocument();
  });

  it("should being open by ouside state", async () => {
    const mockClick = jest.fn();
    const { result } = renderHook(() => useState<boolean>(false));

    const { container } = render(
      <DropDown
        options={optionList}
        value={optionList[0]}
        label={defaultLabel}
        isOpen={result.current[0]}
        setIsOpen={result.current[1]}
        onChange={mockClick}
      />
    );
    act(() => {
      result.current[1](true);
    });
    expect(container).toBeInTheDocument();
    expect(result.current[0]).toBe(true);
  });

  it("should render options block when isOpen is true", () => {
    const { container } = render(
      <DropDown
        options={optionList}
        value={optionList[0]}
        label={defaultLabel}
        onChange={() => {}}
        isOpen={true}
      />
    );

    const optionsBlock = container.querySelector(".block");
    const hiddenBlock = container.querySelector(".hidden");

    expect(optionsBlock).toBeInTheDocument();
    expect(hiddenBlock).toBeNull();
  });

  it("should set isOpen's state by outside stateProps", () => {
    const { result } = renderHook(() => useState<boolean>(false));
    const { queryByText } = render(
      <DropDown
        options={optionList}
        value={optionList[0]}
        label={defaultLabel}
        onChange={() => {}}
        isOpen={result.current[0]}
        setIsOpen={result.current[1]}
      />
    );

    act(() => {
      result.current[1](true);
    });

    expect(result.current[0]).toBe(true);
    expect(queryByText("Select an option or create one")).toBeInTheDocument();

    act(() => {
      result.current[1](false);
    });

    expect(result.current[0]).toBe(false);
  });
});
