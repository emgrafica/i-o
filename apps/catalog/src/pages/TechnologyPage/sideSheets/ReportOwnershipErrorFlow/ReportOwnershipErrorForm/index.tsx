import { useMutation } from '@apollo/react-hooks';
import { Alert, Box, Button, Form } from '@lumos/core';
import ErrorScreen from 'components/ErrorScreen';
import { useTranslatedQuery } from 'hooks/useTranslatedQuery';
import {
  GetReportOwnershipErrorContent,
  GetReportOwnershipErrorContent_reportOwnershipErrorGlobal_questions,
  GetReportOwnershipErrorContent_reportOwnershipErrorGlobal_questions_options,
} from 'pages/TechnologyPage/queries/gqlTypes/GetReportOwnershipErrorContent';
import SkeletonLoader from 'pages/TechnologyPage/SkeletonLoader';
import React, { FormEventHandler, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useOBOInfoLocalState } from '../../../../../store/apollo/store/hooks';
import { useUserId } from '../../../../../containers/AuthContainer/AuthContext';
import {
  useTechnologyActionsContext,
  useTechnologyStateContext,
} from '../../../index';
import { FormActionGroup, SidesheetContent } from '../../../index.style';
import {
  REPORT_OWNERSHIP_ERROR,
  REPORT_OWNERSHIP_ERROR_CONTENT,
} from '../../../queries';
import {
  ReportOwnershipError,
  ReportOwnershipErrorVariables,
} from '../../../queries/gqlTypes/ReportOwnershipError';
import { ActionTypes, AssetAction, ClientRequestStatus } from '../../../types';

const ReportOwnershipErrorForm: React.FC = () => {
  const { t } = useTranslation('technology');
  const dispatch = useTechnologyActionsContext();
  const { assetData, sideSheetActionStatus } = useTechnologyStateContext();
  const userId = useUserId();
  const oboInfo = useOBOInfoLocalState();
  const [question, setQuestion] = useState('');
  const [details, setDetails] = useState('');

  const parseContentQuestionOptions = (
    question:
      | GetReportOwnershipErrorContent_reportOwnershipErrorGlobal_questions
      | undefined,
  ) => {
    return question
      ? question.options.map(
          (
            option: GetReportOwnershipErrorContent_reportOwnershipErrorGlobal_questions_options,
          ) => ({
            label: option.label,
            value: option.value,
          }),
        )
      : [];
  };

  const {
    data: dataContent,
    loading: loadingContent,
    error: errorContent,
  } = useTranslatedQuery<GetReportOwnershipErrorContent>(
    REPORT_OWNERSHIP_ERROR_CONTENT,
  );

  const describeErrorQuestionId = 'describe_error';
  const describeErrorQuestion = dataContent
    ? dataContent.reportOwnershipErrorGlobal.questions.find(
        (
          question: GetReportOwnershipErrorContent_reportOwnershipErrorGlobal_questions,
        ) => question.id === describeErrorQuestionId,
      )
    : undefined;

  const disableSubmit = !question || !details;
  const [reportOwnershipError, { loading }] = useMutation<
    ReportOwnershipError,
    ReportOwnershipErrorVariables
  >(REPORT_OWNERSHIP_ERROR);

  const handleCancel = () => {
    dispatch({
      type: ActionTypes.SET_ASSET_DATA,
      payload: { assetData: null, assetAction: AssetAction.None },
    });
  };

  const setSideSheetActionStatus = (
    status: ClientRequestStatus,
    data?: any,
  ) => {
    dispatch({
      type: ActionTypes.SET_SIDE_SHEET_ACTION_STATUS,
      payload: {
        status,
        data,
      },
    });
  };

  const handleLoading = () => {
    setSideSheetActionStatus(ClientRequestStatus.Loading);
  };

  const handleFailure = () => {
    setSideSheetActionStatus(ClientRequestStatus.Failed);
  };

  const handleSuccess = () => {
    setSideSheetActionStatus(ClientRequestStatus.Succeeded);
  };

  const submit: FormEventHandler = async () => {
    if (!userId) {
      throw new Error('Failed to proceed: userId is undefined.');
    }
    if (!assetData) {
      throw new Error('Failed to proceed: asset is required.');
    }

    const data = {
      assetId: assetData.id,
      description: details,
      questions: [{ id: describeErrorQuestionId, value: question }],
      onBehalfOf: oboInfo.user ? oboInfo.user.userId : userId,
    };

    try {
      const { errors } = await reportOwnershipError({
        variables: {
          data,
        },
      });

      if (errors) {
        handleFailure();
      } else {
        handleSuccess();
      }
    } catch (error) {
      handleFailure();
    }
  };

  const handleQuestionChange = (selectedItem: string) => {
    setQuestion(selectedItem);
  };

  const handleDetailsChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { value } = event.target;
    setDetails(value);
  };

  useEffect(() => {
    if (loading) {
      handleLoading();
    }
    /* eslint-disable */
  }, [loading]);

  let content;
  if (loadingContent) {
    content = <SkeletonLoader />;
  } else if (errorContent) {
    content = <ErrorScreen />;
  } else {
    content = (
      <>
        {describeErrorQuestion && (
          <SidesheetContent>
            <Form.Item
              required
              htmlFor="question-input"
              label={describeErrorQuestion.label}
              labelId="question-label"
            >
              <Form.Dropdown
                data-testid="question-input"
                id="question-input"
                buttonLabel={describeErrorQuestion.label}
                onChange={handleQuestionChange}
                options={parseContentQuestionOptions(describeErrorQuestion)}
              />
            </Form.Item>
            <Form.Item
              required
              label={t('reportOwnershipError.details')}
              htmlFor="details-input"
            >
              <Form.TextArea
                id="details-input"
                data-testid="details-input"
                name="details"
                maximum={250}
                maxLength={250}
                value={details}
                onChange={handleDetailsChange}
              />
            </Form.Item>
            {sideSheetActionStatus.status === ClientRequestStatus.Failed && (
              <Alert
                kind="danger"
                contrast="low"
                message={t('submission.failed')}
                margin="16px"
              />
            )}
            <Box marginTop="20px" marginX="12px">
              <Alert
                kind="active"
                contrast="low"
                closeable
                message={t('reportOwnershipError.alert')}
                marginBottom="16px"
              />
              <Box marginTop="40px">
                <FormActionGroup>
                  <Button
                    data-testid="cancel"
                    kind="secondary"
                    onClick={handleCancel}
                  >
                    {t('common:cancel')}
                  </Button>
                  <Button
                    data-testid="submit"
                    disabled={disableSubmit}
                    onClick={submit}
                  >
                    {t('common:submit')}
                  </Button>
                </FormActionGroup>
              </Box>
            </Box>
          </SidesheetContent>
        )}
      </>
    );
  }

  return content;
};

export default ReportOwnershipErrorForm;
