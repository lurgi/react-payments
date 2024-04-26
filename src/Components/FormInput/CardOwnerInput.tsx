import { memo } from "react";

import useContextWrapper from "../../hooks/useContextWrapper";
import { CardOwnerInfoContext } from "../../routes/Payments/CardInfoContextProvider";
import { CardOwnerInfoErrorContext } from "../../routes/Payments/FormContextProvider";

import { cardOwnerValidator } from "./validator";
import onInputChange from "./onInputChange";
import FormInputCompound from "./FormInputCompound";
import { CardOwnerInputContext } from "../Form/FormRefContextProvider";

interface InputInfoList {
  name: keyof CardOwnerInfo;
  placeholder: string;
}

const CardOwnerInput = memo(() => {
  const [cardOwner, setData] = useContextWrapper(CardOwnerInfoContext);
  const [ownerError, setError] = useContextWrapper(CardOwnerInfoErrorContext);
  const ownerInputRef = useContextWrapper(CardOwnerInputContext)[0];

  const InputInfoList: InputInfoList[] = [{ name: "name", placeholder: "PARK JEONG-WOO" }];

  return (
    <>
      {InputInfoList.map(({ name, placeholder }, index) => (
        <FormInputCompound
          id={`id-owner-${name}`}
          key={index}
          onInputChange={(e) => {
            onInputChange<CardOwnerInfo, CardOwnerInfoError>(e, {
              name,
              setData,
              setError,
              validator: cardOwnerValidator,
            });
          }}
          isError={!!ownerError[name]?.isError}
          sizePreset="large"
          maxLength={15}
          name={name}
          value={cardOwner[name] ?? ""}
          placeholder={placeholder}
          ref={ownerInputRef}
        />
      ))}
    </>
  );
});

export default CardOwnerInput;
