import type { Meta, StoryObj } from "@storybook/react";

import { Button } from ".";

const meta = {
  title: "Base/Button/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Sample: Story = {
  name: "Button",
  args: {
    children: "Button",
  },
};

export const Sample_Light: Story = {
  name: "Button with light color",
  args: {
    children: "Button",
    className: "bg-soda-20",
  },
};
