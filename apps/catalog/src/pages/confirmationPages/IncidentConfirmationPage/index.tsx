import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { Alert, Grid, Typography, Box, Button } from '@lumos/core';
import { ClampText } from 'components/ClampText';
import { createBusinessAppIncident_createBusinessAppIncident } from 'graphql/mutations/gqlTypes/createBusinessAppIncident';
import { GetSupportSearch_businessApplicationSearch_items } from 'graphql/queries/gqlTypes/GetSupportSearch';
import { GetSupportPath } from 'utils/routes';
import { FileIcon } from './FileIcon';
import { WarningIcon } from './WarningIcon';
import { attachFilesToIncident } from 'utils/attachFilesToIncident';
import LoadingScreen from 'components/LoadingScreen';
import { Check, Refresh } from '@material-ui/icons';
import useDevice, { Device } from 'utils/useDevice';
import { getAccessToken } from 'utils/auth';
import ConfirmationPageTemplate from '../templates/ConfirmationPageTemplate';

/**Location State type for the IncidentConfirmationPage to pass state via history/location*/
export type IncidentConfirmationLocationState = Pick<
  createBusinessAppIncident_createBusinessAppIncident,
  'tenantDisplayId'
> &
  Pick<
    GetSupportSearch_businessApplicationSearch_items,
    'name' | 'business'
  > & {
    title: string;
    details: string;
    filesSucceeded: File[];
    filesFailed: File[];
    incidentId: string;
  };

/**
 * Incident confirmation page once incident has been created
 */
const IncidentConfirmationPage: React.FC = () => {
  const { t } = useTranslation('incidentCreated');
  const location = useLocation<IncidentConfirmationLocationState>();
  const device = useDevice();
  const [uploadingFiles, setUploadingFiles] = useState(false);
  const {
    incidentId,
    tenantDisplayId,
    name,
    business,
    title,
    details,
    filesSucceeded: filesSucceededHistory,
    filesFailed: filesFailedHistory,
  } = location.state;
  const [filesSucceeded, setFilesSucceeded] = useState(filesSucceededHistory);
  const [filesFailed, setFilesFailed] = useState(filesFailedHistory);
  const fileCount = filesFailed.length + filesSucceeded.length;

  if (!location.state) return <Redirect to={GetSupportPath} />;

  const renderLabelValue = (label: string, value: string | null) => (
    <Grid marginY={3}>
      <Typography kind="subtitle1" minWidth="163px">
        {label}
      </Typography>
      <ClampText maxLineCount={5}>
        <Typography
          kind="body2"
          marginLeft="12px"
          marginY="0"
          style={{ whiteSpace: 'pre-wrap' }}
        >
          {value}
        </Typography>
      </ClampText>
    </Grid>
  );

  const uploadFiles = async (files: File[]) => {
    const accessToken = await getAccessToken();
    setUploadingFiles(true);
    const { filesSucceeded: newFilesSucceeded } = await attachFilesToIncident(
      files,
      incidentId,
      tenantDisplayId,
      accessToken,
    );
    setFilesSucceeded([...newFilesSucceeded, ...filesSucceeded]);
    setFilesFailed(
      filesFailed.filter(file => !newFilesSucceeded.includes(file)),
    );
    setUploadingFiles(false);
  };
  return (
    <ConfirmationPageTemplate
      title={t('title')}
      subtitle={t('subtitle')}
      alertMessage={t('pageAlertMessage', { tenantDisplayId })}
    >
      <Box maxWidth="165px" marginTop={6} marginBottom="60px">
        <Link id="returnToGetSupport" to={GetSupportPath}>
          <Typography kind="body1">{t('backLink')}</Typography>
        </Link>
      </Box>
      <Box maxWidth="672px">
        {renderLabelValue(t('applicationNameLabel'), name)}
        {renderLabelValue(t('businessLabel'), business)}
        <hr style={{ margin: '32px 0' }} />
        {renderLabelValue(t('incidentTitleLabel'), title)}
        {renderLabelValue(t('incidentDetailsLabel'), details)}

        {fileCount > 0 && (
          <>
            <hr style={{ margin: '32px 0' }} />
            {uploadingFiles ? (
              <Grid height="250px" justifyContent="center">
                <LoadingScreen />
              </Grid>
            ) : (
              <>
                {filesFailed.length > 0 && (
                  <Alert
                    marginBottom="25px"
                    kind="warning"
                    compact
                    fullWidth
                    contrast="low"
                    message={t(
                      device <= Device.Tablet
                        ? 'filesAlertMessageShort'
                        : 'filesAlertMessageLong',
                      { count: fileCount },
                    )}
                  />
                )}
                <Grid
                  flexDirection={device <= Device.Tablet ? 'column' : 'row'}
                >
                  <Grid
                    flexDirection={device <= Device.Tablet ? 'row' : 'column'}
                    alignItems={device <= Device.Tablet ? 'baseline' : ''}
                    minWidth="163px"
                  >
                    <Typography kind="subtitle1" marginRight="10px">
                      {t('uploadedFilesLabel')}
                    </Typography>
                    <Typography kind="body3">
                      {`${filesSucceeded.length}/${fileCount}`}
                    </Typography>
                  </Grid>
                  <Box width="100%">
                    {filesFailed.length > 0 && (
                      <Button
                        withIconOnLeft={<Refresh />}
                        kind="text"
                        onClick={() => uploadFiles(filesFailed)}
                        id="retryAll"
                      >
                        {t('retryAllButton')}
                      </Button>
                    )}
                    {[...filesFailed, ...filesSucceeded].map(file => {
                      const failed = filesFailed.includes(file);
                      return (
                        <Grid key={file.name} alignItems="center" height="35px">
                          <Grid alignItems="center">
                            {failed ? <WarningIcon /> : <FileIcon />}
                            <ClampText maxLineCount={1}>
                              <Typography kind="body2" marginY="0">
                                {file.name}
                              </Typography>
                            </ClampText>
                          </Grid>
                          <Box marginLeft="auto" minWidth="100px">
                            {failed ? (
                              <Button
                                withIconOnLeft={<Refresh />}
                                kind="text"
                                onClick={() => uploadFiles([file])}
                                id="retryFile"
                              >
                                {t('retryButton')}
                              </Button>
                            ) : (
                              <Box marginX="32px">
                                <Check />
                              </Box>
                            )}
                          </Box>
                        </Grid>
                      );
                    })}
                  </Box>
                </Grid>
              </>
            )}
          </>
        )}
      </Box>
    </ConfirmationPageTemplate>
  );
};

export default IncidentConfirmationPage;
