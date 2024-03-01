import type { Meta, StoryObj } from "@storybook/react";
import Caption from ".";

const meta = {
  title: "Base/Text/Caption",
  component: Caption,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Caption>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Sample: Story = {
  args: {
    children: "Caption",
  },
};

export const Bold: Story = {
  args: {
    children: "Caption",
    bold: true,
  },
};
