import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useApolloClient } from '@apollo/react-hooks';
import { Alert, Box, Button, Grid, Typography } from '@lumos/core';
import LoaderWithBackdrop from 'components/LoaderWithBackdrop';
import UserCard from 'components/UserCard';
import { CatalogItemClass } from 'gqlTypes/globalTypes';
import BILLING_ELIGIBLE from 'graphql/queries/billingEligible';
import { UserProfileRequest_userProfile } from 'graphql/queries/gqlTypes/UserProfileRequest';
import useBreakpoint, { Breakpoint } from 'utils/useBreakpoint';
import { StepperAction } from '../../index';
import UserLookupModal from './UserLookupModal';

/**
 * Props for AccountInformation
 */
export interface AccountInformationProps {
  billedToUser: UserProfileRequest_userProfile;
  currentUser: UserProfileRequest_userProfile;
  setBilledToUser: (selectedUser: UserProfileRequest_userProfile) => void;
  updateCurrentStep: (stepperAction: StepperAction) => void;
}

/**
 * Account information component
 */
const AccountInformation: React.FC<AccountInformationProps> = ({
  billedToUser,
  currentUser,
  setBilledToUser,
  updateCurrentStep,
}) => {
  const { t } = useTranslation();
  const breakpoint = useBreakpoint();
  const client = useApolloClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [billingLoading, setBillingLoading] = useState(false);
  const [billingNotEligible, setBillingNotEligible] = useState(false);
  const [banCheckError, setBanCheckError] = useState(false);

  const changeBilledToUser = (selectedUser: UserProfileRequest_userProfile) => {
    setBilledToUser(selectedUser);
    // Resets billingNotEligible state when the billedTo user is changed
    setBillingNotEligible(false);
  };

  const handleContinue = () => {
    setBillingLoading(true);
    let notEligible = false;
    client
      .query({
        query: BILLING_ELIGIBLE,
        variables: {
          userId: billedToUser.userId,
          catalogClass: CatalogItemClass.gcom,
        },
      })
      .then(result => {
        if (result && result.data && result.data.billingEligible.eligible) {
          updateCurrentStep(StepperAction.Continue);
        } else if (!result.loading) {
          notEligible = true;
        }
        setBillingLoading(false);
        setBillingNotEligible(Boolean(notEligible));
      })
      .catch(error => {
        setBillingLoading(false);
        setBanCheckError(true);
      });
  };

  return (
    <Box
      // Values below pulled directly from designs
      marginLeft={{ xxs: '0px', md: '52px', lg: '70px' }}
      marginY="24px"
      width="100%"
      // Values below pulled directly from designs
      maxWidth={{ xxs: '314px', md: '620px', lg: '904px' }}
    >
      {billingLoading && <LoaderWithBackdrop size="md" />}
      <Typography kind="body3" fontWeight="bold">
        {t('pages:request.gcom.accountInformation.assignedTo')}
      </Typography>
      <Typography kind="body2">
        {t('pages:request.gcom.accountInformation.assignedToDescription')}
      </Typography>
      <UserCard
        firstName={
          currentUser.preferredName
            ? currentUser.preferredName
            : currentUser.firstName
        }
        lastName={currentUser.lastName}
        userId={currentUser.userId}
        avatar={currentUser.avatar}
        businessName={currentUser.businessInfo[0].name}
        country={currentUser.locationInfo.country}
      />
      <Typography kind="body3" fontWeight="bold" marginBottom={0}>
        {t('pages:request.gcom.accountInformation.billedTo')}
      </Typography>
      <Grid
        flexDirection={breakpoint < Breakpoint.md ? 'column' : 'row'}
        width="100%"
        justifyContent="space-between"
      >
        <Typography kind="body2">
          {t('pages:request.gcom.accountInformation.billedToDescription')}
        </Typography>
        <Grid
          width={breakpoint < Breakpoint.md ? '100%' : 'unset'}
          justifyContent={breakpoint < Breakpoint.md ? 'flex-end' : 'unset'}
        >
          <Button
            kind="text"
            minWidth="105px"
            onClick={() => setIsModalOpen(true)}
          >
            {t('pages:request.gcom.accountInformation.changeUser')}
          </Button>
        </Grid>
      </Grid>
      <UserCard
        firstName={
          billedToUser.preferredName
            ? billedToUser.preferredName
            : billedToUser.firstName
        }
        lastName={billedToUser.lastName}
        userId={billedToUser.userId}
        avatar={billedToUser.avatar}
        businessName={billedToUser.businessInfo[0].name}
        country={billedToUser.locationInfo.country}
      />
      {billingNotEligible && (
        <Alert
          kind="warning"
          message={t('pages:request.gcom.accountInformation.notEligible')}
          closeable
          compact
          onClose={() => setBillingNotEligible(false)}
          marginTop="-16px"
        />
      )}
      {banCheckError && (
        <Alert
          kind="danger"
          contrast="low"
          closeable
          message={t('pages:request.gcom.accountInformation.banCheckError')}
          onClose={() => setBanCheckError(false)}
          marginBottom={4}
          marginTop="-16px"
        />
      )}
      <Grid marginTop={billingNotEligible ? '0px' : '40px'}>
        <Button
          kind="secondary"
          minWidth="105px"
          onClick={() => handleContinue()}
        >
          {t('common:continue')}
        </Button>
      </Grid>
      <UserLookupModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        changeUser={changeBilledToUser}
      />
    </Box>
  );
};

export default AccountInformation;
