import type { Meta, StoryObj } from "@storybook/react";
import DateTimePicker from ".";
import { useFormik } from "formik";
import { DateTimePickerProps } from "./type";
import dayjs from "dayjs";

const meta = {
  title: "Base/Form/DateTimePicker",
  component: DateTimePicker,
  tags: ["autodocs"],
} satisfies Meta<typeof DateTimePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

// eslint-disable-next-line react/display-name
const render = (time?: string) => (args: DateTimePickerProps) => {
  const { handleChange, values, handleSubmit } = useFormik({
    initialValues: {
      time,
    },
    onSubmit: (values) => {
      if (values.time) {
        alert(new Date(values.time).toLocaleString());
      }
    },
  });
  return (
    <div className="h-[46px] w-[328px] p-10">
      <form onSubmit={handleSubmit}>
        <DateTimePicker {...args} value={values.time} onChange={handleChange} />
        <button
          className="mt-5 rounded border bg-slate-500/50 p-1"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export const Sample_1: Story = {
  name: "DateTimePicker",
  args: {
    id: "time",
    name: "time",
  },
  render: render(),
};

export const Sample_2: Story = {
  name: "DateTimePicker with initial value",
  args: {
    id: "time",
    name: "time",
  },
  render: render(dayjs("2024/4/15 12:59").toISOString()),
};

export const Sample_3: Story = {
  name: "DateTimePicker with min",
  args: {
    id: "time",
    name: "time",
    min: dayjs("2023/02/03 12:58"),
  },
  render: render(dayjs("2024/4/15 12:59").toISOString()),
};

export const Sample_4: Story = {
  name: "DateTimePicker with max",
  args: {
    id: "time",
    name: "time",
    max: dayjs("2029/02/01 13:00"),
  },
  render: render(dayjs("2024/4/15 10:00").toISOString()),
};
