import type { Meta, StoryObj } from "@storybook/react";
import Text from ".";

const meta = {
  title: "Base/Typography/Text",
  component: Text,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Sample: Story = {
  args: {
    children: "Text",
  },
};

export const Bold: Story = {
  args: {
    children: "Text",
    bold: true,
  },
};
