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

export const DefaultState: Story = {
  render: () => (
    <TimeButton
      options={[
        {
          label: "1 分鐘",
          value: 1,
        },
        {
          label: "15 分鐘",
          value: 15,
        },
        {
          label: "30 分鐘",
          value: 30,
        },
        {
          label: "1 小時",
          value: 60,
        },
        {
          label: "1.5 小時",
          value: 90,
        },
      ]}
    />
  ),
};

export const DifferentTimePeriodQuantities: Story = {
  render: () => (
    <TimeButton
      options={[
        {
          label: "1 分鐘",
          value: 1,
        },
        {
          label: "15 分鐘",
          value: 15,
        },
        {
          label: "30 分鐘",
          value: 30,
        },
      ]}
    />
  ),
};

export const CustomStyles: Story = {
  render: () => (
    <TimeButton
      options={[
        {
          label: <span style={{ color: "red" }}>1 分鐘</span>,
          value: 1,
        },
        {
          label: <span style={{ color: "blue" }}>15 分鐘</span>,
          value: 15,
        },
        {
          label: <span style={{ color: "green" }}>30 分鐘</span>,
          value: 30,
        },
        {
          label: <span style={{ color: "orange" }}>1 小時</span>,
          value: 60,
        },
        {
          label: <span style={{ color: "purple" }}>1.5 小時</span>,
          value: 90,
        },
      ]}
    />
  ),
};
