import React, { FormEventHandler, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import {
  useTechnologyActionsContext,
  useTechnologyStateContext,
} from '../../../index';
import { Box, Button, Form } from '@lumos/core';
import {
  FormActionGroup,
  InlineCheckboxItem,
  Paragraph,
  StyledForm,
  SubTitle,
} from '../../../index.style';
import { ActionTypes, AssetAction } from '../../../types';
import { ReasonForRequest } from 'gqlTypes/globalTypes';
import { useSetReportBrokenInfo } from 'store/apollo/store/hooks';
import { CheckoutPath, ManagePersonalTechnologyPath } from 'utils/routes';

const ReportBrokenForm: React.FC = () => {
  const { t } = useTranslation('technology');
  const dispatch = useTechnologyActionsContext();
  const { assetData } = useTechnologyStateContext();
  const setReportBrokenInfo = useSetReportBrokenInfo();
  const history = useHistory();
  const [incidentNumber, setIncidentNumber] = useState('');
  const [details, setDetails] = useState('');
  const [agreed, setAgreed] = useState(false);
  const blocked = incidentNumber === '' || details === '' || !agreed;

  const handleCancel = () => {
    dispatch({
      type: ActionTypes.SET_ASSET_DATA,
      payload: { assetData: null, assetAction: AssetAction.None },
    });
  };
  const handleContinue: FormEventHandler = async () => {
    if (!assetData || !assetData.id) {
      throw new Error(`Failed to proceed: AssetId is undefined.`);
    }

    if (!assetData || !assetData.catalogItemId) {
      throw new Error(`Failed to proceed: CatalogItemId is undefined.`);
    }

    await setReportBrokenInfo({
      id: assetData.id,
      _etag: assetData._etag,
      catalogItemId: assetData.catalogItemId,
      image: assetData.image,
      expires: assetData.expires,
      productName: assetData.productName,
      serialNumber: assetData.serialNumber,
      usage: assetData.usage,
      details,
      incidentNumber,
    });

    history.push({
      pathname: CheckoutPath,
      state: {
        from: ManagePersonalTechnologyPath,
        requestConfigOptions: {
          requestReason: ReasonForRequest.Broken,
          deviceUsage: assetData.usage || null,
          incidentNumber,
          situationDetails: details,
        },
      },
    });
  };

  const handleIncidentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setIncidentNumber(value);
  };
  const handleDetailsChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { value } = event.target;
    setDetails(value);
  };
  const handleAgreement = () => setAgreed(agreed => !agreed);

  return (
    <Box marginTop="60px">
      <SubTitle>{t('reportBroken.title')}</SubTitle>
      <Paragraph>{t('reportBroken.p1')}</Paragraph>
      <Paragraph>{t('reportBroken.p2')}</Paragraph>
      <StyledForm name="report-broken-order">
        <Form.Item
          required
          label={t('reportBroken.incident.label')}
          htmlFor="incident-number-input"
        >
          <Form.Input
            id="incident-number-input"
            data-testid="incident-number-input"
            name="incidentNumber"
            type="text"
            placeholder={t('reportBroken.incident.placeholder')}
            value={incidentNumber}
            onChange={handleIncidentChange}
          />
        </Form.Item>
        <Form.Item
          required
          label={t('reportBroken.details.label')}
          htmlFor="details-input"
        >
          <Form.TextArea
            id="details-input"
            data-testid="details-input"
            name="details"
            placeholder={t('reportBroken.details.placeholder')}
            maximum={500}
            maxLength={500}
            value={details}
            onChange={handleDetailsChange}
          />
        </Form.Item>
        <InlineCheckboxItem
          inlineLabel
          htmlFor="agreement-input"
          label={t('reportBroken.agreementMessage')}
        >
          <Form.Checkbox
            id="agreement-input"
            data-testid="agreement-input"
            name="agreement"
            checked={agreed}
            onChange={handleAgreement}
          />
        </InlineCheckboxItem>

        <Box marginTop="20px">
          <FormActionGroup>
            <Button
              data-testid="cancel"
              kind="secondary"
              onClick={handleCancel}
            >
              {t('common:cancel')}
            </Button>
            <Button
              data-testid="continue"
              disabled={blocked}
              onClick={handleContinue}
            >
              {t('common:continue')}
            </Button>
          </FormActionGroup>
        </Box>
      </StyledForm>
    </Box>
  );
};

export default ReportBrokenForm;
