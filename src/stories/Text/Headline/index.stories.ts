import type { Meta, StoryObj } from "@storybook/react";
import Headline from ".";

const meta = {
  title: "Base/Text/Headline",
  component: Headline,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Headline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Sample: Story = {
  args: {
    children: "Headline",
  },
};

export const Bold: Story = {
  args: {
    children: "Headline",
    bold: true,
  },
};
