import type { Meta, StoryObj } from "@storybook/react";
import ButtonIcon from ".";
import { IconTrashOutline, IconTrashSolid } from "../Icons";

const meta = {
  title: "Base/Button/Button Icon",
  component: ButtonIcon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ButtonIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Trash_Outline: Story = {
  args: {
    label: "Delete",
    className: "w-24",
    children: <IconTrashOutline />,
  },
};

export const Trash_Solid: Story = {
  args: {
    label: "Delete",
    className: "w-24",
    children: <IconTrashSolid />,
  },
};
