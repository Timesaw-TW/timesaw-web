import { render, fireEvent } from "@testing-library/react";
import Dropdown from ".";
import { DropdownProps, SelectOption } from "./type";

describe("#Dropdown", () => {
  const options: SelectOption<number>[] = [
    { label: "Option 1", value: 1 },
    { label: "Option 2", value: 2 },
    { label: "Option 3", value: 3 },
  ];

  const onChangeMock = jest.fn();
  const onCreateClickMock = jest.fn();

  const defaultProps: DropdownProps<number> = {
    label: "Select an option",
    onChange: onChangeMock,
    options: options,
  };

  it("should render with default props", () => {
    const { getByText } = render(<Dropdown {...defaultProps} />);
    const labelElement = getByText("Select an option");
    expect(labelElement).toBeInTheDocument();
  });

  it("should render options correctly", () => {
    const { getByText } = render(<Dropdown {...defaultProps} />);
    options.forEach((option) => {
      const optionElement = getByText(option.label);
      expect(optionElement).toBeInTheDocument();
    });
  });

  it("should trigger onChange event correctly", () => {
    const { getByText } = render(<Dropdown {...defaultProps} />);
    const optionElement = getByText("Option 1");
    fireEvent.click(optionElement);
    expect(onChangeMock).toHaveBeenCalledWith(options[0]);
  });

  it("should allow creating new option", () => {
    const { getByText } = render(
      <Dropdown
        {...defaultProps}
        allowCreate
        searchValue="New Option"
        onCreateClick={onCreateClickMock}
      />
    );
    const createOptionElement = getByText("Create");
    fireEvent.click(createOptionElement);
    expect(onCreateClickMock).toHaveBeenCalledWith("New Option");
  });

  it("should render string label correctly", () => {
    const { getByText } = render(<Dropdown {...defaultProps} />);
    const labelElement = getByText("Select an option");
    expect(labelElement).toBeInTheDocument();
  });

  it("should render custom node label correctly", () => {
    const customLabel = <div>Custom Label</div>;
    const { getByText } = render(
      <Dropdown {...defaultProps} label={customLabel} />
    );
    const labelElement = getByText("Custom Label");
    expect(labelElement).toBeInTheDocument();
  });
});
