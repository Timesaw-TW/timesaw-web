import type { Meta, StoryObj } from "@storybook/react";
import Footnote from ".";

const meta = {
  title: "Base/Typography/Footnote",
  component: Footnote,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Footnote>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Sample: Story = {
  args: {
    children: "Footnote",
  },
};

export const Bold: Story = {
  args: {
    children: "Footnote",
    bold: true,
  },
};
