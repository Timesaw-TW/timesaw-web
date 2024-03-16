import React, { ChangeEvent, useState } from "react";
import { render, fireEvent, act } from "@testing-library/react";
import TextInput from ".";

describe("#TextInput", () => {
  it("should render TextInput with button correctly", () => {
    const { getByRole } = render(
      <TextInput id="test" name="test" showButton={true} />
    );
    const inputElement = getByRole("textbox");
    expect(inputElement).toBeInTheDocument();
    const buttonElement = getByRole("button");
    expect(buttonElement).toBeInTheDocument();
  });

  it("should render TextInput without button correctly", () => {
    const { getByRole, queryByRole } = render(
      <TextInput id="test" name="test" />
    );
    const inputElement = getByRole("textbox");
    expect(inputElement).toBeInTheDocument();
    const buttonElement = queryByRole("button");
    expect(buttonElement).toBeNull();
  });

  it("should clear input value when clear button is clicked", () => {
    const WrapperComponent = () => {
      const [value, setValue] = useState<string>();
      return (
        <TextInput
          id="test"
          name="test"
          showButton={true}
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setValue(e.target.value);
          }}
          button={{ allowClear: true }}
        />
      );
    };

    const { getByRole } = render(<WrapperComponent />);
    const inputElement = getByRole("textbox") as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: "Test value" } });
    expect(inputElement.value).toBe("Test value");
    const buttonElement = getByRole("button");
    fireEvent.click(buttonElement);
    expect(inputElement.value).toBe("");
  });

  it("should close dropdown when clicking outside the component", () => {
    const options = [
      {
        label: "Work",
        value: "work",
      },
      {
        label: "Dating",
        value: "dating",
      },
    ];
    const { getByRole, queryByRole } = render(
      <TextInput
        id="test"
        name="test"
        showButton={true}
        showDropdown
        dropdown={{ options }}
      />
    );
    const buttonElement = getByRole("button");
    fireEvent.click(buttonElement);
    expect(getByRole("list")).toBeInTheDocument();

    act(() => {
      fireEvent.mouseDown(document);
    });
    expect(queryByRole("list")).toBeNull();
  });

  it("should call custom onClick handler when button is clicked", () => {
    const onClickMock = jest.fn();
    const { getByRole } = render(
      <TextInput
        id="test"
        name="test"
        showButton={true}
        button={{ onClick: onClickMock }}
      />
    );
    const buttonElement = getByRole("button");
    fireEvent.click(buttonElement);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it("should call onCreateClick handler when creating a new option", () => {
    const onCreateClickMock = jest.fn();
    const { getByText, getByRole } = render(
      <TextInput
        id="test"
        name="test"
        value={"text"}
        showButton={true}
        showDropdown={true}
        dropdown={{
          options: [],
          allowCreate: true,
          onCreateClick: onCreateClickMock,
        }}
      />
    );
    const buttonElement = getByRole("button");
    fireEvent.click(buttonElement);

    const createButtonElement = getByText("Create");
    fireEvent.click(createButtonElement);
    expect(onCreateClickMock).toHaveBeenCalledTimes(1);
  });
});
