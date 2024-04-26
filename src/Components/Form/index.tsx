/** @jsxImportSource @emotion/react */
import useContextWrapper from "../../hooks/useContextWrapper";
import { FormRenderOrderContext } from "../../routes/Payments";
import SubmitButton from "../Button/SubmitButton";

import {
  CardCVCContext,
  CardIssuerContext,
  CardNumbersContext,
  CardOwnerInfoContext,
  CardPasswordContext,
  CardValidityPeriodContext,
} from "../../routes/Payments/CardInfoContextProvider";

import CardCVCField from "../FormField/CardCVCField";
import CardIssuerField from "../FormField/CardIssuerField";
import CardNumberField from "../FormField/CardNumberField";
import CardOwnerField from "../FormField/CardOwnerField";
import CardPasswordField from "../FormField/CardPasswordField";
import CardValidityPeriodField from "../FormField/CardValidityPeriodField";

import {
  CardCVCErrorContext,
  CardIssuerErrorContext,
  CardNumberErrorContext,
  CardOwnerInfoErrorContext,
  CardPasswordErrorContext,
  CardValidityPeriodErrorContext,
} from "../../routes/Payments/FormContextProvider";

import FormRefContextProvider from "./FormRefContextProvider";

import { formStyle } from "./style";

const isNumberValid = (cardNumbers: CardNumbers, numberError: CardNumbersError) => {
  if (
    cardNumbers.firstNumbers?.length === 4 &&
    cardNumbers.secondNumbers?.length === 4 &&
    cardNumbers.thirdNumbers?.length === 4 &&
    cardNumbers.fourthNumbers?.length === 4 &&
    !numberError.firstNumbers?.isError &&
    !numberError.secondNumbers?.isError &&
    !numberError.thirdNumbers?.isError &&
    !numberError.fourthNumbers?.isError
  ) {
    return true;
  }
  return false;
};

const isIssuerValid = ({ name }: CardIssuer, { name: nameError }: CardIssuerError) => {
  if (name && !nameError.isError) {
    return true;
  }
  return false;
};

const isPeriodValid = (
  { month, year }: CardValidityPeriod,
  { month: monthError, year: yearError }: CardValidityPeriodError
) => {
  if (month && year && !monthError?.isError && !yearError?.isError) {
    return true;
  }
  return false;
};

const isOwnerValid = ({ name }: CardOwnerInfo, { name: errorName }: CardOwnerInfoError) => {
  if (name && !errorName?.isError) {
    return true;
  }
  return false;
};

const isCVCValid = ({ value }: CardCVC, { value: valueError }: CardCVCError) => {
  if (value?.length === 3 && !valueError.isError) {
    return true;
  }
  return false;
};

const isPasswordValid = ({ value }: CardPassword, { value: valueError }: CardPasswordError) => {
  if (value?.length === 2 && !valueError.isError) {
    return true;
  }
  return false;
};

const useIsCardInfoValid = () => {
  const cardNumbers = useContextWrapper(CardNumbersContext)[0];
  const cardIssuer = useContextWrapper(CardIssuerContext)[0];
  const cardPeriod = useContextWrapper(CardValidityPeriodContext)[0];
  const cardOwner = useContextWrapper(CardOwnerInfoContext)[0];
  const cardCVC = useContextWrapper(CardCVCContext)[0];
  const cardPassword = useContextWrapper(CardPasswordContext)[0];

  const numbersError = useContextWrapper(CardNumberErrorContext)[0];
  const issuerError = useContextWrapper(CardIssuerErrorContext)[0];
  const periodError = useContextWrapper(CardValidityPeriodErrorContext)[0];
  const ownerError = useContextWrapper(CardOwnerInfoErrorContext)[0];
  const cvcError = useContextWrapper(CardCVCErrorContext)[0];
  const passwordError = useContextWrapper(CardPasswordErrorContext)[0];

  if (
    isNumberValid(cardNumbers, numbersError) &&
    isIssuerValid(cardIssuer, issuerError) &&
    isPeriodValid(cardPeriod, periodError) &&
    isOwnerValid(cardOwner, ownerError) &&
    isCVCValid(cardCVC, cvcError) &&
    isPasswordValid(cardPassword, passwordError)
  ) {
    return true;
  }
  return false;
};

const Form = () => {
  const renderOrder = useContextWrapper(FormRenderOrderContext)[0];
  const isValid = useIsCardInfoValid();

  return (
    <form css={formStyle}>
      <FormRefContextProvider>
        {renderOrder.index > 4 && <CardPasswordField />}
        {renderOrder.index > 3 && <CardCVCField />}
        {renderOrder.index > 2 && <CardOwnerField />}
        {renderOrder.index > 1 && <CardValidityPeriodField />}
        {renderOrder.index > 0 && <CardIssuerField />}
        <CardNumberField />
        {isValid && <SubmitButton />}
      </FormRefContextProvider>
    </form>
  );
};

export default Form;
