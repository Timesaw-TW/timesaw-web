import type { Meta, StoryObj } from "@storybook/react";

import { Button } from ".";

const meta = {
  title: "Base/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary_100: Story = {
  args: {
    theme: "primary",
    children: "Button",
    level: 100,
  },
};

export const Primary_80: Story = {
  args: {
    theme: "primary",
    children: "Button",
    level: 80,
  },
};

export const Primary_60: Story = {
  args: {
    theme: "primary",
    children: "Button",
    level: 60,
  },
};

export const Primary_40: Story = {
  args: {
    theme: "primary",
    children: "Button",
    level: 40,
  },
};

export const Primary_20: Story = {
  args: {
    theme: "primary",
    children: "Button",
    level: 20,
  },
};

export const Secondary_100: Story = {
  args: {
    theme: "secondary",
    children: "Button",
    level: 100,
  },
};

export const Secondary_80: Story = {
  args: {
    theme: "secondary",
    children: "Button",
    level: 80,
  },
};

export const Secondary_60: Story = {
  args: {
    theme: "secondary",
    children: "Button",
    level: 60,
  },
};

export const Secondary_40: Story = {
  args: {
    theme: "secondary",
    children: "Button",
    level: 40,
  },
};

export const Secondary_20: Story = {
  args: {
    theme: "secondary",
    children: "Button",
    level: 20,
  },
};
