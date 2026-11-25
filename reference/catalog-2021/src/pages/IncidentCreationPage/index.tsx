import React, { useState } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import { CREATE_BUSINESS_APP_INCIDENT } from 'graphql/mutations/createBusinessAppIncident';
import PageTemplate from 'components/PageTemplate';
import {
  Box,
  Button,
  Card,
  Grid,
  Loader,
  Typography,
  useToasts,
} from '@lumos/core';
import { useTranslation } from 'react-i18next';
import queryString from 'query-string';
import BackButton from 'components/BackButton';
import DescriptionForm from './DescriptionForm';
import {
  GetSupportSearchPath,
  IncidentConfirmationPath,
  GetSupportPath,
} from 'utils/routes';
import AttachFilesForm from './AttachFilesForm';
import {
  createBusinessAppIncident,
  createBusinessAppIncidentVariables,
} from 'graphql/mutations/gqlTypes/createBusinessAppIncident';
import { GetSupportSearch_businessApplicationSearch_items } from 'graphql/queries/gqlTypes/GetSupportSearch';
import { IncidentConfirmationLocationState } from '../confirmationPages/IncidentConfirmationPage';
import SectionHeader from 'components/SectionHeader';
import { attachFilesToIncident } from 'utils/attachFilesToIncident';
import { getAccessToken } from 'utils/auth';

/**Location State type for the CatalogCheckoutPage to pass state via history/location*/
export interface IncidentCreationLocationState
  extends Pick<
    GetSupportSearch_businessApplicationSearch_items,
    | 'name'
    | 'business'
    | 'shortDescription'
    | 'questionnaire'
    | 'assignmentGroup'
    | 'serviceId'
    | 'serviceOfferingId'
    | 'userDefinedShortDescription'
    | 'number'
  > {
  searchQuery: string;
}

/**
 * Incident Creation Page
 */
const IncidentCreationPage: React.FC = () => {
  const { t } = useTranslation('incident');
  const { addToast } = useToasts();
  const history = useHistory<IncidentConfirmationLocationState>();
  const location = useLocation<IncidentCreationLocationState>();
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState(
    (location.state && location.state.questionnaire) || '',
  );
  const [processingMutation, setProcessingMutation] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [fileSelectionHasErrors, setFileSelectionHasErrors] = useState(false);

  const handleSubmissionFailure = () => {
    addToast(t('common:submissionFailure'), {
      // Lumos typing issue, will be removed when fixed there
      // @ts-ignore
      kind: 'danger',
      autoDismiss: true,
    });
    setProcessingMutation(false);
  };
  const [createIncident] = useMutation<
    createBusinessAppIncident,
    createBusinessAppIncidentVariables
  >(CREATE_BUSINESS_APP_INCIDENT, {
    onCompleted: async data => {
      const accessToken = await getAccessToken();
      const incidentId = data.createBusinessAppIncident.id;
      const tenantDisplayId = data.createBusinessAppIncident.tenantDisplayId;

      const { filesSucceeded, filesFailed } = await attachFilesToIncident(
        files,
        incidentId,
        tenantDisplayId,
        accessToken,
      );

      goToIncidentConfirmationPage(
        tenantDisplayId,
        incidentId,
        filesSucceeded,
        filesFailed,
      );
    },
    onError: handleSubmissionFailure,
  });

  const renderLabelValue = (
    label: string,
    value: string | string[] | null | undefined,
  ) => (
    <Grid marginY={1}>
      <Typography kind="subtitle1" minWidth="163px">
        {label}
      </Typography>
      <Typography kind="body3" marginY={0} marginLeft={3}>
        {value}
      </Typography>
    </Grid>
  );

  const submitIncident = () => {
    setProcessingMutation(true);
    createIncident({
      variables: {
        shortDescription: (title || shortDescription)!,
        description: details,
        assignmentGroup: assignmentGroup!,
        productL1: serviceId!,
        productL2: serviceOfferingId!,
        externalId: number,
        filesToBeAttached: files.map(file => file.name),
      },
    });
  };

  const goToIncidentConfirmationPage = (
    tenantDisplayId: string,
    incidentId: string,
    filesSucceeded: File[],
    filesFailed: File[],
  ) => {
    history.push(IncidentConfirmationPath, {
      tenantDisplayId,
      incidentId,
      name,
      business,
      title: title || shortDescription || '',
      details,
      filesSucceeded,
      filesFailed,
    });
  };

  if (!location.state) return <Redirect to={GetSupportPath} />;
  const { q: urlKeywords } = queryString.parse(location.state.searchQuery);
  const keywords = typeof urlKeywords === 'string' ? urlKeywords : '';
  const {
    name,
    business,
    shortDescription,
    assignmentGroup,
    serviceId,
    serviceOfferingId,
    userDefinedShortDescription,
    number,
  } = location.state;

  return (
    <>
      <PageTemplate hasBanner title={t('title')} subtitle={t('subtitle')}>
        <Grid flexDirection={{ xxs: 'column', md: 'row' }} height="100%">
          <Box>
            <BackButton
              text={t('common:back')}
              to={{
                pathname: GetSupportSearchPath,
                search: location.state.searchQuery,
              }}
            />
          </Box>
          <Grid
            marginX={{ md: '75px' }}
            flexDirection="column"
            maxWidth="720px"
            width="100%"
          >
            <Card padding={5}>
              {processingMutation ? (
                <Grid height="100vh" justifyContent="center">
                  <Grid
                    alignItems="center"
                    justifyContent="center"
                    data-testid="loading"
                  >
                    <Grid flexDirection="column" alignItems="center">
                      <Loader size="md" caption="" />
                      <Typography kind="body1" marginTop="0" textAlign="center">
                        {files.length
                          ? t('loadingMessageWithFiles')
                          : t('loadingMessageWithoutFiles')}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              ) : (
                <Grid flexDirection="column">
                  <SectionHeader title={t('formTitle')} isMainTitle />
                  <Card rounded hasFullBorder borderColor="primary.1">
                    <Grid flexDirection="column" marginLeft={3}>
                      {renderLabelValue(t('searchedTopicLabel'), keywords)}
                      {renderLabelValue(t('applicationNameLabel'), name)}
                      {renderLabelValue(t('businessLabel'), business)}
                    </Grid>
                  </Card>
                  <Typography kind="body3" marginTop="20px">
                    {t('directions')}
                  </Typography>
                  <DescriptionForm
                    title={title}
                    onTitleChange={setTitle}
                    details={details}
                    onDetailsChange={setDetails}
                    showTitleField={userDefinedShortDescription}
                  />
                  <AttachFilesForm
                    files={files}
                    onSelectionChange={(files, hasErrors) => {
                      setFiles(files);
                      setFileSelectionHasErrors(hasErrors);
                    }}
                  />
                  <Grid
                    justifyContent="flex-end"
                    marginBottom={4}
                    marginTop="40px"
                  >
                    <Button
                      kind="primary"
                      disabled={
                        processingMutation ||
                        !details ||
                        (userDefinedShortDescription && !title) ||
                        fileSelectionHasErrors
                      }
                      onClick={submitIncident}
                      id="submitIncident"
                    >
                      {t('common:submit')}
                    </Button>
                  </Grid>
                </Grid>
              )}
            </Card>
          </Grid>
        </Grid>
      </PageTemplate>
    </>
  );
};

export default IncidentCreationPage;
