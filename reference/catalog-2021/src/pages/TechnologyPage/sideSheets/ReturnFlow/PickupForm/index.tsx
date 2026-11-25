import { Button, Form } from '@lumos/core';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import {
  CheckoutPath,
  ManagePersonalTechnologyCheckoutPath,
} from 'utils/routes';
import {
  useTechnologyActionsContext,
  useTechnologyStateContext,
} from '../../..';
import {
  ActionTypes,
  AssetAction,
  ComputerAsset,
  ReturnCheckoutLocationState,
} from '../../../types';
import {
  StyledForm,
  StyledFormItem,
  StyledGrid,
  StyledTextArea,
} from './styled';
import { useReason } from '../../../utils';
import { ReasonForReturn } from 'gqlTypes/globalTypes';
import { StyledHeader } from '../../WithoutOrderFlow/index.style';
import { CatalogCheckoutLocationState } from 'pages/checkoutPages/CatalogCheckoutPage';

/** Props for the ReturnForm component*/
interface ReturnFormProps {
  /**Specifies the variation of the return flow*/
  variation: 'returnPickup' | 'returnLabelDownload';
}

/**
 * Form for the side sheet of the return flow,
 * used for the pickup and label download variations
 */
const ReturnForm: React.FC<ReturnFormProps> = ({ variation }) => {
  const { t } = useTranslation('technology');
  const [formState, setForm] = useState({
    reason: '',
    reasonDetails: '',
  });
  const pickupHistory = useHistory<ReturnCheckoutLocationState>();
  const labelDownloadHistory = useHistory<CatalogCheckoutLocationState>();
  const technologyState = useTechnologyStateContext();
  const dispatch = useTechnologyActionsContext();

  const handleCancel = () => {
    dispatch({
      type: ActionTypes.SET_ASSET_DATA,
      payload: { assetData: null, assetAction: AssetAction.None },
    });
  };

  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = e => {
    const { value, name } = e.target;
    const newState = { ...formState, [name]: value };

    if (name === 'reason') {
      newState.reasonDetails = '';
    }

    setForm(newState);
  };

  const handleSubmit: React.FormEventHandler = e => {
    e.preventDefault();
    const { reason, reasonDetails } = formState;
    switch (variation) {
      case 'returnPickup':
        pickupHistory.push({
          pathname: ManagePersonalTechnologyCheckoutPath,
          state: {
            reason: {
              value: reason as ReasonForReturn,
              details: reasonDetails,
            },
            asset: technologyState.assetData as ComputerAsset,
          },
        });
        break;
      case 'returnLabelDownload':
        labelDownloadHistory.push({
          pathname: CheckoutPath,
          state: {
            returnLabelDownloadInfo: {},
          },
        });
        break;
    }
  };

  const continueDisabled =
    formState.reason === '' ||
    ((formState.reason === ReasonForReturn.Other ||
      formState.reason === ReasonForReturn.DeviceBroken) &&
      formState.reasonDetails === '');

  return (
    <StyledForm name="ReturnReason" onSubmit={handleSubmit}>
      <StyledHeader>{t('return.reasonForReturn')}</StyledHeader>
      <Form.RadioGroup
        name="reason"
        headingLabel=""
        onChange={handleChange}
        stacked
      >
        <StyledFormItem
          label={useReason(ReasonForReturn.OwnerInactive)}
          htmlFor="userLeftInput"
          inlineLabel
        >
          <Form.Radiobox
            id="userLeftInput"
            value={ReasonForReturn.OwnerInactive}
          />
        </StyledFormItem>
        <StyledFormItem
          label={useReason(ReasonForReturn.DeviceNotRequired)}
          htmlFor="notRequiredInput"
          inlineLabel
        >
          <Form.Radiobox
            id="notRequiredInput"
            value={ReasonForReturn.DeviceNotRequired}
          />
        </StyledFormItem>
        <StyledFormItem
          label={useReason(ReasonForReturn.DeviceBroken)}
          htmlFor="deviceBrokenInput"
          inlineLabel
        >
          <Form.Radiobox
            id="deviceBrokenInput"
            value={ReasonForReturn.DeviceBroken}
          />
        </StyledFormItem>
        <StyledFormItem
          label={useReason(ReasonForReturn.Other)}
          htmlFor="otherInput"
          inlineLabel
        >
          <Form.Radiobox id="otherInput" value={ReasonForReturn.Other} />
        </StyledFormItem>
      </Form.RadioGroup>
      {(formState.reason === ReasonForReturn.Other ||
        formState.reason === ReasonForReturn.DeviceBroken) && (
        <StyledTextArea
          required
          htmlFor="reasonDetails"
          label={t('return.reasonDetails')}
        >
          <Form.TextArea
            id="reasonDetails"
            name="reasonDetails"
            value={formState.reasonDetails}
            onChange={handleChange}
            maximum={250}
            maxLength={250}
            data-testid="reasonDetails"
          />
        </StyledTextArea>
      )}
      <StyledGrid>
        <Button kind="secondary" onClick={handleCancel} marginRight="8px">
          {t('common:cancel')}
        </Button>
        <Button type="submit" disabled={continueDisabled} marginLeft="8px">
          {t('common:continue')}
        </Button>
      </StyledGrid>
    </StyledForm>
  );
};

export default ReturnForm;
