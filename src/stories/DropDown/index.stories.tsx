import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";
import { DropDown, SelectOption } from ".";

const meta: Meta<typeof DropDown> = {
  title: "Base/DropDown",
  component: DropDown,
  parameters: {
    layout: "cnetered",
  },
  tags: ["autodocs"],
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof DropDown>;

export const DefaultUseage: Story = {
  args: {
    onChange: (option: SelectOption<any>) => {},
    options: [
      {
        label: "item1",
        value: "item1",
      },
      {
        label: "item2",
        value: "item2",
      },
    ],
    value: undefined,
    label: "Enter or Select a category",
  },
  render: function Render(args) {
    const [{ value }, updateArgs] = useArgs();
    function onChange(option: SelectOption<any>) {
      updateArgs({ value: option });
    }
    return (
      <DropDown
        {...args}
        value={value}
        onChange={(option: SelectOption<any>) => onChange(option)}
      />
    );
  },
};
