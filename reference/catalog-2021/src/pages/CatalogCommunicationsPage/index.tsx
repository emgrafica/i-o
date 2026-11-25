import React from 'react';
import { useTranslation } from 'react-i18next';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import PageTemplate from 'components/PageTemplate';
import { CatalogItemClass } from 'gqlTypes/globalTypes';
import USER_PROFILE_REQUEST from 'graphql/queries/UserProfileRequest';
import {
  UserProfileRequest,
  UserProfileRequestVariables,
} from 'graphql/queries/gqlTypes/UserProfileRequest';
import { useOBOInfoLocalState } from 'store/apollo/store/hooks';
import { useUserId } from 'containers/AuthContainer/AuthContext';
import LoadingScreen from 'components/LoadingScreen';
import ErrorScreen from 'components/ErrorScreen';
import { titleMap, subTitleMap } from '../CatalogPage/utils';
import CommunicationsStepper from './CommunicationsStepper';

/**
 * Props for CatalogCommunicationsProps
 */
export interface CatalogCommunicationsProps {
  /**
   * catalogItemClass to be loaded
   */
  catalogItemClass: CatalogItemClass;
}

/**
 * Catalog communications page
 */
const CatalogCommunicationsPage: React.FC<CatalogCommunicationsProps &
  RouteComponentProps> = ({ catalogItemClass }) => {
  const { t } = useTranslation();
  const oboInfoLocalState = useOBOInfoLocalState();
  const oboUser = oboInfoLocalState && oboInfoLocalState.user;
  const userId = useUserId();
  const { loading: isUserProfileLoading, data: userProfileData } = useQuery<
    UserProfileRequest,
    UserProfileRequestVariables
  >(USER_PROFILE_REQUEST, {
    variables: {
      userId: oboUser ? oboUser.userId : userId,
    },
    // Any errors thrown from the userProfile query should be considered a "critical error"
    // This error will bubble up to the ErrorBoundary, which will render the "Oops" page.
    onError: (error: any) => {
      throw new Error(error);
    },
  });

  return (
    <PageTemplate
      hasBanner
      title={t(titleMap[catalogItemClass])}
      subtitle={t(subTitleMap[catalogItemClass])}
    >
      {isUserProfileLoading ? (
        <LoadingScreen />
      ) : userProfileData && userProfileData.userProfile ? (
        <CommunicationsStepper
          currentUser={userProfileData.userProfile}
          billedToUser={userProfileData.userProfile}
        />
      ) : (
        <ErrorScreen />
      )}
    </PageTemplate>
  );
};

export default withRouter(CatalogCommunicationsPage);
