import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";
import { ChangeEvent } from "react";
import TextInput from ".";
import { useFormik } from "formik";
import * as yup from "yup";
import clsx from "clsx";
import { SelectOption } from "../Dropdown/type";
import { TextInputProps } from "./type";

const meta: Meta<typeof TextInput> = {
  title: "Base/Form/TextInput",
  component: TextInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof TextInput>;

const render = function Render(args: TextInputProps) {
  const [{ value }, updateArgs] = useArgs<TextInputProps>();
  function onChange(e: ChangeEvent<HTMLInputElement>) {
    updateArgs({ value: e.target.value });
  }
  return <TextInput {...args} value={value} onChange={onChange} />;
};

const dropdownOptions: SelectOption<string>[] = [
  {
    label: "Work",
    value: "work",
  },
  {
    label: "Dating",
    value: "dating",
  },
];

export const Sample_1: Story = {
  name: "Input",
  args: {
    id: "test",
    name: "test",
    placeholder: "Placeholder",
  },
  render,
};

export const Sample_2: Story = {
  name: "Input with icon",
  args: {
    id: "test",
    name: "test",
    placeholder: "Placeholder",
    showButton: true,
    button: {
      allowClear: true,
    },
  },
  render,
};

export const Sample_3: Story = {
  name: "Input with Dropdown",
  args: {
    id: "test",
    name: "test",
    placeholder: "Placeholder",
    showButton: true,
    showDropdown: true,
    button: {
      allowClear: true,
    },
    dropdown: {
      label: "Select an option or create one",
      options: dropdownOptions,
      allowCreate: true,
      onCreateClick: (value) => {
        alert(`press click and will create ${value}`);
      },
    },
  },
  render: function Render(args: TextInputProps) {
    const [{ value }, updateArgs] = useArgs<TextInputProps>();
    function onChange(e: ChangeEvent<HTMLInputElement>) {
      updateArgs({ value: e.target.value });
    }
    return <TextInput {...args} value={value} onChange={onChange} />;
  },
};

export const Sample_4: Story = {
  name: "Input with Validation",
  args: {
    id: "category",
    name: "category",
    placeholder: "Placeholder",
    showButton: true,
    showDropdown: true,
    button: {
      allowClear: true,
    },
    dropdown: {
      label: "Select an option or create one",
      options: dropdownOptions,
      allowCreate: true,
      onCreateClick: (value) => {
        alert(`press click and will create ${value}`);
      },
    },
  },
  render: function Render(args: TextInputProps) {
    const {
      errors,
      values,
      handleChange,
      handleSubmit,
      isSubmitting,
      isValid,
      dirty,
    } = useFormik({
      initialValues: { category: "" },
      validationSchema: yup.object({
        category: yup
          .string()
          .required()
          .oneOf(
            dropdownOptions.map((x) => x.label),
            "please select an option"
          ),
      }),
      onSubmit(value) {
        alert(`Submit: ${value.category}`);
      },
    });

    const isDisableSubmit = !dirty || !isValid || isSubmitting;

    return (
      <form onSubmit={handleSubmit}>
        <TextInput
          {...args}
          value={values.category}
          onChange={handleChange}
          errorMessage={{ message: errors.category }}
        />
        <button
          type="submit"
          disabled={isDisableSubmit}
          className={clsx(
            "rounded border bg-slate-500/50 p-1",
            isDisableSubmit && "opacity-30"
          )}
        >
          Submit
        </button>
      </form>
    );
  },
};
