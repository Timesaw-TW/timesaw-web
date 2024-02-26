import React from "react";
import {
  fireEvent,
  getByText,
  render,
  renderHook,
} from "@testing-library/react";
import { DropDown, SelectOption } from ".";
import { useState } from "react";
import { act } from "react-dom/test-utils";

describe("#DropDown", () => {
  it("should render with default props", () => {
    const option = [
      {
        label: "item1",
        value: "item1",
      },
      {
        label: "item2",
        value: "item2",
      },
    ];
    const { container } = render(
      <DropDown
        options={option}
        label="Enter or Select a category"
        value={undefined}
        onChange={() => {}}
      />
    );
    expect(container).toBeInTheDocument();
  });
});

it("should change the DropDown Outcome Value", () => {
  const options = [
    {
      label: "item1",
      value: "item1",
    },
    {
      label: "item2",
      value: "item2",
    },
  ];

  const { result } = renderHook(() => {
    const [value, setValue] = useState<SelectOption>();
    const handleChange = (option: SelectOption) => setValue(option);

    return { value, handleChange };
  });

  const { container } = render(
    <DropDown
      options={options}
      label="Enter or Select a category"
      value={result.current.value}
      onChange={result.current.handleChange}
    />
  );

  const dropDown = container;
  fireEvent.click(dropDown); // 模擬點擊下拉框
  fireEvent.click(getByText(container, "item2")); // 模擬點擊選項 "item2"

  expect(result.current.value).toEqual(options[1]);
});
