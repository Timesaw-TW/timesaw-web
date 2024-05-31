import type { Meta, StoryObj } from "@storybook/react";
import { SegmentedPickerProps } from "./type";
import { SegmentedPicker } from ".";

const meta: Meta<typeof SegmentedPicker> = {
  title: "Base/SegmentedPicker",
  component: SegmentedPicker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof SegmentedPicker>;

export const DefaultState: Story = {
  render: () => (
    <SegmentedPicker
      className="h-[40px] w-[320px]"
      segments={["Task", "Puzzle", "MessyBox"]}
      onSelect={(value) => {
        console.log(value);
      }}
    />
  ),
};

export const LoginSegmentPicker: Story = {
  render: () => (
    <SegmentedPicker
      className="h-[40px] w-[320px]"
      segments={["註冊", "登入"]}
      onSelect={(value) => {
        console.log(value);
      }}
    />
  ),
};
