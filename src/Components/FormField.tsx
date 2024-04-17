/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";

import FormInput from "./FormInput";
import Tooltip from "./Tooltip";

import { css } from "@emotion/react";

interface Props {
  id: number;
  formFieldInfo: FormFieldInfo;
  cardInfoState?: [CardInfo, React.Dispatch<React.SetStateAction<CardInfo>>];
}

const titleCss = css({
  fontSize: "18px",
  fontWeight: "700",
  lineHeight: "26px",
  textAlign: "left",
});

const descriptionCss = css({
  fontSize: "10px",
  fontWeight: "400",
  lineHeight: "14px",
  textAlign: "left",
  color: "#8B95A1",
});

const rowStyle = css({
  display: "flex",
  justifyContent: "space-between",
});

const FormField: React.FC<Props> = ({
  formFieldInfo: { key, title, description, label, sizePreset, inputPlaceholderList },
  cardInfoState,
}) => {
  let [cardInfo, setCardInfo];

  const [cardInfo, setCardInfo] = cardInfoState;
  const [errorMessage, setErrorMessage] = useState<null | string>(null);

  useEffect(() => {
    cardInfo[key]?.forEach((value, index) => {
      console.log(value, index);
      // TODO: values 유효성 검사
      // TODO: setErrorMessage
    });
  }, [cardInfo]);

  const handleChange = (e: React.ChangeEvent, index: number) => {
    // TODO: setInputValues[index]
    setCardInfo((prev) => {
      const temp = JSON.parse(JSON.stringify(prev));
      // TODO: valid 숫자인지 확인 -> 렌더링 여부 결정
      temp[key][index] = e.target.value;
      return temp;
    });
    //TODO: setCardInfo((prev)=>{prev[formFieldInfo.key] = e.target.value})
    //TODO: errorHandling
  };

  return (
    <div>
      <h1 css={titleCss}>{title}</h1>
      {description && <p css={descriptionCss}>{description}</p>}
      <label htmlFor="id">{label}</label>
      <div css={rowStyle}>
        {inputPlaceholderList.map((placeholder, index) => (
          <FormInput
            onChange={(e) => handleChange(e, index)}
            id={`id-${index}`}
            sizePreset={sizePreset}
            placeholder={placeholder ?? ""}
          ></FormInput>
        ))}
      </div>
      {errorMessage && <Tooltip>{errorMessage}</Tooltip>}
    </div>
  );
};

export default FormField;
