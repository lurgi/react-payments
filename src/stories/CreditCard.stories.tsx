import type { Meta, StoryObj } from "@storybook/react";
import CreditCard from "../Components/CreditCard";

const meta = {
  title: "Components/CreditCard",
  component: CreditCard,
  argTypes: {
    cardInfo: {
      control: "object",
      description: "신용 카드 정보",
    },
  },
} satisfies Meta<typeof CreditCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "신용 카드 UI 기본값",
  args: { cardInfo: { cardNumbers: [], cardValidityPeriod: [], ownerName: [] } },
};

const dummyCardInfo: CardInfo = {
  cardNumbers: ["5123", "4578", "9991", "0123"],
  cardValidityPeriod: ["9", "25"],
  ownerName: ["River"],
};

export const MasterCard: Story = {
  name: "51~56 숫자로 시작하는 숫자라면 마스터 카드 이미지가 나와야 한다",
  args: {
    cardInfo: { ...dummyCardInfo, cardNumbers: ["5423", "4578", "9991", "0123"] },
  },
};

export const CardNumbersUnder16: Story = {
  name: "카드번호가 10자리인 경우",
  args: {
    cardInfo: { ...dummyCardInfo, cardNumbers: ["5123", "4578", "99", "012"] },
  },
};

export const OnlyYearCard: Story = {
  name: "카드 유효기간에서 년도만 입력한 경우",
  args: {
    cardInfo: { ...dummyCardInfo, cardValidityPeriod: ["", "26"] },
  },
};

export const VisaCard: Story = {
  name: "4 숫자로 시작하는 숫자라면 비자 카드 이미지가 나와야 한다",
  args: {
    cardInfo: { ...dummyCardInfo, cardNumbers: ["4123", "4578", "9991", "0123"] },
  },
};

export const NoImageCard: Story = {
  name: "비자, 마스터카드가 아니면 이미지가 나오지 않는다.",
  args: {
    cardInfo: { ...dummyCardInfo, cardNumbers: ["3123", "4578", "9991", "0123"] },
  },
};

export const NoNumbersButPeriod: Story = {
  name: "기한만 제공될 경우 ui가 잘 나와야 한다.",
  args: {
    cardInfo: { cardValidityPeriod: ["9"] },
  },
};
