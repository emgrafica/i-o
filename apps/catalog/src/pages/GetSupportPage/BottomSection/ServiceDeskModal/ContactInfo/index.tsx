import React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Typography } from '@lumos/core';
import { ServiceDeskContactSearch } from 'graphql/queries/gqlTypes/ServiceDeskContactSearch';
import { SERVICE_DESK_CONTACT_SEARCH } from 'graphql/queries/serviceDeskContactSearch';
import ContactInfoCollapsible from '../../ContactInfoCollapsible';
import LoadingScreen from 'components/LoadingScreen';
import { useTranslatedQuery } from 'hooks/useTranslatedQuery';

/** Card to display Service Desk phone number */
const ContactInfo: React.FC = () => {
  const { t } = useTranslation('getSupport');
  const { data, loading } = useTranslatedQuery<ServiceDeskContactSearch>(
    SERVICE_DESK_CONTACT_SEARCH,
  );

  const renderLabelValue = (label: string, value: string) => (
    <Grid marginY="6px">
      <Typography kind="subtitle3">{label}</Typography>
      <Typography kind="body3" marginY={0} marginLeft={1}>
        {value}
      </Typography>
    </Grid>
  );

  return (
    <ContactInfoCollapsible
      title={t('bottomSection.serviceDesk.modal.viewNumberLabel')}
    >
      {loading ? (
        <Grid justifyContent="center" marginTop="30px">
          <LoadingScreen loaderSize="sm" />
        </Grid>
      ) : (
        <Grid flexDirection="column">
          {renderLabelValue(
            t('bottomSection.serviceDesk.modal.supportedLanguangesLabel'),
            (data && data.serviceDeskContactSearch.languages) || '',
          )}
          {renderLabelValue(
            t('bottomSection.serviceDesk.modal.numberLabel'),
            (data && data.serviceDeskContactSearch.number) || '',
          )}
          {renderLabelValue(
            t('bottomSection.serviceDesk.modal.operationHoursLabel'),
            (data && data.serviceDeskContactSearch.hours) || '',
          )}
        </Grid>
      )}
    </ContactInfoCollapsible>
  );
};
export default ContactInfo;
