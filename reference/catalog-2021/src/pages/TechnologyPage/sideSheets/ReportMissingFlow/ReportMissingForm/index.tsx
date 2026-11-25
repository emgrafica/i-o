import React, { FormEventHandler, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import {
  useTechnologyActionsContext,
  useTechnologyStateContext,
} from '../../../index';
import { Alert, Box, Button, Form, Typography, useToasts } from '@lumos/core';
import { FormActionGroup, Paragraph, StyledForm } from '../../../index.style';
import { ActionTypes, AssetAction, ClientRequestStatus } from '../../../types';
import { CheckoutPath, ManagePersonalTechnologyPath } from 'utils/routes';
import { useOBOInfoLocalState } from 'store/apollo/store/hooks';
import { useReportMissingInfo } from 'store';
import { ReasonForRequest } from 'gqlTypes/globalTypes';
import { REPORT_MISSING } from 'graphql/mutations/reportMissing';
import {
  ReportMissing_reportMissing,
  ReportMissingVariables,
} from 'graphql/mutations/gqlTypes/ReportMissing';
import { useUserId } from 'containers/AuthContainer/AuthContext';
import { setAssetLoadingState } from 'pages/TechnologyPage/utils';

const ReportMissingForm: React.FC = () => {
  const { t } = useTranslation('technology');
  const { addToast } = useToasts();
  const { assetData, sideSheetActionStatus } = useTechnologyStateContext();
  const [reportMissing] = useMutation<
    ReportMissing_reportMissing,
    ReportMissingVariables
  >(REPORT_MISSING);
  const dispatch = useTechnologyActionsContext();
  const oboInfoLocalState = useOBOInfoLocalState();
  const currentUserId = useUserId() as string;
  const requestedForUserId =
    oboInfoLocalState && oboInfoLocalState.user
      ? oboInfoLocalState.user.userId
      : currentUserId;
  const history = useHistory();
  const [reportMissingInfo, setReportMissingInfo] = useReportMissingInfo();
  const [caseNumber, setCaseNumber] = useState('');
  const [details, setDetails] = useState('');
  const [needReplacementComputer, setNeedReplacementComputer] = useState<
    boolean
  >();
  const [submissionError, setSubmissionError] = useState<boolean>(false);
  const blocked = caseNumber === '' || details === '';

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

    await setReportMissingInfo({
      ...reportMissingInfo,
      id: assetData.id,
      _etag: assetData._etag,
      catalogItemId: assetData.catalogItemId,
      image: assetData.image || null,
      expires: assetData.expires || null,
      productName: assetData.productName || null,
      serialNumber: assetData.serialNumber || null,
      usage: assetData.usage || null,
      details,
      caseNumber,
    });

    if (needReplacementComputer) {
      history.push({
        pathname: CheckoutPath,
        state: {
          from: ManagePersonalTechnologyPath,
          reportMissingVariables: {
            assetId: assetData.id,
            requestedForId: requestedForUserId,
            description: details,
            caseNumber,
            serialNumber: assetData.serialNumber,
          },
          requestConfigOptions: {
            requestReason: ReasonForRequest.Missing,
            deviceUsage: assetData.usage || null,
            incidentNumber: caseNumber,
            situationDetails: details,
          },
        },
      });
    } else {
      const { data, errors } = await reportMissing({
        variables: {
          assetId: assetData.id,
          requestedForId: requestedForUserId,
          description: details,
          caseNumber,
          serialNumber: assetData.serialNumber!,
        },
      });

      if (errors) {
        setSubmissionError(true);
      } else if (data) {
        dispatch({
          type: ActionTypes.SET_ASSET_DATA,
          payload: { assetData: null, assetAction: AssetAction.None },
        });
        if (assetData) {
          setAssetLoadingState(dispatch, assetData.id);
        }
        addToast(t('submission.succeeded'), {
          // Lumos typing issue, will be removed when fixed there
          // @ts-ignore
          kind: 'success',
          autoDismiss: true,
        });
      }
    }
  };

  const handleCaseNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = event.target;
    setCaseNumber(value);
  };
  const handleDetailsChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { value } = event.target;
    setDetails(value);
  };
  const handleNeedReplacementComputerChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = event.target;
    setNeedReplacementComputer(value === t('common:yes'));
  };

  return (
    <Box marginTop="60px">
      <Paragraph>
        {t('reportMissing.p1')}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://example.com"
        >
          {t('reportMissing.geSecurityLink')}
        </a>
      </Paragraph>
      <StyledForm name="report-missing-order">
        <Form.Item
          required
          label={t('reportMissing.caseNumber.label')}
          htmlFor="case-number-input"
        >
          <Form.Input
            id="case-number-input"
            data-testid="case-number-input"
            name="caseNumber"
            type="text"
            placeholder={t('reportMissing.caseNumber.placeholder')}
            value={caseNumber}
            onChange={handleCaseNumberChange}
          />
        </Form.Item>
        <Form.Item
          required
          label={t('reportMissing.details.label')}
          htmlFor="details-input"
        >
          <Form.TextArea
            id="details-input"
            data-testid="details-input"
            name="details"
            placeholder={t('reportMissing.details.placeholder')}
            maximum={250}
            maxLength={250}
            value={details}
            onChange={handleDetailsChange}
          />
        </Form.Item>
        <Typography kind="h6" fontWeight="bold" paddingX={3}>
          {t('reportMissing.replacementComputer')}
        </Typography>
        <Form.RadioGroup
          name={t('reportMissing.replacementComputer')}
          headingLabel=""
          onChange={handleNeedReplacementComputerChange}
          stacked
          paddingLeft="12px"
        >
          <Form.Item
            inlineLabel
            label={t('common:yes')}
            htmlFor="yes-input"
            fontSize={2}
          >
            <Form.Radiobox
              id="yes-input"
              data-testid="yes-input"
              value={t('common:yes')}
            />
          </Form.Item>
          <Form.Item
            inlineLabel
            label={t('common:no')}
            htmlFor="no-input"
            fontSize={2}
          >
            <Form.Radiobox
              id="no-input"
              data-testid="no-input"
              value={t('common:no')}
            />
          </Form.Item>
        </Form.RadioGroup>

        {needReplacementComputer !== undefined && (
          <Alert
            kind="active"
            message={
              needReplacementComputer
                ? t('reportMissing.replacementAlert')
                : t('reportMissing.alert')
            }
            closeable
            marginTop="20px"
          />
        )}
        {(sideSheetActionStatus.status === ClientRequestStatus.Failed ||
          submissionError) && (
          <Alert
            kind="warning"
            message={t('submission.failed')}
            closeable
            onClose={() => setSubmissionError(false)}
            compact
            marginTop="20px"
          />
        )}

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
              {needReplacementComputer !== true
                ? t('common:submit')
                : t('common:continue')}
            </Button>
          </FormActionGroup>
        </Box>
      </StyledForm>
    </Box>
  );
};

export default ReportMissingForm;
