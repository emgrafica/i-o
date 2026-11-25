import React from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/react-hooks';
import { Avatar, Grid, Typography } from '@lumos/core';
import { DISTRICT_PARTNER_SEARCH } from 'graphql/queries/districtPartnerSearch';
import { DistrictPartnerSearch } from 'graphql/queries/gqlTypes/DistrictPartnerSearch';
import { EmailIcon } from './EmailIcon';
import { PhoneIcon } from './PhoneIcon';
import ContactInfoCollapsible from '../../ContactInfoCollapsible';
import LoadingScreen from 'components/LoadingScreen';

/** Card to display MDP contact information */
const ContactInfo: React.FC = () => {
  const { t } = useTranslation('getSupport');
  const { data, loading } = useQuery<DistrictPartnerSearch>(
    DISTRICT_PARTNER_SEARCH,
  );

  return (
    <ContactInfoCollapsible
      title={t('bottomSection.mdp.modal.mdpContactTitle')}
    >
      {loading ? (
        <Grid justifyContent="center" marginTop="32px">
          <LoadingScreen loaderSize="sm" />
        </Grid>
      ) : (
        data && (
          <Grid flexDirection="row" marginY="6px">
            <Avatar alt="" width="41px" height="41px" />
            <Grid flexDirection="column" marginLeft="16px">
              <Typography kind="body1" margin="0" marginBottom="6px">
                {`${data.districtPartnerSearch.name} (${data.districtPartnerSearch.username})`}
              </Typography>
              {data.districtPartnerSearch.email && (
                <Grid alignItems="center" marginTop="2px">
                  <EmailIcon />
                  <Typography kind="body3" margin="0">
                    {data.districtPartnerSearch.email}
                  </Typography>
                </Grid>
              )}
              {data.districtPartnerSearch.phone && (
                <Grid alignItems="center" marginTop="4px">
                  <PhoneIcon />
                  <Typography kind="body3" margin="0">
                    {data.districtPartnerSearch.phone}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Grid>
        )
      )}
    </ContactInfoCollapsible>
  );
};
export default ContactInfo;
