import type { Meta, StoryObj } from "@storybook/react";
import NumberSelect from ".";
import { NumberSelectProps } from "./type";
import { useFormik } from "formik";

const meta: Meta<typeof NumberSelect> = {
  title: "Base/Form/NumberSelect",
  component: NumberSelect,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof NumberSelect>;

const render = function Render(args: NumberSelectProps) {
  const { handleSubmit, handleChange, values } = useFormik({
    initialValues: {
      number: 1,
    },
    onSubmit: (value) => {
      alert(JSON.stringify(value));
    },
  });
  return (
    <form onSubmit={handleSubmit} className="p-10">
      <NumberSelect
        {...args}
        value={Number(values.number)}
        onChange={handleChange}
        className="w-14"
        dropdown={{
          className: "bottom-12",
        }}
      />
      <button type="submit" className="mt-5 rounded border bg-slate-500/50 p-1">
        Submit
      </button>
    </form>
  );
};

export const Sample_1: Story = {
  name: "NumberSelect",
  args: {
    id: "number",
    name: "number",
    min: 1,
    max: 31,
  },
  render,
};
