import type { Meta, StoryObj } from "@storybook/react";
import ColorPicker from ".";

const meta = {
  title: "Base/ColorPicker",
  component: ColorPicker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ColorPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty_1: Story = {
  name: "Empty (Radio)",
  args: {
    selected: [],
  },
};

export const Empty_2: Story = {
  name: "Empty (Multiple)",
  args: {
    selected: [],
    allowMultiple: true,
  },
};

export const Select_1: Story = {
  name: "Selected (Radio)",
  args: {
    selected: ["#C5E7EE"],
  },
};

export const Select_2: Story = {
  name: "Selected (Multiple)",
  args: {
    selected: ["#C5E7EE", "#FCA8A6", "#FFD884", "#A7C122", "#9780B4"],
  },
};
