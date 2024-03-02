import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";
import Checkbox, { CheckboxProps } from ".";

const meta = {
  title: "Base/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

const render = function Render(args: CheckboxProps) {
  const [{ checked }, updateArgs] = useArgs<CheckboxProps>();
  function onChange(check: boolean) {
    updateArgs({ checked: check });
  }
  return (
    <Checkbox
      {...args}
      checked={checked}
      onChange={(check: boolean) => onChange(check)}
    />
  );
};

export const Full_Unchecked: Story = {
  args: {
    id: "full-unchecked",
    children: "Subtask",
    checked: false,
  },
  render,
};

export const Full_Checked: Story = {
  args: {
    id: "full-checked",
    children: "Subtask",
    checked: true,
  },
  render,
};

export const Icon_Unchecked: Story = {
  args: {
    id: "icon-unchecked",
    children: "Subtask",
    checked: false,
    withIcon: true,
  },
  render,
};

export const Icon_Checked: Story = {
  args: {
    id: "icon-checked",
    children: "Subtask",
    checked: true,
    withIcon: true,
  },
  render,
};

export const Focus_Unchecked: Story = {
  args: {
    id: "focus-unchecked",
    children: "Subtask",
    checked: false,
    withIcon: true,
    withFocus: true,
  },
  render,
};

export const Focus_Checked: Story = {
  args: {
    id: "focus-checked",
    children: "Subtask",
    checked: true,
    withIcon: true,
    withFocus: true,
  },
  render,
};
