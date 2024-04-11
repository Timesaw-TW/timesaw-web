import type { Meta, StoryObj } from "@storybook/react";
import SegmentedPicker from ".";
import { SegmentedPickerProps, SegmentedProps } from "./type";

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

const render = function Render(args: SegmentedPickerProps) {
  return <SegmentedPicker {...args} />;
};
export const Sample_1: Story = {
  render: () => (
    <SegmentedPicker
      options={[
        {
          label: "Task",
          value: "Task",
        },
        {
          label: "Puzzle",
          value: "Puzzle",
        },
        {
          label: "Messy Box",
          value: "MessyBox",
        },
      ]}
      setSelectedPeriod={(time: string) => console.log(time)}
    />
  ),
};
