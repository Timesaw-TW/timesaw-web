import type { Meta, StoryObj } from "@storybook/react";
import ProgressCircle from ".";

const meta = {
  title: "Base/ProgressCircle",
  component: ProgressCircle,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ProgressCircle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example_1: Story = {
  name: "0%",
  args: {
    percentage: 0,
  },
};

export const Example_2: Story = {
  name: "25%",
  args: {
    percentage: 25,
  },
};

export const Example_3: Story = {
  name: "50%",
  args: {
    percentage: 50,
  },
};

export const Example_4: Story = {
  name: "75%",
  args: {
    percentage: 75,
  },
};

export const Example_5: Story = {
  name: "100%",
  args: {
    percentage: 100,
  },
};
