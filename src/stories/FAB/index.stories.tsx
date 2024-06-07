import type { Meta, StoryObj } from "@storybook/react";
import FAB from ".";
import { IconChevronDown } from "../Icons";

const meta = {
  title: "Base/Button/FAB",
  component: FAB,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof FAB>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example_1: Story = {
  name: "Default Icon",
  args: {
    onClick: () => alert("click"),
  },
};

export const Example_2: Story = {
  name: "Custom Icon",
  args: {
    icon: IconChevronDown,
    onClick: () => alert("click"),
  },
};

export const Example_3: Story = {
  name: "Default Label",
  args: {
    showLabel: true,
    className: "h-[48px] w-[128px] rounded-[100px] bg-soda-20",
    onClick: () => alert("click"),
  },
};

export const Example_4: Story = {
  name: "Custom Label",
  args: {
    className: "h-[48px] w-[128px] rounded-[100px] bg-soda-20",
    icon: IconChevronDown,
    showLabel: true,
    label: "Open",
    onClick: () => alert("click"),
  },
};
