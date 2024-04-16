import type { Meta, StoryObj } from "@storybook/react";
import TimeButton from ".";

const meta: Meta<typeof TimeButton> = {
  title: "Base/TimeButton",
  component: TimeButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
};
export default meta;
type Story = StoryObj<typeof TimeButton>;

export const Sample_1: Story = {
  render: () => (
    <TimeButton
      timePeriods={[1, 15, 30, 60, 90]}
      onTimeSelect={(time: number) => console.log(time)}
    />
  ),
};
