import type { Meta, StoryObj } from "@storybook/react";
import TimeButton from ".";
import { TimeButtonProps, Periods } from "./type";

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

const render = function Render(args: TimeButtonProps) {
  return <TimeButton {...args} />;
};
export const Sample_1: Story = {
  render: () => (
    <TimeButton
      timePeriods={[
        {
          time: "1分鐘",
          value: "1",
        },
        {
          time: "15分鐘",
          value: "15",
        },
        {
          time: "30分鐘",
          value: "30",
        },
        {
          time: "1小時",
          value: "60",
        },
        {
          time: "1.5小時",
          value: "90",
        },
      ]}
      clickEvent={(time: string) => console.log(time)}
    />
  ),
};
