import type { Meta, StoryObj } from "@storybook/react";
import Checkbox from ".";
import { CheckboxProps } from "./type";
import { useFormik } from "formik";

const meta = {
  title: "Base/Form/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

const render = function Render(args: CheckboxProps) {
  const { handleChange, values } = useFormik({
    initialValues: {
      test: true,
    },
    onSubmit() {},
  });
  return <Checkbox {...args} checked={values.test} onChange={handleChange} />;
};

export const Full_Unchecked: Story = {
  args: {
    id: "test",
    name: "test",
    children: "Subtask",
    checked: false,
  },
  render,
};

export const Full_Checked: Story = {
  args: {
    id: "test",
    name: "test",
    children: "Subtask",
    checked: true,
  },
  render,
};

export const Icon_Unchecked: Story = {
  args: {
    id: "test",
    name: "test",
    children: "Subtask",
    checked: false,
    withIcon: true,
  },
  render,
};

export const Icon_Checked: Story = {
  args: {
    id: "test",
    name: "test",
    children: "Subtask",
    checked: true,
    withIcon: true,
  },
  render,
};

export const Focus_Unchecked: Story = {
  args: {
    id: "test",
    name: "test",
    children: "Subtask",
    checked: false,
    withIcon: true,
    withFocus: true,
  },
  render,
};

export const Focus_Checked: Story = {
  args: {
    id: "test",
    name: "test",
    children: "Subtask",
    checked: true,
    withIcon: true,
    withFocus: true,
  },
  render,
};
