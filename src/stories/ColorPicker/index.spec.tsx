import { render, fireEvent } from "@testing-library/react";
import ColorPicker, { DEFAULT_COLORS } from ".";

describe("#ColorPicker", () => {
  it("should render with correct colors", () => {
    const { container } = render(<ColorPicker selected={[]} />);
    expect(container.getElementsByTagName("button").length).toBe(
      DEFAULT_COLORS.length
    );
  });

  it("should allow selecting color", () => {
    const mockOnClick = jest.fn();
    const { container } = render(
      <ColorPicker selected={[]} onClick={mockOnClick} />
    );
    const element = container.getElementsByTagName("button");
    fireEvent.click(element[0]);
    expect(mockOnClick).toHaveBeenCalledWith([DEFAULT_COLORS[0].code]);
  });

  it("should not allow deselecting color when allowMultiple is false", () => {
    const mockOnClick = jest.fn();
    const { container } = render(
      <ColorPicker selected={[DEFAULT_COLORS[0].code]} onClick={mockOnClick} />
    );
    const element = container.getElementsByTagName("button");
    fireEvent.click(element[0]);
    expect(mockOnClick).toHaveBeenCalledWith([DEFAULT_COLORS[0].code]);
  });

  it("should allow selecting multiple colors if allowMultiple is true", () => {
    const mockOnClick = jest.fn();
    const { container } = render(
      <ColorPicker
        selected={[DEFAULT_COLORS[0].code]}
        onClick={mockOnClick}
        allowMultiple
      />
    );
    const element = container.getElementsByTagName("button");
    fireEvent.click(element[1]);
    fireEvent.click(element[2]);
    expect(mockOnClick).toHaveBeenCalledWith([
      DEFAULT_COLORS[0].code,
      DEFAULT_COLORS[1].code,
      DEFAULT_COLORS[2].code,
    ]);
  });

  it("should allow deselecting color when allowMultiple is true", () => {
    const mockOnClick = jest.fn();
    const { container } = render(
      <ColorPicker
        selected={[DEFAULT_COLORS[0].code]}
        onClick={mockOnClick}
        allowMultiple={true}
      />
    );
    const element = container.getElementsByTagName("button");
    fireEvent.click(element[0]);
    expect(mockOnClick).toHaveBeenCalledWith([]);
  });
});
