import React, { useState } from "react";
import { render, fireEvent, renderHook, act } from "@testing-library/react";
import NumberSelect from ".";

describe("#NumberSelect", () => {
  it("should render correctly", () => {
    const { getByRole } = render(<NumberSelect id="number" name="number" />);
    const input = getByRole("spinbutton");
    expect(input).toBeInTheDocument();
  });

  it("should accept a number input within the range", () => {
    const { result } = renderHook(() => useState<number>(1));
    const handleChange = jest.fn();
    const { getByRole, rerender } = render(
      <NumberSelect
        id="number"
        name="number"
        value={result.current[0]}
        onChange={(e) => {
          handleChange(e);
          result.current[1](Number(e.target.value));
        }}
        min={1}
        max={31}
      />
    );
    const input = getByRole("spinbutton");
    fireEvent.change(input, { target: { value: "5" } });

    rerender(
      <NumberSelect
        id="number"
        name="number"
        value={result.current[0]}
        onChange={(e) => {
          handleChange(e);
          result.current[1](Number(e.target.value));
        }}
        min={1}
        max={31}
      />
    );

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(input).toHaveValue(5);
  });

  it("should not accept a number input outside the range", () => {
    const max = 32;
    const { result } = renderHook(() => useState<number>(1));
    const handleChange = jest.fn();
    const { getByRole, rerender } = render(
      <NumberSelect
        id="number"
        name="number"
        value={result.current[0]}
        onChange={(e) => {
          handleChange(e);
          result.current[1](Number(e.target.value));
        }}
        min={1}
        max={max}
      />
    );
    const input = getByRole("spinbutton");
    fireEvent.change(input, { target: { value: (max + 1).toString() } });

    rerender(
      <NumberSelect
        id="number"
        name="number"
        value={result.current[0]}
        onChange={(e) => {
          handleChange(e);
          result.current[1](Number(e.target.value));
        }}
        min={1}
        max={31}
      />
    );

    expect(handleChange).toHaveBeenCalledTimes(0);
    expect(input).toHaveValue(1);
    expect(input).not.toHaveValue(32);
  });

  it("should toggle dropdown on focus and outside click", () => {
    const { rerender, getByRole, container } = render(
      <NumberSelect id="number" name="number" />
    );
    const input = getByRole("spinbutton");
    fireEvent.focus(input);

    rerender(<NumberSelect id="number" name="number" />);

    expect(container.getElementsByTagName("ul")).toBeTruthy();

    fireEvent.mouseDown(document.body);

    rerender(<NumberSelect id="number" name="number" />);
    expect(container.getElementsByTagName("ul")).toHaveLength(0);
  });

  it("should change value from selecting the dropdown", () => {
    const { result } = renderHook(() => useState<number>(1));
    const handleChange = jest.fn();
    const { getByRole, rerender, getByText, debug } = render(
      <NumberSelect
        id="number"
        name="number"
        value={result.current[0]}
        onChange={(e) => {
          handleChange(e);
          result.current[1](Number(e.target.value));
        }}
        min={1}
        max={31}
      />
    );

    HTMLElement.prototype.scrollIntoView = jest.fn();

    const input = getByRole("spinbutton");
    fireEvent.focus(input);

    rerender(
      <NumberSelect
        id="number"
        name="number"
        value={result.current[0]}
        onChange={(e) => {
          handleChange(e);
          result.current[1](Number(e.target.value));
        }}
        min={1}
        max={31}
      />
    );

    const option = getByText("5");
    fireEvent.click(option);

    rerender(
      <NumberSelect
        id="number"
        name="number"
        value={result.current[0]}
        onChange={(e) => {
          handleChange(e);
          result.current[1](Number(e.target.value));
        }}
        min={1}
        max={31}
      />
    );

    expect(handleChange).toHaveBeenCalledWith(expect.anything());
    expect(input).toHaveValue(5);
  });
});
