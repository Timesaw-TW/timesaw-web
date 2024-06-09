import type { Meta, StoryObj } from "@storybook/react";
import Dropdown from ".";
import { DropdownProps, SelectOption } from "./type";

const meta: Meta<typeof Dropdown> = {
  title: "Base/Form/Dropdown",
  component: Dropdown,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Dropdown>;

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

const render = function Render(args: DropdownProps<unknown>) {
  return (
    <div className="relative">
      <Dropdown {...args} />
    </div>
  );
};

export const Sample_1: Story = {
  name: "Dropdown",
  args: {
    options: dropdownOptions,
    label: "Select an option or create one",
  },
  render,
};

export const Sample_2: Story = {
  name: "Dropdown with create",
  args: {
    options: dropdownOptions,
    label: "Select an option or create one",
    allowCreate: true,
    searchValue: "Holiday",
  },
  render,
};
