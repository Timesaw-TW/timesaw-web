import { render, fireEvent } from "@testing-library/react";
import Checkbox from ".";

describe("#Checkbox", () => {
  it("should call onChange event when clicked", () => {
    const onChangeMock = jest.fn();
    const { getByLabelText } = render(
      <Checkbox id="test" name="test" checked={false} onChange={onChangeMock}>
        Test Checkbox
      </Checkbox>
    );

    const checkbox = getByLabelText("Test Checkbox");
    fireEvent.click(checkbox);

    expect(onChangeMock).toHaveBeenCalledTimes(1);
  });

  it("should render with icon when withIcon is true", () => {
    const { container } = render(
      <Checkbox id="test" name="test" checked={false} withIcon>
        Test Checkbox
      </Checkbox>
    );

    expect(container.getElementsByTagName("svg")).toHaveLength(1);
  });

  it("should render with focus styles when withFocus is true", () => {
    const { container } = render(
      <Checkbox id="test" name="test" checked={false} withFocus>
        Test Checkbox
      </Checkbox>
    );

    fireEvent.focus(container);

    expect(container.getElementsByTagName("input")[0]).toHaveClass(
      "focus:ring-secondary"
    );
  });

  it("should render text children as Text component", () => {
    const { container, getByText } = render(
      <Checkbox id="test" name="test" checked={false}>
        Text Children
      </Checkbox>
    );

    expect(container.getElementsByTagName("span")).toHaveLength(1);
    expect(getByText("Text Children")).toBeInTheDocument();
  });

  it("should render non-text children as React elements", () => {
    const iconElement = <div data-testid="icon">Icon Element</div>;
    const { getByTestId } = render(
      <Checkbox id="test" name="test" checked={false}>
        {iconElement}
      </Checkbox>
    );

    expect(getByTestId("icon")).toBeInTheDocument();
  });
});
