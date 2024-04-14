import type { Meta, StoryObj } from "@storybook/react";
import SubHeadline from ".";

const meta = {
  title: "Base/Typography/SubHeadline",
  component: SubHeadline,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SubHeadline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Sample: Story = {
  args: {
    children: "SubHeadline",
  },
};

export const Bold: Story = {
  args: {
    children: "SubHeadline",
    bold: true,
  },
};
