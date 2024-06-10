import type { Meta, StoryObj } from "@storybook/react";
import FAB from ".";
import { IconCheckCircleOutline, IconChevronDown } from "../Icons";

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
  name: "Task Label",
  args: {
    showLabel: true,
    label: "任務",
    className: "w-32 rounded-[6.25rem] bg-soda-20",
    onClick: () => alert("click"),
    icon: IconCheckCircleOutline,
  },
};

export const Example_4: Story = {
  name: "Default Label",
  args: {
    showLabel: true,
    className: "w-32 rounded-[6.25rem] bg-soda-20",
    onClick: () => alert("click"),
  },
};

export const Example_5: Story = {
  name: "Custom Label",
  args: {
    className: "w-32 rounded-[6.25rem] bg-soda-20",
    icon: IconChevronDown,
    showLabel: true,
    label: "Open",
    onClick: () => alert("click"),
  },
};
