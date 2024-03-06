import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";
import { ChangeEvent } from "react";
import TextInput, { TextInputProps } from ".";

const meta: Meta<typeof TextInput> = {
  title: "Base/TextInput",
  component: TextInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof TextInput>;

const render = function Render(args: TextInputProps) {
  const [{ value }, updateArgs] = useArgs<TextInputProps>();
  function onChange(e: ChangeEvent<HTMLInputElement>) {
    updateArgs({ value: e.target.value });
  }
  return <TextInput {...args} value={value} onChange={onChange} />;
};

export const Sample_1: Story = {
  name: "Pure Input",
  args: {
    placeholder: "Placeholder",
  },
  render,
};

export const Sample_2: Story = {
  name: "Input with icon",
  args: {
    placeholder: "Placeholder",
    showButton: true,
  },
  render,
};
