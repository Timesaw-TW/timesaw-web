import type { Meta, StoryObj } from "@storybook/react";
import { Segment } from "./type";
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

const SEGMENT_ARRAY: Segment<string>[] = [
  { value: "Task", label: "Task" },
  { value: "Puzzle", label: "Puzzle" },
  { value: "MessyBox", label: "MessyBox" },
];

export const DefaultState: Story = {
  render: () => (
    <SegmentedPicker
      className="h-[40px] w-[320px]"
      segments={SEGMENT_ARRAY}
      onSelect={(value) => {
        console.log(value);
      }}
    />
  ),
};

const LOGIN_SEGMENT_ARRAY: Segment<string>[] = [
  { value: "註冊", label: "註冊" },
  { value: "登入", label: "登入" },
];

export const LoginSegmentPicker: Story = {
  render: () => (
    <SegmentedPicker
      className="h-[40px] w-[320px]"
      segments={LOGIN_SEGMENT_ARRAY}
      onSelect={(value) => {
        console.log(value);
      }}
    />
  ),
};
