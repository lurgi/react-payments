/** @jsxImportSource @emotion/react */
import { useContext } from "react";

import masterImage from "../../assets/masterImage.png";
import visaImage from "../../assets/visaImage.png";

import { cardInfoStyle, logoStyle, periodRowStyle, periodStyle, rowStyle, cardPreviewStyle, width42 } from "./style.js";
import {
  CardNumbersContext,
  CardOwnerInfoContext,
  CardValidityPeriodContext,
} from "../../routes/Payments/CardInfoContextProvider";

/**
 * @param n 1~2 자리 숫자가 들어온다.
 * @returns 0일경우 빈 문자열, 1자리 숫자가 들어올 경우 앞에 숫자 앞에 "0"을 붙인 문자열을 반환, 2자리 숫자가 들어올 경우 숫자를 문자열로 반환
 */
const formatTwoDigitNumber = (n: number | undefined) => {
  if (!n) return "";
  return String(n).padStart(2, "0");
};

const isVisa = (cardNumbers?: number) => {
  const VISA_START_NUMBER = 4;
  return cardNumbers?.toString().startsWith(String(VISA_START_NUMBER));
};

const isMaster = (cardNumbers?: number) => {
  const MASTER_REG_PATTERN = /(51|52|53|54)/;
  return cardNumbers && MASTER_REG_PATTERN.test(cardNumbers?.toString());
};

const getCardImage = (number?: number) => {
  if (isVisa(number)) return visaImage;
  if (isMaster(number)) return masterImage;
  return null;
};

const CreditCard = () => {
  const cardNumbers = useContext(CardNumbersContext)![0];
  const { month, year } = useContext(CardValidityPeriodContext)![0];
  const cardOwnerInfo = useContext(CardOwnerInfoContext)![0];
  const cardImage = getCardImage(cardNumbers?.firstNumbers);

  return (
    <div css={cardPreviewStyle}>
      <div css={rowStyle}>
        <div css={logoStyle}></div>
        {cardImage ? <img css={logoStyle} src={cardImage} /> : null}
      </div>
      <section css={cardInfoStyle}>
        <div css={rowStyle}>
          {Object.values(cardNumbers)?.map((cardNumberPart, index) => (
            <div key={index} css={width42}>
              {cardNumberPart && index < 2 ? cardNumberPart : "*".repeat(cardNumberPart?.length ?? 0)}
            </div>
          ))}
        </div>
        <div css={periodRowStyle}>
          <span css={periodStyle}>{formatTwoDigitNumber(month)}</span>
          <span>{(month || year) && "/"}</span>
          <span css={periodStyle}>{formatTwoDigitNumber(year)}</span>
        </div>
        <div> {cardOwnerInfo.name?.toUpperCase()}</div>
      </section>
    </div>
  );
};

export default CreditCard;
