import type { Meta, StoryObj } from "@storybook/react";
import FormField from "../Components/FormField";

import { userEvent, waitFor, within, expect, fn } from "@storybook/test";

const meta = {
  title: "Components/FormField",
  component: FormField,
  argTypes: {
    formFieldInfo: { control: "object", description: "FormFieldInfo 객체" },
  },
} satisfies Meta<typeof FormField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "신용 카드 UI 기본값",
  args: {
    id: 1,
    formFieldInfo: {
      key: "cardNumbers",
      title: "결제할 카드 번호를 입력해 주세요",
      label: "카드 번호",
      inputPlaceholderList: Array(4).fill("1234"),
      valueList: Array(4).fill(undefined),
      sizePreset: "small",
    },
  },
};

export const SmallInputForm: Story = {
  name: "preset이 small인 경우",
  args: {
    id: 1,
    formFieldInfo: {
      key: "cardNumbers",
      title: "결제할 카드 번호를 입력해 주세요",
      description: "본인 명의의 카드만 결제 가능합니다.",
      label: "카드 번호",
      inputPlaceholderList: Array(4).fill("1234"),
      valueList: Array(4).fill(undefined),
      sizePreset: "small",
    },
  },
};

export const MediumInputForm: Story = {
  name: "preset이 medium인 경우",
  args: {
    id: 2,
    formFieldInfo: {
      key: "cardValidityPeriod",
      title: "카드 유효기간을 입력해 주세요",
      description: "월/년도(MM/YY)를 순서대로 입력해 주세요.",
      label: "유효기간",
      inputPlaceholderList: ["MM", "YY"],
      valueList: Array(2).fill(undefined),
      sizePreset: "medium",
    },
  },
};

export const LargeInputForm: Story = {
  name: "preset이 large인 경우",
  args: {
    id: 3,
    formFieldInfo: {
      key: "ownerName",
      title: "카드 소유자 이름을 입력해 주세요",
      label: "소유자 이름",
      inputPlaceholderList: ["PARK JEONG-WOO"],
      valueList: [undefined],
      sizePreset: "large",
    },
  },
};

export const errorCaseSubmitted: Story = {
  name: "잘못된 입력인 경우 에러 툴팁을 발생시킨다.",
  args: {
    id: 1,
    formFieldInfo: {
      key: "cardNumbers",
      title: "결제할 카드 번호를 입력해 주세요",
      label: "카드 번호",
      inputPlaceholderList: Array(4).fill("1234"),
      valueList: [1, 2, 3, 4, 5, 6, 7],
      sizePreset: "small",
    },
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Enter credentials", async () => {
      // await userEvent.type(canvas.getByTestId('email'), 'hi@example.com');
      // await userEvent.type(canvas.getByTestId('password'), 'supersecret');
    });

    await step("Submit form", async () => {
      // await userEvent.click(canvas.getByRole('button'));
    });

    // await waitFor(() => expect(args.onSubmit).toHaveBeenCalled());
  },
};
