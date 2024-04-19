import type { Meta, StoryObj } from "@storybook/react";
import Footnote from ".";

const meta = {
  title: "Base/Typography/Body-s",
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
    children: "Body-s",
  },
};

export const Bold: Story = {
  args: {
    children: "Body-s",
    bold: true,
  },
};
