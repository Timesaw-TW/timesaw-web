import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";
import { ChangeEvent } from "react";
import TextInput, { TextInputProps } from ".";
import { SelectOption } from "../Dropdown";

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

const dropdownOptions: SelectOption<string>[] = [
  {
    label: "Work",
    value: "work",
  },
  {
    label: "Dating",
    value: "dating",
  },
];

export const Sample_1: Story = {
  name: "Input",
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
    button: {
      allowClear: true,
    },
  },
  render,
};

export const Sample_3: Story = {
  name: "Input with Dropdown",
  args: {
    placeholder: "Placeholder",
    showButton: true,
    showDropdown: true,
    button: {
      allowClear: true,
    },
    dropdown: {
      label: "Select an option or create one",
      options: dropdownOptions,
      allowCreate: true,
      onCreateClick: (value) => {
        alert(`press click and will create ${value}`);
      },
    },
  },
  render: function Render(args: TextInputProps) {
    const [{ value }, updateArgs] = useArgs<TextInputProps>();
    function onChange(e: ChangeEvent<HTMLInputElement>) {
      updateArgs({ value: e.target.value });
    }
    return <TextInput {...args} value={value} onChange={onChange} />;
  },
};
