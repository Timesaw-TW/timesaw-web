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

export const Sample_1: Story = {
  name: "Button Primary/Soda Blue/80%",
  args: {
    children: "Button",
    className: "!bg-soda-80",
  },
};

export const Sample_2: Story = {
  name: "Button Primary/Soda Blue/100%",
  args: {
    children: "Button",
    className: "!bg-soda-100",
  },
};

export const Sample_3: Story = {
  name: "Button Primary/Soda Blue/60%",
  args: {
    children: "Button",
    className: "!bg-soda-60",
  },
};

export const Sample_4: Story = {
  name: "Button Primary/Soda Blue/40%",
  args: {
    children: "Button",
    className: "!bg-soda-40",
  },
};

export const Sample_5: Story = {
  name: "Button Primary/Soda Blue/20%",
  args: {
    children: "Button",
    className: "!bg-soda-20",
  },
};
